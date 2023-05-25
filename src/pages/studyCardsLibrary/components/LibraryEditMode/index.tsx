import React from 'react';
import { Button, Grid, Typography, Pagination } from '@mui/material';
import useStyles from './LibraryEditMode.styles';
import { useSelector } from 'react-redux';
import {
  setsPageCountSelector,
  setsPageSelector,
  setsSelector,
  studyCardsSelectedSubjectSelector,
} from 'store/studycards/studycards.selectors';
import EditCardsetElement from '../EditCardsetElement';
import { useStudycardsActions } from 'store/studycards';
import useRouterActions from 'store/router';
import Loader from 'components/containers/Loader';
import { loadingActionSelector } from 'store/loader/loader.selectors';
import {
  GET_LIBRARY_SETS_BY_SUBJECT_REQUEST,
  GET_LIBRARY_STUDY_CARD_SETS_REQUEST,
} from 'store/studycards/studycards.types';
import { withTranslation, WithTranslation } from 'react-i18next';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import ReactVirtualizedAutoSizer from 'react-virtualized-auto-sizer';

interface LibraryEditModeProps {
  toggleEditMode: () => void;
}

const LibraryEditMode: React.FC<LibraryEditModeProps & WithTranslation> = (props) => {
  const { toggleEditMode, t } = props;
  const { classes } = useStyles();

  const sets = useSelector(setsSelector);
  const page = useSelector(setsPageSelector);
  const pageCount = useSelector(setsPageCountSelector);
  const selectedSubject = useSelector(studyCardsSelectedSubjectSelector);
  const { navigateToStudyCardsEditSet } = useRouterActions();
  const {
    changePage,
    dispatchDeleteSet,
    dispatchShareSet,
    dispatchUnfollowSet,
    dispatchGetLibrarySetsBySubject,
    dispatchGetAndCopy,
  } = useStudycardsActions();
  const loading = useSelector(loadingActionSelector)([
    GET_LIBRARY_SETS_BY_SUBJECT_REQUEST,
    GET_LIBRARY_STUDY_CARD_SETS_REQUEST,
  ]);

  const getSets = () => {
    selectedSubject && dispatchGetLibrarySetsBySubject(selectedSubject, undefined, page, 10);
  };

  const rowRenderer = ({ index }: ListChildComponentProps) => {
    if (!sets) return <> </>;
    const shareLink = `https://educoach-fe.staging.educoachapp.de/study-cards-discover/${sets[index]?.id}`;

    const cardsetElementProps = {
      isFollowed: sets[index]?.isFollowed,
      isPrivate: sets[index]?.isPrivate,
      onCopySet: () => dispatchGetAndCopy(sets[index]?.id, () => toggleEditMode()),
      onDeleteSet: () =>
        dispatchDeleteSet(sets[index]?.id, () => {
          getSets();
        }),
      title: sets[index]?.title,
      tags: sets[index]?.studyCardTags,
      clickable: false,
      isOwner: sets[index]?.isOwner,
      onClick: () => {
        return;
      },
      onEditSet: () => {
        navigateToStudyCardsEditSet(sets[index]?.id);
      },
      onShareSet: () => {
        dispatchShareSet(sets[index]?.id, () => {
          return;
        });
      },
      shareLink,
      onUnfollowSet: () => {
        dispatchUnfollowSet(sets[index]?.id, () => getSets());
      },
    };

    if (index === sets.length) {
      return (
        <>
          <Grid container alignItems={'flex-end'} justifyContent={'center'}>
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
    return <EditCardsetElement {...cardsetElementProps} />;
  };

  return (
    <div>
      <Grid direction={'column'} container className={classes.root}>
        <Grid
          direction="row"
          container
          justifyContent={'space-between'}
          alignItems={'center'}
          wrap={'nowrap'}
        >
          <Grid item>
            <Typography variant="h1" className={classes.title}>
              {t('Study Cards.Library.Edit sets')}
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={toggleEditMode}>
              {t('Study Cards.Library.Save')}
            </Button>
          </Grid>
        </Grid>
        <Loader loading={loading}>
          <div className={classes.listWrapper}>
            <ReactVirtualizedAutoSizer>
              {({ height, width }) => (
                <FixedSizeList
                  itemCount={sets?.length ? sets?.length + 1 : 0}
                  itemSize={104}
                  width={width}
                  height={height}
                  overscanCount={0}
                  children={rowRenderer}
                  className={classes.list}
                />
              )}
            </ReactVirtualizedAutoSizer>
          </div>
        </Loader>
      </Grid>
    </div>
  );
};

export default withTranslation()(LibraryEditMode);
