import React, { useCallback, useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

import useStyles from './SelectTopic.styles';
import { useSelector } from 'react-redux';
import SearchBar from 'components/ui/SearchBar';
import { Info } from '../../assets';
import HelpMeModal from '../HelpMeModal';
import { useTagsActions } from 'store/tags';
import { selectedSubjectSelector } from 'store/subjects/subjects.selectors';
import { userGradeSelector } from 'store/auth/auth.selectors';
import { Tag } from 'entities/Tag';
import { useMaterialActions } from 'store/materials';
import { withTranslation, WithTranslation } from 'react-i18next';
import { GET_TAGS_REQUEST } from 'store/tags/tags.types';
import { placeholderTagsSelector, tagsArraySelector } from 'store/tags/tags.selectors';
import { loadingActionSelector } from 'store/loader/loader.selectors';
import debounce from 'lodash/debounce';

const SelectTopic: React.FC<WithTranslation> = ({ t }) => {
  const { classes } = useStyles();

  const [query, setQuery] = useState<string>('');
  const [searchActive, setSearchActive] = useState<boolean>(true);
  const [isOpen, setOpen] = useState<boolean>(false);

  const { getPlaceholderTag, getTagsByQuery, dispatchSelectMainTag, resetTags } = useTagsActions();
  const { resetMaterials } = useMaterialActions();

  const selectedSubject = useSelector(selectedSubjectSelector);
  const grade = useSelector(userGradeSelector);
  const placeholderTags = useSelector(placeholderTagsSelector);
  const tagsArray = useSelector(tagsArraySelector);
  const loading = useSelector(loadingActionSelector)([GET_TAGS_REQUEST]);

  const onClearSearch = () => {
    setQuery('');
    setSearchActive(true);
    resetMaterials();
    resetTags();
  };

  useEffect(() => {
    if (grade && selectedSubject) {
      const payload = {
        name: query,
        gradeId: grade.id,
        subjectId: selectedSubject.id,
      };
      debouncedGetTagsByQuery(payload);
    }
    // eslint-disable-next-line
  }, [query]);

  const debouncedGetTagsByQuery = useCallback(
    (value: any) => debounce(value)(getTagsByQuery, 500),
    [getTagsByQuery],
  );

  const onQueryChange = (query: string) => {
    setSearchActive(true);
    setQuery(query);
  };

  useEffect(() => {
    if (grade && selectedSubject) {
      const payload = {
        gradeId: grade.id,
        subjectId: selectedSubject.id,
      };
      getPlaceholderTag(payload);
    }
  }, [selectedSubject, grade, getPlaceholderTag]);

  const handleMainTagSelect = (tag: Tag) => {
    setSearchActive(false);
    dispatchSelectMainTag(tag.name);
  };

  return (
    <>
      <Grid
        container
        item
        direction={'column'}
        alignItems={'center'}
        justifyContent={'flex-start'}
        wrap={'nowrap'}
        className={classes.outerContainer}
      >
        <Grid
          container
          item
          direction={'column'}
          alignItems={'center'}
          justifyContent={'flex-start'}
          lg={7}
          md={7}
          className={classes.innerContainer}
          wrap={'nowrap'}
        >
          <Typography variant={'h3'}>{t('Study.Which topic')}</Typography>
          <Grid item className={classes.searchBarWrapper}>
            <SearchBar
              onChange={onQueryChange}
              onClearSearch={onClearSearch}
              loading={loading}
              tagsArray={tagsArray}
              placeholderTags={placeholderTags}
              onButtonClick={() => {
                return;
              }}
              onTagSelect={handleMainTagSelect}
              query={query}
              searchActive={searchActive}
            />
          </Grid>
          <Button
            disableElevation
            variant="contained"
            startIcon={<img src={Info} alt="exclamation mark" />}
            className={classes.helpBtn}
            onClick={() => setOpen(true)}
          >
            {t('Study.Help me')}
          </Button>
        </Grid>
      </Grid>
      <HelpMeModal close={() => setOpen(false)} isOpen={isOpen} />
    </>
  );
};

export default withTranslation()(SelectTopic);
