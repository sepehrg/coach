import React from 'react';
import useStyles from './BeforeStartModal.styles';
import { Box, Dialog, DialogContent } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { WithTranslation, withTranslation } from 'react-i18next';

interface BeforeStartModalProps {
  isOpen: boolean;
  onClose: () => void;
  chosenTime: string;
}

const BeforeStartModal: React.FC<BeforeStartModalProps & WithTranslation> = ({
  isOpen,
  onClose,
  chosenTime,
  t,
}) => {
  const { classes } = useStyles();
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent className={`${classes.root} ${classes.marginBottom}`}>
        <Box className={classes.marginBottom}>
          <Typography variant={'h2'}>{t('Focus Time.Before you start')}</Typography>
        </Box>
        <Typography variant={'body1'} className={classes.marginBottom}>
          <li>{t('Focus Time.Rules.1')}</li>
          <li>{t('Focus Time.Rules.2')}</li>
          <li>{t('Focus Time.Rules.3')}</li>
          <li>{t('Focus Time.Rules.4')}</li>
        </Typography>
        <Box className={classes.marginBottom}>
          <Typography variant={'h2'}>{t('Focus Time.Chosen Timer')}</Typography>
          <Typography variant={'body1'}>{chosenTime}</Typography>
        </Box>
        <Box className={classes.buttonWrapper}>
          <Button variant={'contained'} color={'primary'} disableElevation onClick={onClose}>
            {t('Focus Time.Lets do it')}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default withTranslation()(BeforeStartModal);
