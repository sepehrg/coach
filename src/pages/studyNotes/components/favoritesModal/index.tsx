import React, { useEffect } from 'react';
import useStyles from './FavoritesModal.style';
import { Dialog, DialogContent, Grid, Typography } from '@mui/material';
import { withTranslation, WithTranslation } from 'react-i18next';
import NotesList from '../notesList';
import { useStudyNotesActions } from 'store/studyNotes';
import { useSelector } from 'react-redux';
import { favoriteStudyNotesSelector } from 'store/studyNotes/studyNotes.selectors';

interface FavoritesModalProps {
  isOpen: boolean;
  closeAction: () => void;
  onSelectNote: (date: Date) => void;
}

const FavoritesModal: React.FC<FavoritesModalProps & WithTranslation> = ({
  isOpen,
  closeAction,
  onSelectNote,
  t,
}) => {
  const { classes } = useStyles();
  const { getFavoriteStudyNotes } = useStudyNotesActions();
  const favoriteStudyNotes = useSelector(favoriteStudyNotesSelector);

  useEffect(() => {
    getFavoriteStudyNotes();
  }, [getFavoriteStudyNotes]);

  return (
    <Dialog
      PaperProps={{ className: classes.dialog }}
      BackdropProps={{
        className: classes.backdrop,
      }}
      open={isOpen}
      onClose={closeAction}
    >
      <DialogContent className={classes.root}>
        <Grid container className={classes.container}>
          <Grid item>
            <Typography className={classes.title}>{t('Study Notes.Your Favourites')}</Typography>
          </Grid>
          <Grid item>
            <NotesList notes={favoriteStudyNotes} onNoteSelect={onSelectNote} height={303} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default withTranslation()(FavoritesModal);
