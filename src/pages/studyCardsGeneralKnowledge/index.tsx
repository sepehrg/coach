import React, { useEffect, useState } from 'react';
import useStyles from '../studyCardsDiscover/StudyCardsDiscover.styles';
import { Box, Grid } from '@mui/material';
import { useGradeActions } from 'store/grade';
import { useSelector } from 'react-redux';
import { chosenGradeSelector, possibleGradesSelector } from 'store/grade/grade.selectors';
import { Grade } from 'entities/Grade';
import { userGradeSelector } from 'store/auth/auth.selectors';
import { useStudycardsActions } from 'store/studycards';
import GeneralKnowledgeSidebar from './components/GeneralKnowledgeSidebar';
import { setsSubjectsSelector } from 'store/studycards/studycards.selectors';
import GeneralKnowledgeLibrary from './components/GeneralKnowledgeLibrary';

// Study Cards General Knowledge (Study Cards - Discover - General Knowledge on UI)

const StudyCardsGeneralKnowledge = () => {
  const { classes } = useStyles();

  const { get: getGrades, chooseGrades } = useGradeActions();
  const grades = useSelector(possibleGradesSelector);
  const userGrade = useSelector(userGradeSelector);
  const chosenGrades = useSelector(chosenGradeSelector);
  const [possibleGrades, setPossibleGrades] = useState<Grade[] | undefined>(undefined);
  const { dispatchGetGeneralKnowledgeSets, dispatchClearSetIndex } = useStudycardsActions();
  const studyCardsSubjects = useSelector(setsSubjectsSelector);

  useEffect(() => {
    getGrades();
    dispatchClearSetIndex();
  }, [getGrades, dispatchClearSetIndex]);

  useEffect(() => {
    if (!grades || !userGrade) return;
    const tempGradesArray: Grade[] = [];
    grades?.forEach((item: Grade) => {
      if (item.year <= userGrade?.year) tempGradesArray.push(item);
    });
    setPossibleGrades(tempGradesArray);
  }, [grades, userGrade]);

  useEffect(() => {
    if (!chosenGrades) return;
    chosenGrades.length && dispatchGetGeneralKnowledgeSets(chosenGrades);
  }, [chosenGrades, dispatchGetGeneralKnowledgeSets]);

  useEffect(() => {
    if (!possibleGrades) return;
    const tempGradesArray = [...possibleGrades];
    chooseGrades(tempGradesArray);
  }, [possibleGrades, chooseGrades]);

  return (
    <Grid container direction={'row'} wrap={'nowrap'}>
      <GeneralKnowledgeSidebar studyCardsSubjects={studyCardsSubjects} />
      <Box className={classes.container}>
        <GeneralKnowledgeLibrary possibleGrades={possibleGrades} />
      </Box>
    </Grid>
  );
};

export default StudyCardsGeneralKnowledge;
