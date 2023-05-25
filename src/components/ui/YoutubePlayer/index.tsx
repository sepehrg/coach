import { Box, Button } from '@mui/material';
import React from 'react';
import useStyles from './YoutubePlayer.styles';
import Draggable from 'react-draggable';

interface YoutubePlayerProps {
  video: string;
  onVideoStop: () => void;
}

const YoutubePlayer: React.FC<YoutubePlayerProps> = ({ video, onVideoStop }) => {
  const { classes } = useStyles();

  if (!video) return null;

  return (
    <Draggable handle="#handle">
      <Box className={classes.youtubePlayer}>
        <iframe
          className={classes.iframe}
          src={`https://www.youtube.com/embed/${video}?autoplay=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          frameBorder={0}
        ></iframe>
        <Button className={classes.close} onClick={onVideoStop}>
          &times;
        </Button>
        <div id="handle" className={classes.handle}>
          &#10021;
        </div>
      </Box>
    </Draggable>
  );
};

export default YoutubePlayer;
