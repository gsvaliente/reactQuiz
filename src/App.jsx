import { useEffect, useReducer } from 'react';

import {
  Error,
  FinishScreen,
  Footer,
  Header,
  Loader,
  Main,
  NextButton,
  ProgressBar,
  Question,
  StartScreen,
  Timer,
} from './components';

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: 'loading',
  questionIndex: 0,
  answer: null,
  score: 0,
  highscore: 0,
  secRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'DATA_RECEIVED':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'DATA_ERROR':
      return { ...state, status: 'error' };
    case 'START_GAME':
      return {
        ...state,
        status: 'active',
        secRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case 'SELECT_ANSWER':
      const question = state.questions.at(state.questionIndex);
      return {
        ...state,
        answer: action.payload,
        score:
          action.payload === question.correctOption
            ? state.score + question.points
            : state.score,
      };
    case 'NEXT_QUESTION':
      return { ...state, questionIndex: state.questionIndex + 1, answer: null };
    case 'FINISH_QUIZ':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.score > state.highscore ? state.score : state.highscore,
      };
    case 'RESTART_QUIZ':
      return {
        ...state,
        status: 'ready',
        score: 0,
        questionIndex: 0,
        answer: null,
        secRemaining: 10,
      };
    case 'TICK':
      return {
        ...state,
        secRemaining: state.secRemaining - 1,
        status: state.secRemaining === 0 ? 'finished' : state.status,
      };
    default:
      throw new Error('no action was found');
  }
}

export function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    questions,
    status,
    questionIndex,
    answer,
    score,
    highscore,
    secRemaining,
  } = state;

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'DATA_RECEIVED', payload: data }))
      .catch((err) => dispatch({ type: 'DATA_ERROR' }));
  }, []);

  const numOfQuestions = questions.length;
  const maxTotalPoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );

  return (
    <div className='app'>
      <Header />

      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen numOfQuestions={numOfQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <ProgressBar
              questionIndex={questionIndex}
              numOfQuestions={numOfQuestions}
              score={score}
              maxTotalPoints={maxTotalPoints}
            />
            <Question
              question={questions.at(questionIndex)}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secRemaining={secRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numOfQuestions={numOfQuestions}
                questionIndex={questionIndex}
              />
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <FinishScreen
            score={score}
            maxTotalPoints={maxTotalPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
