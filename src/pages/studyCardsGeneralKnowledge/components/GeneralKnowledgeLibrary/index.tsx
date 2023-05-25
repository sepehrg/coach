import React, { useEffect, useState } from 'react';
import useRouterActions from 'store/router';
import { useStudycardsActions } from 'store/studycards';
import { useSelector } from 'react-redux';
import {
  savedSetIndexSelector,
  setsPageCountSelector,
  setsPageSelector,
  setsSelector,
  setsSubjectsSelector,
  studyCardsSelectedSubjectSelector,
} from 'store/studycards/studycards.selectors';
import { loadingActionSelector } from 'store/loader/loader.selectors';
import { GET_GENERAL_KNOWLEDGE_BY_SUBJECT_REQUEST } from 'store/studycards/studycards.types';
import { Grid, Typography, Pagination } from '@mui/material';
import SearchBar from 'components/ui/SearchBar';
import Loader from 'components/containers/Loader';
import { Grade } from 'entities/Grade';
import { useGradeActions } from 'store/grade';
import { chosenGradeSelector } from 'store/grade/grade.selectors';
import GradesPanel from '../GradesPanel';
import Illustrations from 'assets/images/llustrations/illustrations';
import useStyles from './GeneralKnowledgeLibrary.styles';
import GeneralKnowledgeCardsetElement from '../GeneralKnowledgeCardsetElement';
import { WithTranslation, withTranslation } from 'react-i18next';
import { FixedSizeList, FixedSizeListProps, ListChildComponentProps } from 'react-window';

interface GeneralKnowledgeLibraryProps {
  possibleGrades?: Grade[];
}

const GeneralKnowledgeLibrary: React.FC<GeneralKnowledgeLibraryProps & WithTranslation> = (
  props,
) => {
  const { possibleGrades, t } = props;

  const { navigateToStudyCardsSet } = useRouterActions();
  const { chooseGrades } = useGradeActions();
  const {
    dispatchGetGeneralKnowledgeBySubject,
    changePage,
    dispatchFollowSet,
    dispatchUnfollowSet,
    dispatchLikeSet,
    dispatchUnlikeSet,
    dispatchClearStudyCards,
    dispatchSaveSetIndex,
  } = useStudycardsActions();

  const sets = useSelector(setsSelector);
  const selectedSubject = useSelector(studyCardsSelectedSubjectSelector);
  const chosenGrades = useSelector(chosenGradeSelector);
  const savedSetIndex = useSelector(savedSetIndexSelector);
  const studyCardsSubjects = useSelector(setsSubjectsSelector);
  const loading = useSelector(loadingActionSelector)([GET_GENERAL_KNOWLEDGE_BY_SUBJECT_REQUEST]);
  const page = useSelector(setsPageSelector);
  const pageCount = useSelector(setsPageCountSelector);

  const [input, setInput] = useState<string>('');

  const { classes } = useStyles();

  const seacrhBarProps = {
    searchActive: false,
    onChange: setInput,
    loading: false,
    tagsArray: [],
    searchBarStyles: classes.searchBar,
    clearButtonStyles: classes.searchClearBtn,
    placeholderTags: [t('Study Cards.Discover.Search')],
    onClearSearch: () => setInput(''),
    onTagSelect: () => {
      return;
    },
    query: input,
  };

  const getSets = () => {
    selectedSubject &&
      dispatchGetGeneralKnowledgeBySubject(selectedSubject, input && input, page, 10, chosenGrades);
  };

  const onLikeClick = (event: Event, setId: string, setIndex: number) => {
    event.stopPropagation();
    dispatchLikeSet(setId, () => getSets());
    dispatchSaveSetIndex(setIndex);
  };

  const onUnlikeClick = (event: Event, setId: string, setIndex: number) => {
    event.stopPropagation();
    dispatchUnlikeSet(setId, () => getSets());
    dispatchSaveSetIndex(setIndex);
  };

  const onGradeSelect = (grade: Grade | 'all') => {
    if (grade === 'all') {
      if (!possibleGrades) return;
      const newGradesArray = [...possibleGrades];
      chooseGrades(newGradesArray);
      return;
    }

    if (JSON.stringify(possibleGrades) === JSON.stringify(chosenGrades)) {
      const newGradesArray = [];
      newGradesArray.push(grade as Grade);
      chooseGrades(newGradesArray);
      return;
    }

    if (chosenGrades?.includes(grade as Grade)) {
      dispatchClearStudyCards();
      const gradeIndex = chosenGrades.findIndex((item) => {
        return item.id === (grade.id as string);
      });
      const newGradesArray = chosenGrades ? [...chosenGrades] : [];
      newGradesArray.splice(gradeIndex, 1);
      chooseGrades(newGradesArray);
      return;
    }

    if (!chosenGrades?.includes(grade as Grade)) {
      const newGradesArray = chosenGrades ? [...chosenGrades] : [];
      newGradesArray.push(grade as Grade);
      chooseGrades(newGradesArray);
      return;
    }

    chooseGrades([]);
  };

  useEffect(() => {
    getSets();
    // eslint-disable-next-line
  }, [selectedSubject, input, page]);

  const renderEmptyState = () => {
    return (
      <Grid container alignItems={'center'} justifyContent={'flex-start'}>
        <img
          src={Illustrations.GeneralKnowledgeEmpty}
          alt="no sets"
          className={classes.emptyImage}
        />
      </Grid>
    );
  };

  const rowRenderer = ({ index }: ListChildComponentProps) => {
    if (!sets) return <></>;

    const cardSetElementProps = {
      cardsCount: sets[index]?.studyCards,
      isConfirmed: sets[index]?.isFavorite,
      likesCount: sets[index]?.likesCount,
      isFollowed: sets[index]?.isFollowed,
      grade: sets[index]?.grade?.year,
      clickable: true,
      onClick: () => navigateToStudyCardsSet(sets[index]?.id),
      isLiked: sets[index]?.isLiked,
      like: (event: Event) => onLikeClick(event, sets[index]?.id, index),
      unlike: (event: Event) => onUnlikeClick(event, sets[index]?.id, index),
      title: sets[index]?.title,
      tags: sets[index]?.studyCardTags,
      onFollowButton: (event: Event) => {
        event.stopPropagation();
        dispatchFollowSet(sets[index]?.id, () => getSets());
      },
      onUnfollowButton: (event: Event) => {
        event.stopPropagation();
        dispatchUnfollowSet(sets[index]?.id, () => getSets());
      },
    };

    if (index === sets.length) {
      return (
        <>
          <Grid container alignItems={'flex-end'} justifyContent={'center'} md={12} lg={12}>
            <Pagination
              size="small"
              count={pageCount}
              page={page}
              onChange={(event, value) => changePage(value)}
            />
          </Grid>
        </>
      );
    }
    return <GeneralKnowledgeCardsetElement {...cardSetElementProps} />;
  };

  const listProps: FixedSizeListProps = {
    itemCount: sets?.length ? sets.length + 1 : 0,
    itemSize: 104,
    width: 700,
    height: 320,
    overscanCount: 0,
    children: rowRenderer,
    className: classes.list,
    initialScrollOffset: savedSetIndex ? savedSetIndex * 104 : undefined,
  };

  return (
    <Grid direction={'column'} md={12} lg={12} container>
      <Grid
        direction="row"
        container
        justifyContent={'space-between'}
        alignItems={'center'}
        wrap={'nowrap'}
      >
        <Grid md={5} lg={5}>
          <Typography variant="h1" className={classes.title}>
            {t('Study Cards.Discover.General Knowledge')}
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        item
        justifyContent={'flex-start'}
        alignItems={'center'}
        md={8}
        lg={5}
        className={classes.searchWrapper}
      >
        <SearchBar {...seacrhBarProps} />
      </Grid>
      <Grid
        container
        item
        justifyContent={'flex-start'}
        alignItems={'center'}
        wrap={'wrap'}
        className={classes.gradesWrapper}
      >
        <GradesPanel
          grades={possibleGrades}
          selectedGrades={chosenGrades}
          onGradeClick={onGradeSelect}
        />
      </Grid>
      <Loader loading={loading}>
        {!sets || !studyCardsSubjects?.length ? (
          renderEmptyState()
        ) : (
          <div className={classes.listWrapper}>
            <FixedSizeList {...listProps} />
          </div>
        )}
      </Loader>
    </Grid>
  );
};

export default withTranslation()(GeneralKnowledgeLibrary);
