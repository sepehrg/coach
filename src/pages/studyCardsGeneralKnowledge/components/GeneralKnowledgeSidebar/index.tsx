import React, { useEffect } from 'react';
import useStyles from './GeneralKnowledgeSidebar.styles';
import { Grid, Typography } from '@mui/material';
import { BaseSubject, StudyCardsSubject } from 'entities/Subject';
import SubjectCardWithLabel from 'components/ui/SubjectCardWithLabel';
import { useSelector } from 'react-redux';
import { studyCardsSelectedSubjectSelector } from 'store/studycards/studycards.selectors';
import { useStudycardsActions } from 'store/studycards';
import { WithTranslation, withTranslation } from 'react-i18next';
import { FixedSizeList, FixedSizeListProps, ListChildComponentProps } from 'react-window';

interface GeneralKnowledgeSidebar {
  studyCardsSubjects: StudyCardsSubject[] | null;
}

const GeneralKnowledgeSidebar: React.FC<GeneralKnowledgeSidebar & WithTranslation> = (props) => {
  const { classes } = useStyles();
  const { studyCardsSubjects, t } = props;
  const selectedSubject = useSelector(studyCardsSelectedSubjectSelector);
  const { dispatchSelectStudyCardsSubject, changePage } = useStudycardsActions();

  useEffect(() => {
    if (!studyCardsSubjects?.length) return;
    if (!selectedSubject) dispatchSelectStudyCardsSubject(studyCardsSubjects[0]);
  }, [studyCardsSubjects, dispatchSelectStudyCardsSubject, selectedSubject]);

  const onSubjectClick = (subject: BaseSubject) => {
    dispatchSelectStudyCardsSubject(subject);
    changePage(1);
  };

  const rowRenderer = ({ index }: ListChildComponentProps) => {
    if (!studyCardsSubjects?.length) return <div className={classes.subjectPlaceholder} />;

    return (
      <SubjectCardWithLabel
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
    width: 155,
    height: 480,
    overscanCount: 0,
    children: rowRenderer,
    className: classes.list,
  };

  return (
    <Grid className={classes.container}>
      <Grid container direction={'column'} wrap={'nowrap'} className={classes.subjectsContainer}>
        <Typography variant={'h2'} className={classes.title}>
          {t('Study Cards.Discover.Subjects')}
        </Typography>
        <FixedSizeList {...listProps} />
      </Grid>
    </Grid>
  );
};

export default withTranslation()(GeneralKnowledgeSidebar);
