import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';

import { Mixpanel } from 'utils/mixpanel';
import { useSelector } from 'react-redux';
import { materialsLinksSelector, materialsSelector } from 'store/materials/materials.selectors';
import { loadingActionSelector } from 'store/loader/loader.selectors';
import { GET_MATERIALS_LINKS_REQUEST } from 'store/materials/materials.types';
import { userGradeSelector } from 'store/auth/auth.selectors';
import { useMaterialActions } from 'store/materials';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useLessonActions } from 'store/lessons';
import SearchBar from 'components/ui/SearchBar';
import MaterialsList from '../study/components/MaterialsList';
import MaterialFrame from '../study/components/MaterialFrame';
import Typography from '@mui/material/Typography';
import useStyles from './LookUp.styles';
import { selectedSubjectSelector } from 'store/subjects/subjects.selectors';
import links from 'framework/links';
import { useTagsActions } from 'store/tags';
import { GetTagsByQueryRequest, Tag } from 'entities/Tag';
import useRouterActions from 'store/router';
import { placeholderTagsSelector, tagsArraySelector } from 'store/tags/tags.selectors';
import AnotherLinkModal from '../study/components/AnotherLinkModal';
import ThankYouModal from 'components/ui/ThankYouModal';
import { LikedMaterial } from 'entities/Material';
import { GET_TAGS_REQUEST } from 'store/tags/tags.types';
import { Navigate } from 'react-router-dom';
import { useDebounce } from 'utils/useDebounce';

// 'Look up' sub-flow of Focus Time flow entry point

const LookUp: React.FC<WithTranslation> = (props) => {
  const { t } = props;
  const { classes } = useStyles();

  const { relatedTags, page } = useSelector(materialsSelector);
  const materialsLinks = useSelector(materialsLinksSelector);
  const placeholderTags = useSelector(placeholderTagsSelector);
  const tagsArray = useSelector(tagsArraySelector);
  const searchLoading = useSelector(loadingActionSelector)([GET_TAGS_REQUEST]);
  const grade = useSelector(userGradeSelector);
  const materialsLoading = useSelector(loadingActionSelector)([GET_MATERIALS_LINKS_REQUEST]);
  const subject = useSelector(selectedSubjectSelector);

  const {
    getMaterialsLinks,
    resetMaterials,
    createNewLink,
    dispatchClearSelectedMaterial,
    changePage,
    dispatchSelectMaterial,
    createFeedback,
  } = useMaterialActions();
  const { navigateToFocusTime } = useRouterActions();
  const { clearSelected: clearSelectedLesson } = useLessonActions();
  const { getTagsByQuery, resetTags, getPlaceholderTag, dispatchClearSuggestionsTags } =
    useTagsActions();

  const [selectedLink, setSelectedLink] = useState<string | null>(null);
  const [mainTag, setMainTag] = useState<string>('');
  const [searchActive, setSearchActive] = useState<boolean>(true);
  const [isLinkModalOpen, setLinkModalOpen] = useState<boolean>(false);
  const [isThanksModalOpen, setThanksModalOpen] = useState<boolean>(false);
  const [payload, setPayload] = useState<GetTagsByQueryRequest>();
  const debouncedPayload = useDebounce(payload, 500);

  const handleSubmitLink = (link: string, description: string) => {
    subject &&
      createNewLink(link, description, subject?.id, () => {
        setLinkModalOpen(false);
        setThanksModalOpen(true);
      });
  };

  const handleSelectLink = (material: LikedMaterial, key: number) => {
    setSelectedLink(material.link);
    dispatchSelectMaterial(material, key);
    Mixpanel.track('View Recommended Resources', {
      'Resource View Date': new Date().toISOString(),
      'Learning Type': material.learningType,
      Subject: material.subject?.name,
      Source: material.sourceType,
    });
  };

  const handleCreateMaterialFeedback = (isLiked: boolean, materialId: string) => {
    createFeedback(materialId, isLiked);
  };

  const finishStudy = () => {
    resetMaterials();
    clearSelectedLesson();
    resetTags();
    navigateToFocusTime();
  };

  const handleSearchMaterials = (tag?: Tag) => {
    if (tag?.name) {
      setMainTag(tag?.name);
    }
    setSearchActive(false);
    searchMaterials();
  };

  const searchMaterials = (tag?: string) => {
    changePage(1);
    dispatchClearSelectedMaterial();
    if (grade && subject)
      getMaterialsLinks({
        tagName: mainTag,
        gradeId: grade.id,
        subjectId: subject.id,
        relatedTags: !tag && page === 1,
        filterTag: tag && tag,
      });
  };

  useEffect(() => {
    if (grade && subject) {
      const payload = {
        gradeId: grade.id,
        subjectId: subject.id,
      };
      getPlaceholderTag(payload);
    }
  }, [subject, grade, getPlaceholderTag]);

  useEffect(() => {
    if (grade && subject) {
      const payload = {
        name: mainTag,
        gradeId: grade.id,
        subjectId: subject.id,
      };
      setPayload(payload);
    }
  }, [grade, mainTag, subject]);

  useEffect(() => {
    if (debouncedPayload) getTagsByQuery(debouncedPayload);
  }, [debouncedPayload, getTagsByQuery]);

  const onQueryChange = (input: string) => {
    setSearchActive(true);
    setMainTag(input);
  };

  const onClearSearch = () => {
    setMainTag('');
    resetMaterials();
    dispatchClearSuggestionsTags();
    setSearchActive(true);
  };

  return (
    <>
      {!subject ? (
        <Navigate replace to={links.student.focusTime} />
      ) : (
        <Grid
          container
          justifyContent={'center'}
          alignItems={'flex-start'}
          className={classes.root}
          md={12}
          lg={12}
        >
          <Grid item container lg={12} md={12} direction={'column'} alignItems={'flex-start'}>
            <Typography variant={'h1'}>
              {t('Study.Look Up.Search')} <span className={classes.subject}>{subject?.name}</span>
            </Typography>
            <Grid item style={{ marginTop: 16, marginBottom: 33 }}>
              {}
              {!!placeholderTags?.length && (
                <SearchBar
                  onChange={onQueryChange}
                  onButtonClick={() => searchMaterials()}
                  onClearSearch={onClearSearch}
                  loading={searchLoading}
                  placeholderTags={placeholderTags}
                  tagsArray={tagsArray}
                  onTagSelect={handleSearchMaterials}
                  query={mainTag}
                  searchActive={searchActive}
                />
              )}
            </Grid>
          </Grid>
          {!searchActive || !placeholderTags?.length ? (
            <Grid
              item
              lg={12}
              md={12}
              justifyContent={'flex-start'}
              style={{ width: '90vw', height: '70vh' }}
            >
              {selectedLink ? (
                <MaterialFrame url={selectedLink} />
              ) : (
                <>
                  <MaterialsList
                    materials={materialsLinks}
                    openLink={handleSelectLink}
                    likeAction={handleCreateMaterialFeedback}
                    showSearchButton={false}
                    openLinkModal={() => {
                      return;
                    }}
                    relatedTags={relatedTags}
                    onTagClick={searchMaterials}
                    isLoading={materialsLoading}
                    chosenTag={mainTag}
                    subject={subject.name}
                  />
                </>
              )}
            </Grid>
          ) : null}

          <Grid item container lg={12} md={12} justifyContent={'center'} alignItems={'center'}>
            {selectedLink ? (
              <Button
                disableElevation
                color="primary"
                variant={'contained'}
                style={{ marginTop: 20 }}
                onClick={() => setSelectedLink(null)}
              >
                {t('Study.Back to study links')}
              </Button>
            ) : (
              <>
                {(!searchActive || !placeholderTags?.length) && (
                  <Grid container justifyContent={'space-between'} direction={'row'}>
                    <Button
                      disableElevation
                      variant={'contained'}
                      className={classes.button}
                      onClick={() => setLinkModalOpen(true)}
                    >
                      {t('Study.Another link for subject')}
                    </Button>
                    <Button
                      disableElevation
                      variant={'contained'}
                      className={classes.button}
                      onClick={finishStudy}
                    >
                      {t('Study.Finish search')}
                    </Button>
                  </Grid>
                )}
              </>
            )}
          </Grid>
        </Grid>
      )}
      <AnotherLinkModal
        submitAction={handleSubmitLink}
        isOpen={isLinkModalOpen}
        closeAction={() => setLinkModalOpen(false)}
      />
      <ThankYouModal
        text={t('Study.Thanks')}
        isOpen={isThanksModalOpen}
        closeAction={() => setThanksModalOpen(false)}
      />
    </>
  );
};

export default withTranslation()(LookUp);
