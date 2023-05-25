import React, { useCallback, useEffect } from 'react';
import Iframe from 'react-iframe';
import { Grid } from '@mui/material';
import { useMaterialFrameActions } from 'store/material-frame';
import { isUrlBlockedForIFrameSelectorFactory } from 'store/material-frame/material-frame.selectors';
import { useSelector } from 'react-redux';

interface MaterialFrame {
  url: string;
}

const MaterialFrame: React.FC<MaterialFrame> = ({ url }) => {
  const materialFrameActions = useMaterialFrameActions();
  const isUrlBlockedForIFrame = useSelector(isUrlBlockedForIFrameSelectorFactory(url));

  const loadIsUrlBlockedForIFrame = useCallback(
    (url: string) => {
      materialFrameActions.getIsUrlBlockedForIFrame(url);
    },
    [materialFrameActions],
  );

  useEffect(() => {
    if (isUrlBlockedForIFrame === undefined) {
      loadIsUrlBlockedForIFrame(url);
      return;
    }
    if (isUrlBlockedForIFrame) {
      window.open(url);
    }
  }, [url, isUrlBlockedForIFrame, loadIsUrlBlockedForIFrame]);

  return !isUrlBlockedForIFrame ? (
    <Grid item lg={12} md={12} style={{ height: '73vh' }}>
      <Iframe url={url} width="100%" height="100%" />
    </Grid>
  ) : (
    <div></div>
  );
};

export default MaterialFrame;
