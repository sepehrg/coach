import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { getBreakPowerupRequest, clearSelectedPowerup } from 'store/powerups/powerups.actions';

export const usePowerupActions = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => ({
      getBreakPowerup: () => {
        dispatch(getBreakPowerupRequest());
      },
      clearSelected: () => {
        dispatch(clearSelectedPowerup());
      },
    }),
    [dispatch],
  );
};
