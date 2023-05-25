import React from 'react';
import { Button, Grid, IconButton, Typography } from '@mui/material';
import useStyles from './Header.styles';
import { ArrowLeft, StudySetting } from 'assets/images/icons';
import SettingsModal from '../SettingsModal';
import { WithTranslation, withTranslation } from 'react-i18next';

interface HeaderProps {
  subject: string;
  title: string;
  onBackButton: () => void;
  onSaveSettings: (maxCards: number) => void;
  onOpenSettings: () => void;
  isSettingModalOpen: boolean;
  toggleSettingsModal: () => void;
  maxCards: number;
}

const Header: React.FC<HeaderProps & WithTranslation> = (props) => {
  const {
    subject,
    title,
    onBackButton,
    onSaveSettings,
    toggleSettingsModal,
    isSettingModalOpen,
    onOpenSettings,
    maxCards,
    t,
  } = props;
  const { classes } = useStyles();

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent={'space-between'}
        alignItems="center"
        className={classes.container}
      >
        <Grid item>
          <Grid container direction={'column'}>
            <Typography variant="h5" className={classes.subject}>
              {subject}
            </Typography>
            <Typography variant="h1" className={classes.title}>
              {title}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction={'row'}>
            <IconButton
              color={'primary'}
              className={classes.settingsButton}
              onClick={onOpenSettings}
              size="large"
            >
              <img src={StudySetting} alt={'settings'} />
            </IconButton>
            <Button
              variant={'contained'}
              color={'primary'}
              startIcon={<img src={ArrowLeft} alt={'arrow left'} />}
              disableElevation
              onClick={onBackButton}
              className={classes.backButton}
            >
              {t('Study Cards.Learn.Back')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <SettingsModal
        isOpen={isSettingModalOpen}
        onClose={toggleSettingsModal}
        onChangeSettings={onSaveSettings}
        chosenOption={maxCards}
      />
    </>
  );
};

export default withTranslation()(Header);
