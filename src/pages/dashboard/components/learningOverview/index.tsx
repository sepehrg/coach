import React, { FC, useEffect, useState } from 'react';
import { Bar, BarChart, Cell, ReferenceLine, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import useStyles from './learningOverview.styles';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Grid, Theme, Typography, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { subjectsDataSelector } from 'store/subjects/subjects.selectors';
import { useSubjectsActions } from 'store/subjects';
import { StudyProgressDay } from 'entities/Dashboard';
import { Subject } from 'entities/Subject';
import { profileSelector } from 'store/auth/auth.selectors';
import _ from 'lodash-es';

interface ChartData {
  name: string;
  [key: string]: any;
}

interface SubjectDuration {
  subject: string;
  duration: number;
  color: string;
}

interface LearningOverviewProps {
  studyDays: StudyProgressDay[];
}

const LearningOverview: FC<LearningOverviewProps & WithTranslation> = ({ studyDays, t }) => {
  const { classes } = useStyles();
  const subjects = useSelector(subjectsDataSelector);
  const profile = useSelector(profileSelector);
  const { get: getSubjects } = useSubjectsActions();

  const [activeIndex, setActiveIndex] = useState(-1);
  const [subjectStatistics, setSubjectStatistics] = useState<SubjectDuration[]>([]);
  const [activePayload, setActivePayload] = useState<SubjectDuration[]>([]);
  const [chartStudyDays, setChartStudyDays] = useState<ChartData[]>([]);
  const [sumDuration, setSumDuration] = useState<number>(0);
  const [maxDuration, setMaxDuration] = useState<number>(0);
  const [average, setAverage] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);

  const isSmallDevice = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  useEffect(() => {
    if (studyDays.length > 0) {
      const studyDaysDuration = studyDays.reduce((acc, value) => acc + value.duration, 0);
      const daysStudied = studyDays.filter((day) => day.duration !== 0).length;
      calculateChartData(studyDays);
      calculateSubjectsDuration(studyDays);
      setSumDuration(studyDaysDuration);
      setMaxDuration(Math.max(...studyDays.map((item) => item.duration)));
      setAverage(daysStudied ? Math.floor(studyDaysDuration / daysStudied) : 0);
    }
  }, [studyDays]);

  useEffect(() => {
    if (maxDuration) setHeight((average / maxDuration) * 100);
    else setHeight(0);
  }, [maxDuration, average]);

  useEffect(() => {
    getSubjects();
  }, [getSubjects]);

  useEffect(() => {
    if (!_.isEmpty(subjects))
      setFilteredSubjects(
        subjects
          .filter((subject) => (profile?.native ? subject.native : subject.nonnative))
          .map((subject) => ({ ...subject, name: t(`Study.Subjects.${subject.name}`) })),
      );
  }, [subjects, profile, t]);

  useEffect(() => {
    setActivePayload(subjectStatistics);
  }, [subjectStatistics]);

  const calculateChartData = (progress: StudyProgressDay[]) => {
    const temp: ChartData[] = [];
    progress.forEach((item) =>
      temp.push({
        name: item.day,
        ...item.subjectDuration.reduce(
          (acc, value) => ({ ...acc, [value.subject]: value.duration }),
          {},
        ),
      }),
    );
    setChartStudyDays(temp);
  };

  const calculateSubjectsDuration = (progress: StudyProgressDay[]) => {
    const subjectDurations: SubjectDuration[] = [];
    progress.forEach((item) => {
      return subjectDurations.push(...item.subjectDuration);
    });

    let accumulatedSubjectDurations: SubjectDuration[] = [];
    subjectDurations.forEach((subjectDuration) => {
      const previouslyPushed = accumulatedSubjectDurations.filter(
        (item) => item.subject === subjectDuration.subject,
      );
      if (previouslyPushed.length === 0) accumulatedSubjectDurations.push(subjectDuration);
      else {
        const indexOfObject = accumulatedSubjectDurations.findIndex(
          (object) => object.subject === previouslyPushed[0].subject,
        );
        accumulatedSubjectDurations.splice(indexOfObject, 1);
        accumulatedSubjectDurations = [
          ...accumulatedSubjectDurations,
          {
            subject: previouslyPushed[0].subject,
            duration: previouslyPushed[0].duration + subjectDuration.duration,
            color: previouslyPushed[0].color,
          },
        ];
      }
    });
    setSubjectStatistics(
      accumulatedSubjectDurations.sort((a: any, b: any) =>
        a.subject < b.subject ? -1 : a.subject > b.subject ? 1 : 0,
      ),
    );
  };

  const handleMouseLeave = () => {
    setActiveIndex(-1);
    setActivePayload(subjectStatistics);
  };

  const barChartClickHandler = (e: any) => {
    setActivePayload(
      e.activePayload
        .map((payload: any) => ({
          subject: payload.dataKey,
          duration: payload.value,
          color: payload.fill,
        }))
        .sort((a: any, b: any) => (a.subject < b.subject ? -1 : a.subject > b.subject ? 1 : 0)) ||
        [],
    );
  };

  const handleClick = (data: any, index: any) => {
    setActiveIndex(index);
  };

  const minutesToTimeFormat = (minutes: number) => {
    if (minutes < 60) return `${minutes} Min.`;
    const hour = Math.floor(minutes / 60);
    const min = minutes % 60;
    return (
      `${hour} ${t('Dashboard.Hours')}` + (min !== 0 ? ` ${min} ${t('Dashboard.Minutes')}` : '')
    );
  };

  const getSubjectDuration = (subject: Subject) =>
    minutesToTimeFormat(
      activePayload.filter((payload) => payload.subject === subject.name)[0]?.duration || 0,
    );

  const generateDataSeries = (subject: Subject, shift: number) => {
    return (
      <Bar
        key={subject.name}
        dataKey={subject.name}
        stackId="a"
        fill={subject.color}
        onClick={handleClick}
        background={shift === 0 && { fill: '#EBEBEB' }}
      >
        {chartStudyDays.map((e: any, index: number) => {
          return (
            <Cell
              cursor="pointer"
              opacity={index === activeIndex || activeIndex === -1 ? 1 : 0.5}
              key={`cell-${index}`}
            />
          );
        })}
      </Bar>
    );
  };

  return (
    <Grid container className={classes.root}>
      <Grid item>
        <Grid container className={classes.headerContainer}>
          <Grid item className={classes.title}>
            <Typography>{t('Dashboard.Overview of your study time')}</Typography>
          </Grid>
          <Grid item className={classes.totalTime}>
            <Typography>{minutesToTimeFormat(sumDuration)}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container className={classes.content}>
          <Grid item className={classes.barChart}>
            {filteredSubjects.length > 0 && chartStudyDays.length > 0 && (
              <Grid container className={classes.inner}>
                <Grid item className={classes.chartItem}>
                  <ResponsiveContainer width="100%" height="100%" aspect={2}>
                    <BarChart
                      data={chartStudyDays}
                      onMouseLeave={handleMouseLeave}
                      onClick={barChartClickHandler}
                      barCategoryGap={isSmallDevice ? 15 : 20}
                    >
                      <XAxis
                        dataKey="name"
                        tickFormatter={(value) => t(`Dashboard.${value}`).charAt(0)}
                        style={{ fontWeight: 600, fontSize: 18 }}
                        axisLine={{ stroke: '#ffffff', strokeWidth: 2 }}
                      />
                      <YAxis domain={[0, 'dataMax']} tick={false} axisLine={{ strokeWidth: 0 }} />
                      {filteredSubjects.map((subject, index) => generateDataSeries(subject, index))}
                      {average && (
                        <ReferenceLine
                          y={average}
                          stroke="#5126AD"
                          strokeWidth={6}
                          strokeDasharray="20 20"
                          width={400}
                        ></ReferenceLine>
                      )}
                    </BarChart>
                  </ResponsiveContainer>
                </Grid>
                <Grid item className={classes.averageItem}>
                  <Grid container className={classes.averageContainer}>
                    <Grid item className={classes.average} style={{ bottom: `${height * 0.94}%` }}>
                      {minutesToTimeFormat(average)}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid item className={classes.details}>
            <Grid container direction="column">
              {filteredSubjects.map((item: Subject, index) => (
                <Grid item className={classes.studyTile} key={index}>
                  <Grid container className={classes.studyTileContainer}>
                    <Grid item className={classes.time}>
                      <Typography>{getSubjectDuration(item)}</Typography>
                    </Grid>
                    <Grid item className={classes.topic}>
                      <Grid container className={classes.topicContainer}>
                        <Grid
                          item
                          className={classes.color}
                          style={{ backgroundColor: item.color }}
                        ></Grid>
                        <Grid item className={classes.topicTitle}>
                          <Typography>{item.name}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withTranslation()(LearningOverview);
