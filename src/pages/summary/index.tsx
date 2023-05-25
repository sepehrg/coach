import FormTextField from 'components/ui/FormTextField';
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useStyles from 'pages/summary/Summary.styles';
import useSummaryActions from 'store/summary';
import links from 'framework/links';
import { useLessonActions } from 'store/lessons';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import FeedbackSlider from './components/FeedbackSlider';
import { useSelector } from 'react-redux';
import { goalSelector, lessonsSelector } from 'store/lessons/lessons.selectors';
import { useTagsActions } from 'store/tags';
import HamburgerMenu from 'components/layout/Header/components/HamburgerMenu';
import { IdoWrapUp } from 'assets/images';
import { StarEmpty, StarFilled } from 'assets/images/icons';

export const chooseStarImage = (isActive: boolean) => {
  return isActive ? StarFilled : StarEmpty;
};

// Focus Time flow last page - study session summary
const Summary: React.FC<WithTranslation> = ({ t }) => {
  const { classes } = useStyles();
  const { state } = useLocation();

  const summaryActions = useSummaryActions();
  const lessonsActions = useLessonActions();
  const { resetTags } = useTagsActions();

  const { lastLesson } = useSelector(lessonsSelector);
  const selectedGoal = useSelector(goalSelector);

  const [rate, setRate] = useState<number>(1);
  const [goalScore, setGoalScore] = useState<number>(1);

  const SummarySchema = Yup.object().shape({
    description: Yup.string()
      .min(4, t('Validation.Common.Too Short') as string)
      .trim(),
  });

  useEffect(() => {
    return () => {
      lessonsActions.get();
    };
  }, [lessonsActions]);

  if (state === undefined) {
    return <Navigate replace to={links.student.focusTime} />;
  }

  const isActive = (value: number): boolean => value <= rate;

  const handleSubmit = (description: string) => {
    summaryActions.createSummary({
      id: state.lessonId,
      goalLevel: goalScore,
      focusRating: rate,
      description,
    });
    resetTags();
  };

  const handleStarSelect = (rate: number) => {
    setRate(rate);
  };

  const renderStars = () =>
    [1, 2, 3, 4, 5].map((item: number) => (
      <Grid item key={item} className={classes.rateBox} onClick={() => handleStarSelect(item)}>
        <img src={chooseStarImage(isActive(item))} className={classes.rateImg} alt="Star" />
      </Grid>
    ));

  const renderNumberItem = (number: number) => {
    return (
      <Grid container justifyContent="center" alignItems="center" className={classes.numberItem}>
        <Typography variant={'h4'}>{number}</Typography>
      </Grid>
    );
  };

  return (
    <Grid container className={classes.pageContainer}>
      <Grid item>
        <HamburgerMenu />
      </Grid>
      <Grid item>
        <Grid container className={classes.columns}>
          <Grid item>
            <Grid container className={classes.left}>
              <Grid item className={classes.leftText}>
                <Typography className={classes.studyTime}>{lastLesson?.actualDuration}</Typography>
                <Typography variant={'body1'} className={classes.minutes}>
                  {t('Summary.Minutes studied')}
                </Typography>
              </Grid>
              <img src={IdoWrapUp} alt="Success" className={classes.image} />
            </Grid>
          </Grid>
          <Grid item>
            <Box className={classes.rightWrapper}>
              <Grid container className={classes.right}>
                <Formik
                  initialValues={{ description: '' }}
                  validationSchema={SummarySchema}
                  onSubmit={(values) => {
                    handleSubmit(values.description);
                  }}
                >
                  {({ submitForm, isValid }) => (
                    <Form>
                      <Grid item container>
                        <Typography variant={'h1'} className={classes.summaryTitle}>
                          {t('Summary.Session Wrap Up')}
                        </Typography>
                      </Grid>
                      <Grid item container>
                        {renderNumberItem(1)}
                        <Typography variant={'body1'} className={classes.label}>
                          {t('Summary.How focused')}
                        </Typography>
                      </Grid>
                      <Grid container className={`${classes.ratesContainer} `}>
                        <Grid item md={9}>
                          <Grid container justifyContent={'space-between'}>
                            {renderStars()}
                          </Grid>
                          <Grid item container justifyContent={'space-between'}>
                            <Typography variant={'body1'} className={classes.focusState}>
                              {t('Summary.No focus')}
                            </Typography>
                            <Typography variant={'body1'} className={classes.focusState}>
                              {t('Summary.Full focus')}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item container>
                        {renderNumberItem(2)}
                        <Grid item>
                          <Typography variant={'body1'} className={classes.label}>
                            {t('Summary.Your goal was')}
                            <span className={classes.goalText}>{selectedGoal}</span>
                          </Typography>
                          {/* <Typography variant={'body1'}>
                              {t('Summary.Did you reach your goal')}
                            </Typography> */}
                        </Grid>
                      </Grid>
                      <Grid item container justifyContent={'center'}>
                        <FeedbackSlider selectedMark={goalScore} onClick={setGoalScore} />
                      </Grid>
                      <Grid item container>
                        {renderNumberItem(3)}
                        <Typography variant={'body1'} className={classes.label}>
                          {t('Summary.Leave comment')}
                        </Typography>
                      </Grid>
                      <Grid item container justifyContent={'center'}>
                        <Field
                          component={FormTextField}
                          name={'description'}
                          type={'string'}
                          className={classes.textField}
                          placeholder={t('Summary.Comment placeholder')}
                          multiline
                          rows={3}
                          classes={{ root: classes.textArea }}
                        />
                      </Grid>
                      <Grid item container justifyContent={'center'}>
                        <Button
                          className={classes.completeButton}
                          color={'primary'}
                          variant={'contained'}
                          disableElevation
                          onClick={submitForm}
                          disabled={!isValid}
                        >
                          {t('Study.Complete')}
                        </Button>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withTranslation()(Summary);
