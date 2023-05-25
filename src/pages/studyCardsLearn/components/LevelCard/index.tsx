import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import useStyles from './LevelCard.styles';
import { WithTranslation, withTranslation } from 'react-i18next';

interface LevelCardProps {
  cardsCount: number;
  levelTitle: string;
  levelIcon: string;
  onCardClick: () => void;
}

const LevelCard: React.FC<LevelCardProps & WithTranslation> = (props) => {
  const { cardsCount, levelTitle, levelIcon, onCardClick, t } = props;
  const { classes } = useStyles();
  return (
    <Grid container item direction={'column'} alignItems={'center'}>
      <Grid
        className={classes.container}
        direction={'column'}
        alignItems={'center'}
        container
        item
        onClick={onCardClick}
      >
        <Typography className={classes.number} variant={'body1'}>
          {cardsCount}
        </Typography>
        <Typography className={classes.cardsText}>{t('Study Cards.Learn.Cards')}</Typography>
        <Box
          className={classes.iconWrapper}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <img src={levelIcon} alt={''} />
        </Box>
      </Grid>
      <Typography className={classes.levelTitle} variant={'h2'}>
        {levelTitle}
      </Typography>
    </Grid>
  );
};

export default withTranslation()(LevelCard);
