import { useEffect } from 'react';

export function Timer({ dispatch, secRemaining }) {
  const minutes = Math.floor(secRemaining / 60);
  const seconds = secRemaining % 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);
  return (
    <div className='timer'>
      {minutes < 10 && '0'}
      {minutes}:{seconds < 10 && '0'}
      {seconds}
    </div>
  );
}
