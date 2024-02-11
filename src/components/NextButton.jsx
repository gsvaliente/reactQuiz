export function NextButton({
  dispatch,
  answer,
  questionIndex,
  numOfQuestions,
}) {
  if (answer === null) return null;

  if (questionIndex < numOfQuestions - 1)
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'NEXT_QUESTION' })}
      >
        NEXT
      </button>
    );

  if (questionIndex === numOfQuestions - 1)
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'FINISH_QUIZ' })}
      >
        FINISH
      </button>
    );
}
