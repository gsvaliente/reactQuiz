export function FinishScreen({ score, maxTotalPoints, highscore, dispatch }) {
  const percentage = (score / maxTotalPoints) * 100;

  let emoji;

  if (percentage === 100) emoji = '🏅';
  if (percentage >= 80 && percentage < 100) emoji = '🎉';
  if (percentage >= 50 && percentage < 80) emoji = '🙃';
  if (percentage >= 0 && percentage < 50) emoji = '🤨';
  if (percentage === 0) emoji = '⛔️';

  return (
    <>
      <p className='result'>
        {emoji} You Scored: <strong>{score}</strong> out of {maxTotalPoints} (
        {Math.ceil(percentage)}%) {emoji}
      </p>

      <p className='highscore'>(Highscore: {highscore} points)</p>

      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'RESTART_QUIZ' })}
      >
        RESTART
      </button>
    </>
  );
}
