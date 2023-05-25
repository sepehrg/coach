import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { playerStartAction, playerStopAction } from './player.actions';

export const usePlayerActions = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => ({
      startPlayer: (video: string) => {
        dispatch(playerStartAction(video));
      },
      stopPlayer: () => {
        dispatch(playerStopAction());
      },
    }),
    [dispatch],
  );
};
