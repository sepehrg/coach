import { Dialog, DialogContent } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import useStyles from './RulesModal.styles';

interface RulesModalProps {
  isOpen: boolean;
  closeAction: () => void;
  submitAction: () => void;
  timerCount: number;
}

const RulesModal: React.FC<RulesModalProps & WithTranslation> = ({
  isOpen,
  closeAction,
  timerCount,
  submitAction,
  t,
}) => {
  const { classes } = useStyles();
  return (
    <Dialog
      open={isOpen}
      onClose={closeAction}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent className={classes.root}>
        <Box>
          <Typography variant={'h2'}>{t('Focus Time.Before you start')}</Typography>
          <Typography variant={'body1'}>{`• ${t('Focus Time.Rules.1')}`}</Typography>
          <Typography variant={'body1'}>{`• ${t('Focus Time.Rules.2')}`}</Typography>
          <Typography variant={'body1'}>{`• ${t('Focus Time.Rules.3')}`}</Typography>
          <Typography variant={'body1'}>{`• ${t('Focus Time.Rules.4')}`}</Typography>
        </Box>
        <Box>
          <Typography variant={'h2'}>{t('Focus Time.Chosen Timer')}</Typography>
          <Typography variant={'body1'}>{`00:${timerCount}:00`}</Typography>
        </Box>
        <Button
          variant="contained"
          color={'primary'}
          disableElevation
          style={{ flexGrow: 0 }}
          onClick={submitAction}
        >
          {t('Common.Start Learning')}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default withTranslation()(RulesModal);
