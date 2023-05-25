import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import useStyles from './levels.styles';
import { CompletedIcon, Level1Icon, Level2Icon, Level3Icon } from 'assets/images';
import { withTranslation, WithTranslation } from 'react-i18next';

interface LevelsProp {
  score: number;
}

interface Level {
  value: number;
  image: string;
  scoreFrom: number;
  scoreTo: number;
}

const levels: Level[] = [
  { value: 1, image: Level1Icon, scoreFrom: 0, scoreTo: 200 },
  { value: 2, image: Level2Icon, scoreFrom: 200, scoreTo: 400 },
  { value: 3, image: Level3Icon, scoreFrom: 400, scoreTo: 600 },
];

const Levels: React.FC<WithTranslation & LevelsProp> = ({ t, score }) => {
  const { classes, cx } = useStyles();

  const renderScore = (level: Level) => {
    return (
      <Grid container className={classes.scoreContainer}>
        {score >= level.scoreTo ? (
          <>
            <Grid item>
              <img src={CompletedIcon} alt={t('Dashboard.Finished') as string} />
            </Grid>
            <Grid item className={classes.finishedItem}>
              <Typography className={classes.finished}>{t('Dashboard.Finished')}</Typography>
            </Grid>
          </>
        ) : score >= level.scoreFrom && score < level.scoreTo ? (
          <>
            <Box className={classes.scoreBox}>
              <Typography className={classes.currentScore}>{score}/</Typography>
              <Typography className={classes.topScore}>{level.scoreTo}</Typography>
            </Box>
          </>
        ) : null}
      </Grid>
    );
  };

  return (
    <Grid container className={classes.root}>
      {levels.map((level) => (
        <Grid item className={classes.levelItem} key={level.value}>
          <Grid container className={classes.levelContainer}>
            <Grid item>{renderScore(level)}</Grid>
            <Grid item className={classes.image}>
              <img
                src={level.image}
                alt={'level' + level.value}
                className={cx(score < level.scoreFrom && classes.lockedLevel)}
              />
              {score < level.scoreFrom && <Box className={classes.lockIcon}></Box>}
            </Grid>
            <Grid item className={classes.level}>
              <Typography className={classes.levelText}>
                LEVEL <span>{level.value}</span>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default withTranslation()(Levels);
