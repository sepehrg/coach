import React, { useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import FinishAutomaticModal from 'pages/study/components/FinishAutomaticModal';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { useLessonActions } from 'store/lessons';
import { useMaterialActions } from 'store/materials';
import useRouterActions from 'store/router';
import useStyles from 'pages/studyIndividual/StudyIndividual.styles';
import { powerupSelectedSelector } from 'store/powerups/powerups.selectors';
import BreakModal from 'pages/study/components/BreakModal';
import { usePowerupActions } from 'store/powerups';
import links from 'framework/links';
import { useTagsActions } from 'store/tags';
import HamburgerMenu from 'components/layout/Header/components/HamburgerMenu';
import { CrossCircle } from 'assets/images/icons';
import StudyTabs from './components/studyTabs';
import AnotherLinkModal from 'pages/study/components/AnotherLinkModal';
import { selectedSubjectSelector } from 'store/subjects/subjects.selectors';
import ThankYouModal from 'components/ui/ThankYouModal';
import TabTools from './components/tabTools';
import { selectedMaterialSelector } from 'store/materials/materials.selectors';
import MaterialFrame from 'pages/study/components/MaterialFrame';
import StudyTools from './components/studyTools';
import { useStudycardsActions } from 'store/studycards';
import { timerSelector } from 'store/studycards/studycards.selectors';
import StudyCardsModal from 'pages/studyNotes/components/studyCardsModal';
import StudySpeedDial from './components/studySpeedDial';
import FinishConfirmationModal from './components/finishConfirmationModal';
import StudyNotes from '../../pages/studyNotes';

type StateFromHistory = {
  subjectId: string;
  lessonId: string;
  count: number;
  goal: string;
};

// study session with the timer page (Focus Time flow - after user chooses subject, goal & duration)

const StudyIndividual: React.FC<WithTranslation> = ({ t }) => {
  const { classes } = useStyles();
  const { state: stateFromHistory } = useLocation() as { state: StateFromHistory };

  const routerActions = useRouterActions();
  const { updateTimer } = useStudycardsActions();
  const { resetTags } = useTagsActions();
  const {
    resetMaterials,
    createNewLink,
    dispatchClearSelectedMaterial,
    filterMaterials,
    changePage,
  } = useMaterialActions();
  const { clearSelected: clearSelectedLesson, startLesson, finishLesson } = useLessonActions();
  const { getBreakPowerup, clearSelected: clearPowerup } = usePowerupActions();

  const powerup = useSelector(powerupSelectedSelector);
  const subject = useSelector(selectedSubjectSelector);
  const selectedMaterial = useSelector(selectedMaterialSelector);
  const timerRemaining = useSelector(timerSelector);

  const [isFinishModalOpen, setFinishModalOpen] = useState<boolean>(false);
  const [finishModalReopened, setFinishModalReopened] = useState<boolean>(false);
  const [isLinkModalOpen, setLinkModalOpen] = useState<boolean>(false);
  const [isThanksModalOpen, setThanksModalOpen] = useState<boolean>(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState<boolean>(false);
  const [showStudyNotes, setShowStudyNotes] = useState<boolean>(false);
  const [studyCardsOpen, setStudyCardsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [input, setInput] = useState<string>('');

  const timeInSeconds = stateFromHistory.count * 60;

  const finishStudyCallback = () => {
    clearSelectedLesson();
    resetMaterials();
    resetTags();
    setFinishModalReopened(false);
    routerActions.navigateToSummary(stateFromHistory.lessonId);
  };

  const handleFinishStudy = (isAutomatic: boolean) => {
    if (isAutomatic) finishStudyCallback();
    else finishLesson(stateFromHistory.lessonId, finishStudyCallback);
  };

  const handleStopStudy = () => {
    setConfirmationModalOpen(true);
  };

  const handleContinueStudy = () => {
    setFinishModalReopened(false);
    setFinishModalOpen(false);
    startLesson(stateFromHistory.lessonId, () => {
      updateTimer(timeInSeconds);
    });
  };

  const handleCloseBreakModal = () => {
    setFinishModalReopened(true);
    clearPowerup();
  };

  const timerFinishHandler = () => {
    setFinishModalOpen(true);
    updateTimer(-1); // will update remaining or timer in the state
  };

  const handleSubmitLink = (link: string, grade: string) => {
    subject &&
      createNewLink(link, grade, subject?.id, () => {
        setLinkModalOpen(false);
        setThanksModalOpen(true);
      });
  };

  const handleTabChange = (tab: number) => {
    changePage(1);
    setActiveTab(tab);
  };

  if (!stateFromHistory) return <Navigate replace to={links.student.focusTime} />;

  const renderModals = () => {
    return (
      <>
        {!powerup && (
          <FinishAutomaticModal
            isOpen={isFinishModalOpen}
            isReopened={finishModalReopened}
            count={stateFromHistory.count}
            takeBreak={getBreakPowerup}
            continueStudy={handleContinueStudy}
            finishStudy={() => handleFinishStudy(true)}
          />
        )}
        {powerup && <BreakModal isOpen={true} onClose={handleCloseBreakModal} powerup={powerup} />}
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
        <FinishConfirmationModal
          timerDuration={timeInSeconds}
          timerRemaining={timerRemaining}
          submit={() => handleFinishStudy(false)}
          close={() => setConfirmationModalOpen(false)}
          isOpen={isConfirmationModalOpen}
        />
        <StudyCardsModal isOpen={studyCardsOpen} closeAction={() => setStudyCardsOpen(false)} />
        <StudySpeedDial
          activateCreateCard={() => setStudyCardsOpen(true)}
          toggleShowStudyNotes={() => setShowStudyNotes(!showStudyNotes)}
        />
      </>
    );
  };

  return (
    <>
      <Grid container style={{ flexWrap: 'nowrap' }}>
        <Grid item>
          <Grid container justifyContent={'space-between'}>
            <Grid
              item
              container
              justifyContent={'space-between'}
              alignItems={'center'}
              direction={'row'}
            >
              <Grid
                container
                direction={'row'}
                justifyContent={'space-between'}
                className={classes.topWrapper}
              >
                <Grid item>
                  <HamburgerMenu />
                </Grid>
                <Grid item>
                  <TabTools
                    tab={activeTab}
                    input={input}
                    onInputChange={setInput}
                    onTabChange={(tab) => filterMaterials(tab)}
                    createCardActive={studyCardsOpen}
                  />
                </Grid>
                <Grid item>
                  <StudyTools
                    onOpenLinkModal={() => setLinkModalOpen(true)}
                    onStopStudy={handleStopStudy}
                    timerDuration={timeInSeconds}
                    timerRemaining={timerRemaining}
                    onFinishTimer={timerFinishHandler}
                  />
                </Grid>
              </Grid>
            </Grid>
            {!selectedMaterial && (
              <StudyTabs
                tab={activeTab}
                onTabChange={(tab) => handleTabChange(tab)}
                createCardActive={studyCardsOpen}
                setCreateCardActive={setStudyCardsOpen}
              />
            )}
            {selectedMaterial && (
              <>
                <Box className={classes.frame}>
                  <MaterialFrame url={selectedMaterial.material.link} />

                  <Button
                    disableElevation
                    className={classes.closeButton}
                    onClick={dispatchClearSelectedMaterial}
                  >
                    <img src={CrossCircle} alt="close" />
                  </Button>
                </Box>
              </>
            )}
          </Grid>
        </Grid>
        <Grid item style={{ paddingLeft: 25 }}>
          {showStudyNotes && <StudyNotes />}
        </Grid>
      </Grid>
      {renderModals()}
    </>
  );
};

export default withTranslation()(StudyIndividual);
