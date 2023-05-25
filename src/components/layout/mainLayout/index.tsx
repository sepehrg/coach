import React, { useEffect } from 'react';
import useStyles from './mainLayout.styles';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import { useIdoActions } from 'store/ido';
import { useSelector } from 'react-redux';
import { videoSelector } from 'store/player/player.selectors';
import { usePlayerActions } from 'store/player';
import { MaterialLearningTypes } from 'entities/Material';
import { selectedMaterialSelector } from 'store/materials/materials.selectors';
import YoutubePlayer from 'components/ui/YoutubePlayer';
import { IdoActionTypes } from 'entities/Ido';

interface MainLayoutProps {
  children: any;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { classes } = useStyles();
  const location = useLocation();
  const selectedMaterial = useSelector(selectedMaterialSelector);
  const video = useSelector(videoSelector);
  const { getIdoAction } = useIdoActions();
  const { stopPlayer } = usePlayerActions();

  useEffect(() => {
    getIdoAction({ type: IdoActionTypes.MOTIVATION });
  }, [location, getIdoAction]);

  return (
    <Box className={classes.root}>
      {children}
      {selectedMaterial?.material.learningType !== MaterialLearningTypes.Video && (
        <YoutubePlayer video={video} onVideoStop={stopPlayer} />
      )}
    </Box>
  );
};

export default MainLayout;
