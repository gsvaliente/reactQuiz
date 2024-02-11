export function Options({ question, dispatch, answer }) {
  const hasAnswer = answer !== null;
  return (
    <div className='options'>
      {question.options.map((option, idx) => (
        <button
          className={`btn btn-option ${idx === answer ? 'answer' : ''} ${
            hasAnswer
              ? idx === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          key={option}
          disabled={hasAnswer}
          onClick={() => dispatch({ type: 'SELECT_ANSWER', payload: idx })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
