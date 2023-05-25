import React, { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { WithTranslation, withTranslation } from 'react-i18next';
import { Grid, Typography, useMediaQuery, Pagination } from '@mui/material';
import useStyles from './DiscoverLibraryPage.styles';
import DiscoverCardsetElement from '../DiscoverCardsetElement';
import useRouterActions from 'store/router';
import {
  savedSetIndexSelector,
  setsPageCountSelector,
  setsPageSelector,
  setsSelector,
  studyCardsSelectedSubjectSelector,
} from 'store/studycards/studycards.selectors';
import { useStudycardsActions } from 'store/studycards';
import { loadingActionSelector } from 'store/loader/loader.selectors';
import {
  GET_DISCOVER_SETS_BY_SUBJECT_REQUEST,
  GET_DISCOVER_STUDY_CARD_SETS_REQUEST,
} from 'store/studycards/studycards.types';
import i18n from 'translations/i18n';
import SearchBar from 'components/ui/SearchBar';
import Loader from 'components/containers/Loader';
import { FixedSizeList, FixedSizeListProps, ListChildComponentProps } from 'react-window';

const DiscoverLibrary: React.FC<WithTranslation> = ({ t }) => {
  const { classes, theme } = useStyles();
  const { navigateToStudyCardsSet } = useRouterActions();
  const {
    dispatchGetDiscoverSetsBySubject,
    changePage,
    dispatchFollowSet,
    dispatchUnfollowSet,
    dispatchLikeSet,
    dispatchUnlikeSet,
    dispatchSaveSetIndex,
  } = useStudycardsActions();
  const sets = useSelector(setsSelector);
  const selectedSubject = useSelector(studyCardsSelectedSubjectSelector);
  const loading = useSelector(loadingActionSelector)([
    GET_DISCOVER_SETS_BY_SUBJECT_REQUEST,
    GET_DISCOVER_STUDY_CARD_SETS_REQUEST,
  ]);
  const page = useSelector(setsPageSelector);
  const pageCount = useSelector(setsPageCountSelector);
  const savedSetIndex = useSelector(savedSetIndexSelector);

  const [input, setInput] = useState<string>('');

  const searchbarProps = {
    searchActive: false,
    onChange: setInput,
    loading: false,
    tagsArray: [],
    searchBarStyles: classes.searchBar,
    clearButtonStyles: classes.searchClearBtn,
    placeholderTags: [i18n.t('Study Cards.Discover.Search')],
    onClearSearch: () => setInput(''),
    onTagSelect: () => {
      return;
    },
    query: input,
  };

  const getSets = () => {
    selectedSubject && dispatchGetDiscoverSetsBySubject(selectedSubject, input && input, page, 10);
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

  useEffect(() => {
    getSets();
    // eslint-disable-next-line
  }, [selectedSubject, input, page]);

  const rowRenderer = ({ index }: ListChildComponentProps<unknown>): ReactElement => {
    if (!sets) return <></>;

    const cardSetElementProps = {
      key: index,
      cardsCount: sets[index]?.studyCards,
      isConfirmed: sets[index]?.isFavorite,
      likesCount: sets[index]?.likesCount,
      isFollowed: sets[index]?.isFollowed,
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
          <Grid container key={index} alignItems={'flex-end'} justifyContent={'center'}>
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
    return <DiscoverCardsetElement {...cardSetElementProps} />;
  };

  const listProps: FixedSizeListProps<any> = {
    itemCount: sets?.length ? sets.length + 1 : 0,
    itemSize: 104,
    width: useMediaQuery(theme.breakpoints.down('md')) ? 800 : 1030,
    height: 500,
    overscanCount: 3,
    children: rowRenderer,
    className: classes.list,
    initialScrollOffset: savedSetIndex ? savedSetIndex * 104 : undefined,
  };

  return (
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
            {t('Study Cards.Discover.Follow sets')}
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent={'flex-start'}
        alignItems={'center'}
        className={classes.searchWrapper}
      >
        <SearchBar {...searchbarProps} />
      </Grid>
      <Loader loading={loading}>
        <div className={classes.listWrapper}>
          <FixedSizeList {...listProps} />
        </div>
      </Loader>
    </Grid>
  );
};

export default withTranslation()(DiscoverLibrary);
