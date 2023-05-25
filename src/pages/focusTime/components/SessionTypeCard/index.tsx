import React, { ReactElement } from 'react';
import { Grid } from '@mui/material';
import useStyles from './SessionTypeCard.styles';
import Typography from '@mui/material/Typography';

interface SubjectCardProps {
  text: string | ReactElement;
  image: string;
}

const SessionTypeCard: React.FC<SubjectCardProps> = ({ text, image }) => {
  const { classes } = useStyles();

  return (
    <Grid container item justifyContent={'center'} className={classes.root} alignItems={'center'}>
      <Typography className={classes.cardText}>{text}</Typography>
      <img src={image} className={classes.cardImage} alt={'session card type'} />
    </Grid>
  );
};

export default SessionTypeCard;
