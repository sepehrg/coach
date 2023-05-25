import React from 'react';
import useStyles from 'pages/study/components/LearningTypesModal/LearningTypesModal.styles';
import { Dialog, DialogContent } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { withTranslation, WithTranslation } from 'react-i18next';

interface LearningTypesModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const LearningTypesModal: React.FC<LearningTypesModalProps & WithTranslation> = ({
  isOpen,
  handleClose,
  t,
}) => {
  const { classes } = useStyles();

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent className={classes.textContainer}>
        <Box>
          <Typography variant={'h2'}>{t('Study.Help.Learning Types')}</Typography>
        </Box>
        <Box>
          <Typography variant={'h2'}>{t('Study.Sources.Visual')}</Typography>
          <Typography variant={'body1'}>{t('Study.Help.Visual')}</Typography>
        </Box>
        <Box>
          <Typography variant={'h2'}>{t('Study.Sources.Auditory')}</Typography>
          <Typography variant={'body1'}>{t('Study.Help.Auditory')} </Typography>
        </Box>
        <Box>
          <Typography variant={'h2'}>{t('Study.Sources.Kensethetic')}</Typography>
          <Typography variant={'body1'}>{t('Study.Help.Kensethetic')}</Typography>
        </Box>
        <Box>
          <Typography variant={'h2'}>{t('Study.Sources.Reading/Writing')}</Typography>
          <Typography variant={'body1'}>{t('Study.Help.Reading/Writing')}</Typography>
        </Box>
        <Button onClick={handleClose} className={classes.button}>
          {t('Study.Help.Continue Learning')}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default withTranslation()(LearningTypesModal);
