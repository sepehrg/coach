import React from 'react';
import { Box, Grid, Link } from '@mui/material';
import useStyles from './LofiVideos.styles';
import { usePlayerActions } from 'store/player';

const videos = [
  { id: 'jfKfPfyJRdk' },
  { id: '7NOSDKb0HlU' },
  { id: 'rUxyKA_-grg' },
  { id: 'n61ULEU7CO0' },
  { id: 'kgx4WGK0oNU' },
  { id: '_tV5LEBDs7w' },
  { id: 'lTRiuFIWV54' },
  { id: 'MCkTebktHVc' },
  { id: 'O7RG-B6N1Vw' },
  { id: 'gnZImHvA0ME' },
  { id: '1fueZCTYkpA' },
  { id: 'zFhfksjf_mY' },
  { id: 'YBan80jCAT4' },
  { id: 'rA56B4JyTgI' },
  { id: '78IUzavWoqc' },
  { id: 'KaSFoOF6Yw0' },
  { id: 'fR0ZlSDUKCg' },
];

const LofiVideos: React.FC = () => {
  const { classes } = useStyles();
  const { startPlayer: playerStart } = usePlayerActions();

  return (
    <Grid container spacing={4} className={classes.container}>
      {videos.map((video, index) => (
        <Box key={index} className={classes.videoItem}>
          <Link onClick={() => playerStart(video.id)}>
            <Box className={classes.link}>
              <img
                className={classes.preview}
                src={`https://img.youtube.com/vi/${video.id}/sddefault.jpg`}
                alt="Card cap"
              />
            </Box>
          </Link>
        </Box>
      ))}
    </Grid>
  );
};

export default LofiVideos;
