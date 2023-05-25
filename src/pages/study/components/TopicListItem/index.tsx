import React from 'react';
import { Grid, Typography } from '@mui/material';
import useStyles from './TopicListItem.styles';

interface TopicListItemProps {
  text: string;
  onClick: (topic: string) => void;
}

const TopicListItem: React.FC<TopicListItemProps> = ({ text, onClick }) => {
  const { classes } = useStyles();

  return (
    <Grid
      alignItems={'center'}
      justifyContent={'center'}
      onClick={() => onClick(text)}
      className={classes.root}
    >
      <Typography variant={'body1'} className={classes.text}>
        {text}
      </Typography>
    </Grid>
  );
};

export default TopicListItem;
