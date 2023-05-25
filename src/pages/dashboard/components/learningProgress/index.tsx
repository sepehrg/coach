import React, { FC } from 'react';
import useStyles from './learningProgress.styles';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Button, Grid, Typography } from '@mui/material';
import {
  GoldBottom,
  GoldTop,
  ProgressArrowLeft,
  ProgressArrowRight,
  SilverBottom,
  SilverTop,
} from 'assets/images';
import { Green, Orange, Purple } from 'assets/videos';
import { StudyProgressDay, StudyProgressSubject } from 'entities/Dashboard';

interface LearningProgressProps {
  studyDays: StudyProgressDay[];
  week: number;
  setWeek: (week: number) => void;
}

const LearningProgress: FC<LearningProgressProps & WithTranslation> = ({
  studyDays,
  week,
  setWeek,
  t,
}) => {
  const { classes } = useStyles();

  const getBackground = (height: number) => {
    switch (height) {
      case 0:
      case 25:
        return 'linear-gradient(0, #da8424 0%, #FEB615 100%)';
      case 50:
      case 75:
        return 'linear-gradient(0, #098524 0%, #04D131 100%)';
      case 100:
        return 'linear-gradient(0, #86144A 0%, #FFBEDD 100%)';
    }
  };

  const getBottom = (height: number) => {
    switch (height) {
      case 0:
      case 25:
      case 50:
        return `url(${SilverBottom})`;
      case 75:
      case 100:
        return `url(${GoldBottom})`;
    }
  };

  const getTop = (height: number) => {
    switch (height) {
      case 0:
      case 25:
      case 50:
        return `url(${SilverTop})`;
      case 75:
      case 100:
        return `url(${GoldTop})`;
    }
  };

  const getVideo = (height: number) => {
    switch (height) {
      case 0:
      case 25:
        return Orange;
      case 50:
      case 75:
        return Green;
      case 100:
        return Purple;
    }
  };

  const getBackgroundVideo = (height: number) => {
    return (
      <video autoPlay muted loop className={classes.video}>
        <source src={getVideo(height)} type="video/webm" />
        Your browser does not support the video tag.
      </video>
    );
  };

  const getHeight = (item: StudyProgressDay) => {
    const duration = item.subjectDuration.reduce((totalTime, subject: StudyProgressSubject) => {
      return totalTime + (subject.duration >= 25 ? subject.duration : 0);
    }, 0);
    const height = Math.floor((duration < 100 ? duration : 100) / 25) * 25;
    return height;
  };

  return (
    <Grid container className={classes.root}>
      <Grid item>
        <Button
          disableElevation
          disableRipple
          className={classes.arrow}
          onClick={() => setWeek(week - 1)}
        >
          <img src={ProgressArrowLeft} alt="calendar" />
        </Button>
      </Grid>
      <Grid item container className={classes.columns}>
        {studyDays.map((item) => {
          const height = getHeight(item);
          return (
            <Grid item key={item.day}>
              <Grid container className={classes.day}>
                <Grid item className={classes.cylinderBg}>
                  <Grid
                    container
                    className={classes.cylinder}
                    style={{
                      height: `${height <= 25 ? (height === 0 ? 25 : 40) : height}%`,
                    }}
                  >
                    <Grid
                      item
                      className={classes.top}
                      style={{
                        background: getTop(height),
                      }}
                    ></Grid>
                    <Grid
                      item
                      className={classes.liquid}
                      style={{
                        background: `${getBackground(height)}`,
                        height: height,
                      }}
                    >
                      {getBackgroundVideo(height)}
                    </Grid>
                    <Grid
                      item
                      className={classes.bottom}
                      style={{
                        background: getBottom(height),
                      }}
                    ></Grid>
                    <Grid item className={classes.rings}>
                      <Grid container className={classes.ringsContainer}>
                        <>
                          {Array.from(Array((height === 0 ? 25 : height) / 25 - 1)).map(
                            (_, index) => (
                              <Grid item key={index} className={classes.ring}></Grid>
                            ),
                          )}
                        </>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className={classes.weekdays}>
                  <Typography className={classes.title}>{t(`Dashboard.${item.day}`)}</Typography>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
      <Grid item>
        <Button
          disableElevation
          disableRipple
          className={classes.arrow}
          disabled={week === 0}
          onClick={() => setWeek(week + 1)}
        >
          <img src={ProgressArrowRight} alt="calendar" />
        </Button>
      </Grid>
    </Grid>
  );
};

export default withTranslation()(LearningProgress);
