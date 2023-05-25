import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import { Mixpanel } from 'utils/mixpanel';
import { useSelector } from 'react-redux';
import { materialsLinksSelector, materialsSelector } from 'store/materials/materials.selectors';
import { loadingActionSelector } from 'store/loader/loader.selectors';
import { GET_MATERIALS_LINKS_REQUEST } from 'store/materials/materials.types';
import { userGradeSelector } from 'store/auth/auth.selectors';
import { useMaterialActions } from 'store/materials';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import AnotherLinkModal from '../AnotherLinkModal';
import ThankYouModal from 'components/ui/ThankYouModal';
import { selectedMainTagSelector } from 'store/tags/tags.selectors';
import { subjectsSelector } from 'store/subjects/subjects.selectors';
import useStyles from './StudyResources.styles';
import { LikedMaterial } from 'entities/Material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import StudyCardModal from '../StudyCardModal';
import MaterialsList from '../MaterialsList';
import MaterialFrame from '../MaterialFrame';

type StateFromHistory = {
  subjectId: string;
  lessonId: string;
  count: number;
  goal: string;
};

type ModalType = 'thanks' | 'confirmation' | 'link' | null;

const StudyResources: React.FC<WithTranslation> = (props) => {
  const { t } = props;
  const { state: stateFromHistory } = useLocation() as { state: StateFromHistory };

  const [selectedLink, setSelectedLink] = useState<string | null>(null);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [isOpenStudyCardModal, toggleStudyCardModal] = useState<boolean>(false);

  const {
    createFeedback,
    createNewLink,
    getMaterialsLinks,
    changePage,
    dispatchClearSelectedMaterial,
    dispatchSelectMaterial,
  } = useMaterialActions();

  const { relatedTags } = useSelector(materialsSelector);
  const materialsLinks = useSelector(materialsLinksSelector);
  const selectedMainTag = useSelector(selectedMainTagSelector);
  const grade = useSelector(userGradeSelector);
  const { selectedItem: subject } = useSelector(subjectsSelector);
  const materialsLoading = useSelector(loadingActionSelector)([GET_MATERIALS_LINKS_REQUEST]);

  const { classes } = useStyles();

  const handleSelectLink = (material: LikedMaterial, key: number) => {
    setSelectedLink(material.link);
    dispatchSelectMaterial(material, key);
    Mixpanel.track('View Recommended Resources', {
      'Resource View Date': new Date().toISOString(),
      'Learning Type': material.learningType,
      Subject: subject?.name,
      Source: material.sourceType,
    });
  };

  const createMaterialFeedback = (isLiked: boolean, materialId: string) => {
    createFeedback(materialId, isLiked);
  };

  const handleOpenModal = (type: ModalType) => {
    setModalType(type);
  };

  const handleCloseModal = () => {
    setModalType(null);
  };

  const handleSubmitNewLink = (link: string, description: string) => {
    createNewLink(link, description, stateFromHistory.subjectId, () => {
      handleCloseModal();
      handleOpenModal('thanks');
    });
  };

  // const handleFinishStudy = () => {
  //   finishLesson(stateFromHistory.lessonId, () => {
  //     clearSelectedLesson();
  //     resetMaterials();
  //     resetTags();
  //     Mixpanel.people.increment('Lifetime Focus Time Spent', stateFromHistory.count);
  //     routerActions.navigateToSummary(stateFromHistory.lessonId);
  //   });
  // };

  const handleFilterTagChange = (tag?: string) => {
    changePage(1);
    dispatchClearSelectedMaterial();
    if (grade && selectedMainTag)
      getMaterialsLinks({
        tagName: selectedMainTag,
        gradeId: grade.id,
        subjectId: stateFromHistory.subjectId,
        filterTag: tag,
      });
  };

  return (
    <Grid container className={classes.pageWrapper}>
      <Grid item lg={12} md={12} className={classes.materialsWrapper}>
        {selectedLink ? (
          <MaterialFrame url={selectedLink} />
        ) : (
          <MaterialsList
            materials={materialsLinks}
            likeAction={createMaterialFeedback}
            openLink={handleSelectLink}
            openLinkModal={() => handleOpenModal('link')}
            isLoading={materialsLoading}
            showSearchButton
            onTagClick={handleFilterTagChange}
            subject={subject?.name}
            relatedTags={relatedTags}
            chosenTag={selectedMainTag}
          />
        )}
        <StudyCardModal
          isOpen={isOpenStudyCardModal}
          toggle={() => {
            toggleStudyCardModal((prevState) => !prevState);
          }}
        />
      </Grid>

      {selectedLink && (
        <Button
          className={classes.arrowButton}
          variant={'contained'}
          disableElevation
          onClick={() => toggleStudyCardModal((prevState) => !prevState)}
        >
          <ChevronLeftIcon />
        </Button>
      )}

      <Grid item container lg={12} md={12} justifyContent={'flex-end'} alignItems={'flex-end'}>
        {selectedLink ? (
          <Button
            disableElevation
            variant={'contained'}
            className={classes.button}
            onClick={() => setSelectedLink(null)}
          >
            {t('Study.Back to study links')}
          </Button>
        ) : (
          <Grid container justifyContent={'space-between'} direction={'row'}>
            <Button
              disableElevation
              variant={'contained'}
              className={classes.button}
              onClick={() => handleOpenModal('link')}
            >
              {t('Study.Another link for subject')}
            </Button>
            <Button
              disableElevation
              variant={'contained'}
              className={classes.finishButton}
              onClick={() => handleOpenModal('confirmation')}
            >
              {t('Study.Finish study')}
            </Button>
          </Grid>
        )}
      </Grid>

      <ThankYouModal
        text={t('Study.Thanks')}
        isOpen={modalType === 'thanks'}
        closeAction={handleCloseModal}
      />
      {/* <FinishConfirmationModal
        submit={handleFinishStudy}
        close={handleCloseModal}
        isOpen={modalType === 'confirmation'}
      /> */}
      <AnotherLinkModal
        submitAction={handleSubmitNewLink}
        isOpen={modalType === 'link'}
        closeAction={handleCloseModal}
      />
    </Grid>
  );
};

export default withTranslation()(StudyResources);
