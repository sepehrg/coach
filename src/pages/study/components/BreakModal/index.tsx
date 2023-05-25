import React from 'react';
import useStyles from './BreakModal.styles';
import { Box, Dialog, DialogContent } from '@mui/material';
import Typography from '@mui/material/Typography';
// import Countdown from 'components/ui/Countdown';
import Button from '@mui/material/Button';
import { Powerup } from 'entities/Powerup';
import { withTranslation, WithTranslation } from 'react-i18next';

interface BreakModalProps {
  isOpen: boolean;
  onClose: () => void;
  powerup: Powerup;
}

const BreakModal: React.FC<BreakModalProps & WithTranslation> = ({
  isOpen,
  onClose,
  powerup,
  t,
}) => {
  const { classes } = useStyles();
  return (
    powerup && (
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent className={`${classes.root} ${classes.marginBottom}`}>
          <Box className={`${classes.marginBottom} ${classes.modalTitle}`}>
            <Typography variant={'body2'}>{t('Study.Break Modal.Break time')}</Typography>
          </Box>
          <Box className={classes.timer}>{/* <Countdown time={300} onFinish={onClose} /> */}</Box>
          <Typography variant={'body1'} className={`${classes.marginBottom} ${classes.textTitle}`}>
            {powerup.title}
          </Typography>
          <Box className={`${classes.marginBottom} ${classes.mainText}`}>
            <Typography variant={'h2'}>{t('Study.Break Modal.Did you know')}</Typography>
            <Typography variant={'body1'}>{`...${powerup.advice}`}</Typography>
          </Box>
          <img
            src={powerup.icon}
            alt={'Power UP IMG'}
            className={`${classes.marginBottom} ${classes.image}`}
          />
          <Button variant={'contained'} color={'primary'} disableElevation onClick={onClose}>
            {t('Study.Break Modal.Finish break')}
          </Button>
        </DialogContent>
      </Dialog>
    )
  );
};

export default withTranslation()(BreakModal);
