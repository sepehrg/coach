import React from 'react';
import useStyles from './HelpMeModal.styles';
import { Dialog, DialogContent } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { withTranslation, WithTranslation } from 'react-i18next';

interface HelpMeModalProps {
  close: () => void;
  isOpen: boolean;
}

const HelpMeModal: React.FC<HelpMeModalProps & WithTranslation> = ({ close, isOpen, t }) => {
  const { classes } = useStyles();

  const HINTS = [
    t('Study.Help Me Modal.Hint 1'),
    t('Study.Help Me Modal.Hint 2'),
    t('Study.Help Me Modal.Hint 3'),
  ];

  return (
    <Dialog
      open={isOpen}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent className={classes.container}>
        <Box>
          <Typography variant={'h2'}>
            {t('Study.Help Me Modal.Ways to search for topics')}
          </Typography>
        </Box>
        <Box className={classes.hintsContainer}>
          {HINTS.map((hint, index) => {
            return (
              <Box display="flex" flexDirection="row" className={classes.hintWrapper} key={index}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  className={classes.hintNumber}
                >
                  {index + 1}
                </Box>
                <Typography variant="body1">{hint}</Typography>
              </Box>
            );
          })}
        </Box>
        <Box>
          <Typography className={classes.noteText}>{t('Study.Help Me Modal.Note')}</Typography>
          <Typography className={classes.noteText}>{t('Study.Help Me Modal.If unsure')}</Typography>
        </Box>
        <Box className={classes.buttonWrapper}>
          <Button
            color={'primary'}
            size="large"
            disableElevation
            variant={'contained'}
            onClick={close}
            className={classes.button}
          >
            {t('Study.Help Me Modal.Got it')}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default withTranslation()(HelpMeModal);
