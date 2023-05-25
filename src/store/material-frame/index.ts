import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { getIsUrlBlockedForIFrame } from './material-frame.actions';

export const useMaterialFrameActions = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => ({
      getIsUrlBlockedForIFrame: (url: string) => {
        dispatch(getIsUrlBlockedForIFrame(url));
      },
    }),
    [dispatch],
  );
};
