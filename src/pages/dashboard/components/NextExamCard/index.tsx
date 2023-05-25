import React from 'react';
import { Button, Grid } from '@mui/material';

import useStyles from './NextExamCard.styles';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { upcomingExamsSelector } from 'store/tasks/tasks.selectors';
import moment from 'moment';
import { CalendarTask } from 'assets/images/icons';
import useRouterActions from 'store/router';
import Illustrations from 'assets/images/llustrations/illustrations';
import { WithTranslation, withTranslation } from 'react-i18next';

// this component is not used
const NextExamCard: React.FC<WithTranslation> = ({ t }: WithTranslation) => {
  const { classes } = useStyles();
  const exams = useSelector(upcomingExamsSelector);
  const { navigateToStudyDiary } = useRouterActions();

  const renderExamTitle = () => {
    if (!exams) return;
    const nextExam = exams[exams.length - 1];
    return nextExam.title.length > 15 ? `${nextExam.title.slice(0, 15)}...` : nextExam.title;
  };

  const renderSubjectName = () => {
    if (!exams) return;
    const nextExam = exams[exams.length - 1];
    return nextExam.subject.name.length > 12
      ? `${nextExam.subject.name.slice(0, 12)}...`
      : nextExam.subject.name;
  };

  const renderExam = () => {
    if (!exams) return;
    const nextExam = exams[exams.length - 1];
    const daysLeft = moment(nextExam.startDate).diff(moment().startOf('day'), 'd');

    return (
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        direction="column"
        className={classes.examCard}
      >
        <Typography className={classes.subject}>{renderSubjectName()}</Typography>
        <Grid alignItems="center" direction="column" container>
          <img className={classes.subjectImg} src={nextExam.subject.icon} alt={'subject'} />
          <Typography className={classes.title}>{renderExamTitle()}</Typography>
        </Grid>
        <Typography variant="body1">
          {t('Dashboard.in')} <span className={classes.daysCount}>{daysLeft}</span>{' '}
          {t('Dashboard.days')}
        </Typography>
      </Grid>
    );
  };

  const renderEmptyState = () => (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      className={classes.examCard}
      wrap={'wrap'}
    >
      <img className={classes.noExamsImg} src={Illustrations.NoUpcomingExams} alt={'no exams'} />
      <Typography variant={'body1'} className={classes.noExamsText}>
        {t('Dashboard.No upcoming exams')}
      </Typography>
    </Grid>
  );

  return (
    <Grid className={classes.container}>
      <Typography variant="h3">{t('Dashboard.Next exam')}</Typography>
      {exams?.length ? renderExam() : renderEmptyState()}
      <Button
        variant={'contained'}
        disableElevation
        className={classes.button}
        endIcon={<img src={CalendarTask} alt={'calendar with done task'} />}
        onClick={navigateToStudyDiary}
      >
        {t('Dashboard.Add item')}
      </Button>
    </Grid>
  );
};

export default withTranslation()(NextExamCard);
