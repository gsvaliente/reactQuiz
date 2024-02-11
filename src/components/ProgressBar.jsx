export function ProgressBar({
  questionIndex,
  numOfQuestions,
  score,
  maxTotalPoints,
}) {
  return (
    <header className='progress'>
      <progress max={numOfQuestions} value={questionIndex} />
      <p>
        Question <strong>{questionIndex + 1}</strong> / {numOfQuestions}{' '}
      </p>
      <p>
        Score: <strong>{score}</strong> / {maxTotalPoints}
      </p>
    </header>
  );
}
