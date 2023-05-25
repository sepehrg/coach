import React, { useCallback, useEffect, useState } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import useStyles from './StudyCards.styles';
import { useSelector } from 'react-redux';
import { materialsSelector } from 'store/materials/materials.selectors';
import { useLocation } from 'react-router-dom';
import SearchBar from 'components/ui/SearchBar';
import { setsSelector } from 'store/studycards/studycards.selectors';
import { useStudycardsActions } from 'store/studycards';
import StudyCardItem from './studyCardItem';
import { loadingActionSelector } from 'store/loader/loader.selectors';
import { GET_LIBRARY_SETS_BY_SUBJECT_ID_REQUEST } from 'store/studycards/studycards.types';
import Loader from 'components/containers/Loader';

type StateFromHistory = {
  subjectId: string;
  lessonId: string;
  count: number;
  goal: string;
};

interface StudyCardProps {
  createCardActive: boolean;
  setCreateCardActive: (state: boolean) => void;
}

const StudyCards: React.FC<WithTranslation & StudyCardProps> = ({
  t,
  createCardActive,
  setCreateCardActive,
}) => {
  const { classes } = useStyles();
  const { state } = useLocation() as { state: StateFromHistory };

  const sets = useSelector(setsSelector);
  const { page } = useSelector(materialsSelector);
  const loading = useSelector(loadingActionSelector)([GET_LIBRARY_SETS_BY_SUBJECT_ID_REQUEST]);

  const { dispatchGetLibrarySetsBySubjectId } = useStudycardsActions();

  const [input, setInput] = useState<string>('');

  const getSets = useCallback(() => {
    state.subjectId && dispatchGetLibrarySetsBySubjectId(state.subjectId, input && input, page, 10);
  }, [dispatchGetLibrarySetsBySubjectId, input, page, state.subjectId]);

  useEffect(() => {
    getSets();
  }, [getSets]);

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

  return (
    <>
      <Grid
        container
        justifyContent={'flex-start'}
        alignItems={'center'}
        className={classes.searchWrapper}
      >
        <SearchBar {...searchbarProps} />
      </Grid>
      <Loader loading={loading}>
        <Grid container className={classes.listWrapper}>
          {sets?.map((set, index) => (
            <StudyCardItem
              key={index}
              studyCardSet={set}
              createCardActive={false}
              setCreateCardActive={() => {
                return;
              }}
            />
          ))}
          <StudyCardItem
            createCardActive={createCardActive}
            setCreateCardActive={setCreateCardActive}
          />
        </Grid>
      </Loader>
    </>
  );
};

export default withTranslation()(StudyCards);
