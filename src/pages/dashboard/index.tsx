import React, { useCallback, useEffect, useState } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Box, Grid, Typography } from '@mui/material';
import useStyles from './Dashboard.styles';
import withIdo from 'components/narrative-design/withIdo';
import { Switch } from 'antd';
import { BarIcon, Calendar, Cylinder, Focusttime, Study } from 'assets/images';
import ProgressBar from './components/progressBar';
import Levels from './components/levels';
import { Link } from 'react-router-dom';
import LearningProgress from './components/learningProgress';
import LearningOverview from './components/learningOverview';
import Header from 'components/layout/Header';
import links from 'framework/links';
import { useDashboardActions } from 'store/dashboard';
import { useSelector } from 'react-redux';
import {
  dashboardStatisticsSelector,
  mintuesStudiedSelector,
  progressSelector,
} from 'store/dashboard/dashboard.selectors';
import { StudyProgressDay } from 'entities/Dashboard';
import moment from 'moment';
import 'antd/dist/reset.css';

interface WithIdoProps {
  showIdo: (label: string, value?: unknown) => void;
}

// Dashboard / HomePage

const Dashboard: React.FC<WithTranslation & WithIdoProps> = ({
  t,
}: WithTranslation & WithIdoProps) => {
  const { classes } = useStyles();
  const dashboardStatistics = useSelector(dashboardStatisticsSelector);
  const progress = useSelector(progressSelector);
  const mintuesStudied = useSelector(mintuesStudiedSelector);
  const { dispatchGetStudyProgress } = useDashboardActions();

  const [barView, setBarView] = useState(true);
  const [studyDays, setStudyDays] = useState<StudyProgressDay[]>([]);
  const [week, setWeek] = useState<number>(0);

  const getProgressWithWeekend = useCallback((progress: StudyProgressDay[]) => {
    const result: StudyProgressDay[] = [];
    progress.forEach((studyItem, index) => {
      if (studyItem.day === 'Sun') return;
      if (studyItem.day === 'Sat')
        result.push(getWeekendStudy(studyItem, progress[index + 1] ?? ({} as StudyProgressDay)));
      else result.push(studyItem);
    });
    return result;
  }, []);

  useEffect(() => {
    dispatchGetStudyProgress(getStartAndEndDate(week));
  }, [dispatchGetStudyProgress, week]);

  useEffect(() => {
    if (dashboardStatistics) setStudyDays(getProgressWithWeekend(dashboardStatistics));
  }, [dashboardStatistics, getProgressWithWeekend]);

  const getWeekendStudy = (saturdayStudy: StudyProgressDay, sundayStudy: StudyProgressDay) => ({
    date: saturdayStudy.date,
    day: 'Weekend',
    subjectDuration: [...saturdayStudy.subjectDuration, ...(sundayStudy.subjectDuration ?? [])],
    duration: saturdayStudy.duration + (sundayStudy.duration ?? 0),
  });

  const getStartAndEndDate = (week: number) => ({
    startDate: moment().startOf('isoWeek').add(week, 'week').format('YYYY-MM-DD'),
    endDate: moment().endOf('isoWeek').add(week, 'week').format('YYYY-MM-DD'),
  });

  const getWeekDateLabel = () => {
    const dates = getStartAndEndDate(week);
    return `${formatDate(dates.startDate)} - ${formatDate(dates.endDate)}`;
  };

  const formatDate = (date: string) => moment(date).format('DD.MM.YYYY');

  return (
    <>
      <Header />
      <Grid container>
        <Grid item>
          <Grid container className={classes.dashboard}>
            <Grid item className={classes.outer}>
              <Box className={classes.inner}>
                <Grid container className={classes.dashboardContent}>
                  <Grid item>
                    <Grid container className={classes.header}>
                      <Grid item>
                        <Typography className={classes.title}>
                          {t('Dashboard.weeklyLearningProgress')}
                        </Typography>
                      </Grid>
                      {!barView && (
                        <Grid item>
                          <Typography className={classes.title}>{getWeekDateLabel()}</Typography>
                        </Grid>
                      )}
                      <Grid item>
                        <Box>
                          <Switch
                            className={classes.switch}
                            checkedChildren={
                              <img src={BarIcon} alt="bar" className={classes.switchIcon} />
                            }
                            unCheckedChildren={
                              <img src={Cylinder} alt="cylinder" className={classes.switchIcon} />
                            }
                            checked={barView}
                            onChange={() => setBarView(!barView)}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  {barView ? (
                    <>
                      <Grid item className={classes.progressBar}>
                        <ProgressBar percent={progress || 0} />
                      </Grid>
                      <Grid item>
                        <Levels score={mintuesStudied || 0} />
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid item>
                        <LearningProgress studyDays={studyDays} week={week} setWeek={setWeek} />
                      </Grid>
                      <Grid item>
                        <LearningOverview studyDays={studyDays} />
                      </Grid>
                    </>
                  )}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.quickAccess}>
          <Grid container className={classes.links}>
            <Grid item>
              <Link to={links.student.studyNotes}>
                <img src={Study} alt="study" />
              </Link>
            </Grid>
            <Grid item>
              <Link to={links.student.studyDiary}>
                <img src={Calendar} alt="calendar" />
              </Link>
            </Grid>
            <Grid item>
              <Link to={links.student.focusTime}>
                <img src={Focusttime} alt="search" />
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default withTranslation()(withIdo(Dashboard));
