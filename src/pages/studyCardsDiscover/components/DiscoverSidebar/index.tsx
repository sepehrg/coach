import React, { useEffect } from 'react';
import useStyles from './DiscoverSidebar.styles';
import { Box, Button, Grid } from '@mui/material';
import SubjectCardWithLabel from 'components/ui/SubjectCardWithLabel';
import { useStudycardsActions } from 'store/studycards';
import { useSelector } from 'react-redux';
import {
  setsSubjectsSelector,
  studyCardsSelectedSubjectSelector,
} from 'store/studycards/studycards.selectors';
import { BaseSubject } from 'entities/Subject';
import { WithTranslation, withTranslation } from 'react-i18next';
import HamburgerMenu from 'components/layout/Header/components/HamburgerMenu';
import useRouterActions from 'store/router';
import { FixedSizeList, FixedSizeListProps, ListChildComponentProps } from 'react-window';

const DiscoverSidebar: React.FC<WithTranslation> = ({ t }) => {
  const { classes } = useStyles();
  const { goBack } = useRouterActions();
  const { dispatchSelectStudyCardsSubject, changePage } = useStudycardsActions();
  const selectedSubject = useSelector(studyCardsSelectedSubjectSelector);
  const studyCardsSubjects = useSelector(setsSubjectsSelector);

  useEffect(() => {
    if (!studyCardsSubjects?.length) return;
    if (!selectedSubject) dispatchSelectStudyCardsSubject(studyCardsSubjects[0]);
  }, [studyCardsSubjects, dispatchSelectStudyCardsSubject, selectedSubject]);

  const onSubjectClick = (subject: BaseSubject) => {
    dispatchSelectStudyCardsSubject(subject);
    changePage(1);
  };

  const rowRenderer = ({ index }: ListChildComponentProps) => {
    if (!studyCardsSubjects?.length)
      return <div key={index} className={classes.subjectPlaceholder} />;

    return (
      <SubjectCardWithLabel
        key={index}
        labelCount={studyCardsSubjects[index].count}
        isActive={selectedSubject?.id === studyCardsSubjects[index].id}
        subject={studyCardsSubjects[index]}
        onChoose={() => onSubjectClick(studyCardsSubjects[index])}
      />
    );
  };

  const listProps: FixedSizeListProps = {
    itemCount: studyCardsSubjects?.length ? studyCardsSubjects?.length : 3,
    itemSize: 142,
    width: 134,
    height: 430,
    overscanCount: 0,
    children: rowRenderer,
    className: classes.list,
  };

  return (
    <Grid container className={classes.container}>
      <HamburgerMenu />
      <div className={classes.subjectsContainerWrapper}>
        <Grid container direction={'column'} wrap={'nowrap'} className={classes.subjectsContainer}>
          <Box className={classes.backButtonWrapper}>
            <Button
              variant={'contained'}
              color={'primary'}
              disableElevation
              onClick={() => goBack()}
              className={classes.backButton}
            >
              {t('Study Cards.Learn.Back')}
            </Button>
          </Box>
          <FixedSizeList {...listProps} />
        </Grid>
      </div>
    </Grid>
  );
};

export default withTranslation()(DiscoverSidebar);
