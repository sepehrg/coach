import { Box, Grid } from '@mui/material';
import SearchBar from 'components/ui/SearchBar';
import { GetTagsByQueryRequest, Tag } from 'entities/Tag';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userGradeSelector } from 'store/auth/auth.selectors';
import { selectedSubjectSelector } from 'store/subjects/subjects.selectors';
import { useTagsActions } from 'store/tags';
import { tagsArraySelector } from 'store/tags/tags.selectors';
import i18n from 'translations/i18n';
import RecommendationTabs from '../studyTabs/recommendations/recommendationTabs';
import useStyles from './TabTools.styles';
import { useMaterialActions } from 'store/materials';
import { loadingActionSelector } from 'store/loader/loader.selectors';
import { GET_TAGS_REQUEST } from 'store/tags/tags.types';
import { MaterialLearningTypes } from 'entities/Material';
import { materialsSelector } from 'store/materials/materials.selectors';
import { useDebounce } from 'utils/useDebounce';

interface TabToolsProps {
  tab: number;
  input: string;
  onInputChange: (input: string) => void;
  onTabChange: (tab: MaterialLearningTypes | null) => void;
  createCardActive: boolean;
}

const TabTools: React.FC<TabToolsProps> = ({
  tab,
  input,
  onInputChange,
  onTabChange,
  createCardActive,
}) => {
  const { classes, cx } = useStyles();

  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [payload, setPayload] = useState<GetTagsByQueryRequest>();

  const { getTagsByQuery, dispatchSelectMainTag, resetTags } = useTagsActions();
  const { resetMaterials } = useMaterialActions();

  const tagsArray = useSelector(tagsArraySelector);
  const selectedSubject = useSelector(selectedSubjectSelector);
  const grade = useSelector(userGradeSelector);
  const loading = useSelector(loadingActionSelector)([GET_TAGS_REQUEST]);
  const { filteredMaterialType } = useSelector(materialsSelector);
  const debouncedPayload = useDebounce(payload, 500);

  const handleMainTagSelect = (tag: Tag) => {
    setSearchActive(false);
    dispatchSelectMainTag(tag.name);
    onInputChange(tag.name);
  };

  const handleClearSearch = () => {
    onInputChange('');
    setSearchActive(false);
    resetMaterials();
    resetTags();
  };

  const handleInputChange = (query: string) => {
    setSearchActive(true);
    onInputChange(query);
  };

  useEffect(() => {
    if (grade && selectedSubject) {
      const payload = {
        name: input,
        gradeId: grade.id,
        subjectId: selectedSubject.id,
      };
      setPayload(payload);
    }
  }, [grade, input, selectedSubject]);

  useEffect(() => {
    if (debouncedPayload) getTagsByQuery(debouncedPayload);
  }, [debouncedPayload, getTagsByQuery]);

  const searchbarProps = {
    searchActive: searchActive,
    onChange: handleInputChange,
    loading: loading,
    tagsArray: tagsArray,
    searchBarStyles: classes.searchBar,
    clearButtonStyles: classes.searchClearBtn,
    placeholderTags: [i18n.t('Study.What topic are you looking for')],
    onClearSearch: handleClearSearch,
    onTagSelect: handleMainTagSelect,
    query: input,
  };

  return (
    <Box className={cx(classes.wrapper, createCardActive && classes.createCard)}>
      <Grid container className={classes.container}>
        {(tab === 1 || tab === 2) && (
          <Grid item>
            <SearchBar {...searchbarProps} />
          </Grid>
        )}
        {tab === 1 && (
          <Grid item>
            <RecommendationTabs tab={filteredMaterialType} onTabChange={onTabChange} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default TabTools;
