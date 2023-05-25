import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSubjectsActions } from 'store/subjects';
import { subjectsSelector } from 'store/subjects/subjects.selectors';
import { useLessonActions } from 'store/lessons';
import { Mixpanel } from 'utils/mixpanel';
import _ from 'lodash-es';
import { Subject } from 'entities/Subject';
import { profileSelector } from 'store/auth/auth.selectors';
import StudyGoal from './components/StudyGoal';
import SelectSubject from 'components/ui/SelectSubject';
import { WithTranslation, withTranslation } from 'react-i18next';
import { Button, Grid, Typography } from '@mui/material';
import HamburgerMenu from 'components/layout/Header/components/HamburgerMenu';
import useStyles from './FocusTime.styles';
import { useStudycardsActions } from 'store/studycards';
import { useIdoActions } from 'store/ido';
import Ido3D from 'components/narrative-design/Ido3D/Scene3D';
import { idoScenes } from 'components/narrative-design/Ido3D/Scene3D/SceneStateManager';
import { idoActionsSelector } from 'store/ido/ido.selectors';
import { IdoActionTypes } from 'entities/Ido';

// focus time flow entry point & navigation for focus time sub-flows: study-session & look-up

// *study-session* sub-flow starts with steps where user selects options for next study session -
// studySessionFlowMapper (string #98) -> after last step navigates to study-individual page (src/pages/study)

// *look-up* sub-flow navigates to look-up page (src/pages/lookUp)

const pageActions = [
  IdoActionTypes.FOCUSTIME_TIP,
  IdoActionTypes.SUBJECT_ADVICE,
  IdoActionTypes.MOTIVATION,
];

const FocusTime: React.FC<WithTranslation> = ({ t }) => {
  const { classes, cx } = useStyles();

  const profile = useSelector(profileSelector);
  const { create, dispatchSelectGoal } = useLessonActions();
  const { get: getSubjects, selectItem } = useSubjectsActions();
  const { updateTimer } = useStudycardsActions();
  const { data: subjects } = useSelector(subjectsSelector);
  const { selectedItem: selectedSubject } = useSelector(subjectsSelector);
  const { getIdoAction } = useIdoActions();
  const { idoActions } = useSelector(idoActionsSelector);

  const count = 25; // change this for testing purpose
  const [goal, setGoal] = useState<string>('');
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    getSubjects();
    getIdoAction({ type: IdoActionTypes.FOCUSTIME_TIP });
  }, [getSubjects, getIdoAction]);

  useEffect(() => {
    if (!_.isEmpty(subjects))
      setFilteredSubjects(
        subjects
          .filter((subject) => (profile?.native ? subject.native : subject.nonnative))
          .map((subject) => ({ ...subject, name: t(`Study.Subjects.${subject.name}`) })),
      );
  }, [subjects, profile, t]);

  useEffect(() => {
    if (selectedSubject)
      getIdoAction({ type: IdoActionTypes.SUBJECT_ADVICE, subjectId: selectedSubject.id });
  }, [selectedSubject, getIdoAction]);

  const handleChangeGoal = (goal: string) => {
    setGoal(goal);
    dispatchSelectGoal(goal);
  };

  const onStudySessionSubmit = () => {
    if (selectedSubject) {
      create({ subject: selectedSubject.id, duration: count, goal });
      updateTimer(count * 60);
      // after submit user is redirected to study-individual page (redirection
      // happens in `src/store/lesson/lessons.sagas.ts 84`)

      Mixpanel.track('Focus Time Start', {
        'Timer Duration': count,
        'Focus Time Subject': selectedSubject.name,
        'Focus Time Goal': goal,
      });
      Mixpanel.people.set({ 'Last Focus Time Start': new Date().toISOString() });
      Mixpanel.people.set_once({ 'First Focus Time Start': new Date().toISOString() });
      Mixpanel.people.increment('Lifetime Focus Time Spent', count);
    }
  };

  return (
    <>
      <Ido3D
        actions={idoActions?.filter((action) =>
          pageActions.includes(action.type as IdoActionTypes),
        )}
        scene={idoScenes.FOCUSTIME}
      />
      <Grid container className={classes.container}>
        <Grid item>
          <HamburgerMenu />
        </Grid>
        <Grid item className={classes.content}>
          <Grid container className={classes.rows}>
            <Grid item className={classes.divider}>
              <Typography className={classes.title} variant="h1">
                {t('Study.Select Goal.Choose your focus time')}
              </Typography>
            </Grid>
            <Grid item className={cx(classes.divider, classes.subjectsContainer)}>
              <SelectSubject
                selectedSubject={selectedSubject}
                handleSelect={(item: Subject) => {
                  selectItem(item);
                }}
                subjects={filteredSubjects}
              />
            </Grid>
          </Grid>
          <Grid item className={classes.divider}>
            <StudyGoal
              disabled={selectedSubject === null}
              selectedGoalTitle={goal}
              handleSelect={handleChangeGoal}
            />
          </Grid>
          <Grid item className={classes.buttonsItem}>
            <Button
              variant={'contained'}
              color={'primary'}
              className={classes.startButton}
              disableElevation={true}
              onClick={onStudySessionSubmit}
              disabled={goal === ''}
            >
              {t('Study.Start')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default withTranslation()(FocusTime);
