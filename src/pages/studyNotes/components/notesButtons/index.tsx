import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import { withTranslation, WithTranslation } from 'react-i18next';
import useStyles from './NotesButtons.style';
import FavoritesModal from '../favoritesModal';
import OverviewModal from '../overviewModal';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import moment from 'moment';

interface NotesButtonsProps {
  date: Date;
  onDateChange: (date: Date) => void;
}

const NotesButtons: React.FC<WithTranslation & NotesButtonsProps> = ({ date, onDateChange, t }) => {
  const { classes } = useStyles();

  const [favoriteOpen, setFavoriteOpen] = useState<boolean>(false);
  const [overviewOpen, setOverviewOpen] = useState<boolean>(false);

  const onNoteSelected = (date: Date) => {
    onDateChange(date);
    setFavoriteOpen(false);
    setOverviewOpen(false);
  };

  return (
    <>
      <Grid item container className={classes.topButtons}>
        <Button
          variant="contained"
          color="primary"
          className={classes.navigation}
          disableElevation
          onClick={() => onDateChange(moment(date).subtract(1, 'day').toDate())}
        >
          <ArrowLeft className={classes.arrow} />
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.navigation}
          disableElevation
          disabled={moment(date).diff(moment(), 'days') === 0}
          onClick={() => onDateChange(moment(date).add(1, 'day').toDate())}
        >
          <ArrowRight className={classes.arrow} />
        </Button>
        {/* <Button
          variant="contained"
          color="primary"
          className={classes.pinkButton}
          disableElevation
          onClick={() => { return; }}
        >
          {t('Study Notes.Tools')}
        </Button> */}
        <Button
          variant="contained"
          color="primary"
          className={classes.pinkButton}
          disableElevation
          onClick={() => setOverviewOpen(true)}
        >
          {t('Study Notes.Overview')}
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.pinkButton}
          disableElevation
          onClick={() => setFavoriteOpen(true)}
        >
          {t('Study Notes.Favorite')}
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.purpleButton}
          disableElevation
          onClick={() => onDateChange(new Date())}
        >
          {t('Study Notes.Today')}
        </Button>
      </Grid>
      {favoriteOpen && (
        <FavoritesModal
          onSelectNote={onNoteSelected}
          isOpen={true}
          closeAction={() => setFavoriteOpen(false)}
        />
      )}
      {overviewOpen && (
        <OverviewModal
          submitAction={onNoteSelected}
          isOpen={overviewOpen}
          closeAction={() => setOverviewOpen(false)}
        />
      )}
    </>
  );
};

export default withTranslation()(NotesButtons);
