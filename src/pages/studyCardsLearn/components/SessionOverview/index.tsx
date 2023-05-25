import React, { useState } from 'react';
import Header from '../Header';
import Loader from 'components/containers/Loader';
import MainSection from '../MainSection';
import Footer from '../Footer';
import useRouterActions from 'store/router';
import { useSelector } from 'react-redux';
import { loadingActionSelector } from 'store/loader/loader.selectors';
import { GET_LEARNING_SET_OVERVIEW_REQUEST } from 'store/studycards/studycards.types';
import { LearningSetOverview } from 'entities/StudyCardSet';
import { Grid } from '@mui/material';
import HamburgerMenu from 'components/layout/Header/components/HamburgerMenu';
import useStyles from './SessionOverview.styles';

interface SessionOverviewProps {
  set: LearningSetOverview | null;
  subjectTitle: string;
  setTitle: string;
  onLevelSelect: (level: keyof LearningSetOverview) => void;
  onStartSession: () => void;
  onChangeSettings: (maxCards: number) => void;
  maxCards: number;
}

const SessionOverview: React.FC<SessionOverviewProps> = (props) => {
  const { set, setTitle, subjectTitle, onLevelSelect, onStartSession, onChangeSettings, maxCards } =
    props;
  const { classes } = useStyles();
  const { goBack } = useRouterActions();
  const [isModalOpen, toggleModal] = useState<boolean>(false);

  const loading = useSelector(loadingActionSelector)([GET_LEARNING_SET_OVERVIEW_REQUEST]);

  return (
    <Grid container direction="column">
      <Grid item>
        <HamburgerMenu />
      </Grid>
      <Grid item className={classes.main}>
        <Header
          subject={subjectTitle}
          title={setTitle}
          maxCards={maxCards}
          isSettingModalOpen={isModalOpen}
          toggleSettingsModal={() => toggleModal(!isModalOpen)}
          onBackButton={() => goBack()}
          onSaveSettings={(maxCards: number) => {
            onChangeSettings(maxCards);
            toggleModal(!isModalOpen);
          }}
          onOpenSettings={() => toggleModal(!isModalOpen)}
        />
        <Loader loading={loading}>
          <MainSection
            set={set}
            onLevelSelected={(level: keyof LearningSetOverview) => onLevelSelect(level)}
          />
        </Loader>
      </Grid>
      <Grid item>
        <Footer onStartSession={onStartSession} />
      </Grid>
    </Grid>
  );
};

export default SessionOverview;
