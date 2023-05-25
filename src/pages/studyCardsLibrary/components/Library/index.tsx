import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { WithTranslation, withTranslation } from 'react-i18next';
import { Button, Grid, IconButton, Typography, useMediaQuery, Pagination } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SearchBar from 'components/ui/SearchBar';
import useRouterActions from 'store/router';
import Illustrations from 'assets/images/llustrations/illustrations';
import LibraryCardsetElement from '../LibraryCardsetElement';
import Loader from 'components/containers/Loader';
import {
  savedSetIndexSelector,
  setsPageCountSelector,
  setsPageSelector,
  setsSelector,
  setsSubjectsSelector,
  studyCardsSelectedSubjectSelector,
} from 'store/studycards/studycards.selectors';
import { loadingActionSelector } from 'store/loader/loader.selectors';
import {
  GET_LIBRARY_SETS_BY_SUBJECT_REQUEST,
  GET_LIBRARY_STUDY_CARD_SETS_REQUEST,
} from 'store/studycards/studycards.types';
import { useStudycardsActions } from 'store/studycards';
import useStyles from './Library.styles';
import SelectSubjectModal from '../SelectSubjectModal';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

interface LibraryProps {
  toggleEditMode: () => void;
}

const Library: React.FC<LibraryProps & WithTranslation> = (props) => {
  const { classes, theme } = useStyles();
  const { toggleEditMode, t } = props;

  const [input, setInput] = useState<string>('');
  const [selectSubjectOpen, setSelectSubjectOpen] = useState<boolean>(false);

  const { navigateToStudyCardsCreate, navigateToStudyCardsLibrarySet, navigateToLearningSet } =
    useRouterActions();
  const {
    changePage,
    dispatchGetLibrarySetsBySubject,
    dispatchLikeSet,
    dispatchUnlikeSet,
    dispatchSaveSetIndex,
  } = useStudycardsActions();

  const librarySubject = useSelector(studyCardsSelectedSubjectSelector);
  const studyCardsSubjects = useSelector(setsSubjectsSelector);
  const savedSetIndex = useSelector(savedSetIndexSelector);
  const sets = useSelector(setsSelector);
  const page = useSelector(setsPageSelector);
  const pageCount = useSelector(setsPageCountSelector);
  const loading = useSelector(loadingActionSelector)([
    GET_LIBRARY_SETS_BY_SUBJECT_REQUEST,
    GET_LIBRARY_STUDY_CARD_SETS_REQUEST,
  ]);

  const searchbarProps = {
    searchActive: false,
    onChange: setInput,
    loading: false,
    tagsArray: [],
    searchBarStyles: classes.searchBar,
    clearButtonStyles: classes.searchClearBtn,
    placeholderTags: [t('Study Cards.Library.Placeholder')],
    onClearSearch: () => setInput(''),
    onTagSelect: () => {
      return;
    },
    query: input,
  };

  const onNewSetClick = () => {
    setSelectSubjectOpen(true);
  };

  const getSets = useCallback(() => {
    librarySubject && dispatchGetLibrarySetsBySubject(librarySubject, input && input, page, 10);
  }, [dispatchGetLibrarySetsBySubject, input, librarySubject, page]);

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

  useEffect(() => {
    getSets();
  }, [getSets]);

  const rowRenderer = ({ index }: ListChildComponentProps<unknown>) => {
    if (!sets) return <></>;

    const cardsetElementProps = {
      key: index,
      cardsCount: sets[index]?.studyCards,
      isConfirmed: sets[index]?.isFavorite,
      likesCount: sets[index]?.likesCount,
      isLiked: sets[index]?.isLiked,
      like: (event: Event) => onLikeClick(event, sets[index]?.id, index),
      unlike: (event: Event) => onUnlikeClick(event, sets[index]?.id, index),
      isFollowed: sets[index]?.isFollowed,
      isPrivate: sets[index]?.isPrivate,
      title: sets[index]?.title,
      tags: sets[index]?.studyCardTags,
      clickable: true,
      onClick: () => navigateToStudyCardsLibrarySet(sets[index]?.id),
      onStudyButton: (event: Event) => {
        event.stopPropagation();
        navigateToLearningSet(sets[index]?.id, sets[index]?.title, librarySubject?.name ?? '');
      },
    };

    if (index === sets.length) {
      return (
        <Grid container key={index} alignItems={'flex-end'} justifyContent={'center'}>
          <Pagination
            size="small"
            count={pageCount}
            page={page}
            onChange={(event, value) => changePage(value)}
          />
        </Grid>
      );
    }
    return <LibraryCardsetElement {...cardsetElementProps} />;
  };

  const renderEmptyState = () => {
    return !studyCardsSubjects?.length ? (
      <Grid item md={12} lg={12}></Grid>
    ) : (
      renderSubjectNotSelected()
    );
  };

  const renderSubjectNotSelected = () => {
    return (
      <img
        src={Illustrations.SelectSubject}
        className={classes.emptyImg}
        alt={'select subject on the left'}
      />
    );
  };

  return (
    <>
      <Grid container className={classes.root}>
        <Grid
          direction="row"
          container
          justifyContent={'space-between'}
          alignItems={'center'}
          wrap={'nowrap'}
        >
          <Grid item md={5} lg={5}>
            <Typography variant="h1" className={classes.title}>
              {t('Study Cards.Library.My Library')}
            </Typography>
          </Grid>
          <Grid direction="row" container item justifyContent={'flex-end'}>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={onNewSetClick}
              startIcon={<AddRoundedIcon />}
            >
              {t('Study Cards.Library.New set')}
            </Button>
            <IconButton className={classes.editBtn} onClick={toggleEditMode} size="large">
              <EditRoundedIcon />
            </IconButton>
          </Grid>
        </Grid>
        {!librarySubject && !loading ? (
          renderEmptyState()
        ) : (
          <>
            <Grid
              container
              item
              justifyContent={'flex-start'}
              alignItems={'center'}
              className={classes.searchWrapper}
            >
              <SearchBar {...searchbarProps} />
            </Grid>
            <Loader loading={loading}>
              <div className={classes.listWrapper}>
                <FixedSizeList
                  itemCount={sets?.length ? sets?.length + 1 : 0}
                  itemSize={104}
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  width={useMediaQuery(theme.breakpoints.down('md')) ? 800 : 1030}
                  height={500}
                  overscanCount={3}
                  children={rowRenderer}
                  className={classes.list}
                  initialScrollOffset={savedSetIndex ? savedSetIndex * 104 : 0}
                />
              </div>
            </Loader>
          </>
        )}
      </Grid>
      <SelectSubjectModal
        isOpen={selectSubjectOpen}
        closeAction={() => setSelectSubjectOpen(false)}
        submitAction={(subjectId) => navigateToStudyCardsCreate(subjectId)}
      />
    </>
  );
};

export default withTranslation()(Library);
