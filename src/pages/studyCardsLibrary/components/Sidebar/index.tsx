import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Grid } from '@mui/material';
import { useStudycardsActions } from 'store/studycards';
import useRouterActions from 'store/router';
import SubjectCardWithLabel from 'components/ui/SubjectCardWithLabel';
import {
  setsSubjectsSelector,
  studyCardsSelectedSubjectSelector,
  unsortedCountSelector,
} from 'store/studycards/studycards.selectors';
import { BaseSubject } from 'entities/Subject';
import { CardsPNG } from 'assets/images/icons';
import useStyles from './Sidebar.styles';
import { WithTranslation, withTranslation } from 'react-i18next';
import HamburgerMenu from 'components/layout/Header/components/HamburgerMenu';
import { FixedSizeList, FixedSizeListProps, ListChildComponentProps } from 'react-window';

interface SidebarProps {
  isSelectedUnsorted: boolean;
  selectUnsorted: () => void;
  unselectUnsorted: () => void;
}

const Sidebar: React.FC<SidebarProps & WithTranslation> = (props) => {
  const { isSelectedUnsorted, selectUnsorted, unselectUnsorted, t } = props;

  const { dispatchSelectStudyCardsSubject, changePage, dispatchClearStudyCards } =
    useStudycardsActions();
  const { navigateToStudyCardsDiscover } = useRouterActions();

  const selectedSubject = useSelector(studyCardsSelectedSubjectSelector);
  const studyCardsSubjects = useSelector(setsSubjectsSelector);
  const unsortedCount = useSelector(unsortedCountSelector);

  const { classes } = useStyles();

  const unsortedSubject = {
    id: 'unsorted',
    name: t('Study Cards.Library.Unsorted'),
    icon: CardsPNG,
    count: unsortedCount,
  };

  useEffect(() => {
    if (!studyCardsSubjects?.length) return;
    if (!selectedSubject) dispatchSelectStudyCardsSubject(studyCardsSubjects[0]);
  }, [studyCardsSubjects, dispatchSelectStudyCardsSubject, selectedSubject]);

  const onSubjectClick = (subject: BaseSubject) => {
    dispatchSelectStudyCardsSubject(subject);
    changePage(1);
  };

  const onDiscoverClick = () => {
    dispatchClearStudyCards();
    navigateToStudyCardsDiscover();
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
        onChoose={() => {
          onSubjectClick(studyCardsSubjects[index]);
          unselectUnsorted();
        }}
      />
    );
  };

  const listProps: FixedSizeListProps = {
    itemCount: studyCardsSubjects?.length ? studyCardsSubjects?.length : 3,
    itemSize: 142,
    width: 155,
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
          <Button
            variant={'contained'}
            color={'primary'}
            disableElevation
            className={classes.button}
            onClick={onDiscoverClick}
          >
            {t('Study Cards.Library.Discover')}
          </Button>
          <Box className={classes.unsortedWrapper}>
            <SubjectCardWithLabel
              labelCount={unsortedCount}
              isActive={isSelectedUnsorted}
              subject={unsortedSubject}
              onChoose={selectUnsorted}
            />
          </Box>
          <FixedSizeList {...listProps} />
        </Grid>
      </div>
    </Grid>
  );
};

export default withTranslation()(Sidebar);
