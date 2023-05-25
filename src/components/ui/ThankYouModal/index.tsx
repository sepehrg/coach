import React from 'react';
import { DialogContent, Dialog } from '@mui/material';
import Typography from '@mui/material/Typography';
import * as Assets from './assets';
import useStyles from './ThankYouModal.styles';
import Button from '@mui/material/Button';
import { withTranslation, WithTranslation } from 'react-i18next';

interface ThankYouModalProps {
  text: string;
  isOpen: boolean;
  closeAction: () => void;
}

const ThankYouModal: React.FC<ThankYouModalProps & WithTranslation> = ({
  text,
  isOpen,
  closeAction,
  t,
}) => {
  const { classes } = useStyles();
  return (
    <Dialog open={isOpen} onClose={closeAction} PaperProps={{ className: classes.dialog }}>
      <DialogContent className={classes.root}>
        <Typography className={classes.title} variant={'h2'}>
          {t('Common.Thank you')}!
        </Typography>
        <img src={Assets.Thanks} alt="Thanks" height={130} />
        <Typography variant={'body1'}>{text}</Typography>
        <Button
          className={classes.closeButton}
          disableElevation
          variant={'contained'}
          color={'primary'}
          onClick={closeAction}
        >
          <span className={classes.closeButtonText}>{t('Modals.Thanks Modal.Back')}</span>
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default withTranslation()(ThankYouModal);
