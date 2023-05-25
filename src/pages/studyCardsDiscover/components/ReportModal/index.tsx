import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import useStyles from './ReportModal.styles';
import { withTranslation, WithTranslation } from 'react-i18next';

interface ReportModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onSubmit: (reason: string, comments?: string) => void;
}

const ReportModal: React.FC<ReportModalProps & WithTranslation> = (props) => {
  const { classes } = useStyles();
  const { isOpen, onCancel, onSubmit, t } = props;
  const [value, setValue] = useState<string>('');
  const [comment, setComment] = useState<string | undefined>(undefined);

  return (
    <Dialog open={isOpen} onClose={onCancel} className={classes.modalWrapper}>
      <DialogContent>
        <Box className={classes.titleWrapper} display="flex" alignItems={'center'}>
          <Typography>{t('Study Cards.Discover.Report')}</Typography>
        </Box>
        <Typography variant={'h4'} className={classes.subtitle}>
          {t('Study Cards.Discover.WhyReport')}
        </Typography>
        <RadioGroup
          name="report"
          value={value}
          className={classes.radioWrapper}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setValue((event.target as HTMLInputElement).value);
          }}
        >
          <FormControlLabel
            value="inappropriate"
            control={<Radio color={'primary'} />}
            label={t('Study Cards.Discover.Inappropriate')}
          />
          <FormControlLabel
            value="mistake"
            control={<Radio color={'primary'} />}
            label={t('Study Cards.Discover.Mistake')}
          />
        </RadioGroup>
        {value === 'mistake' && (
          <textarea
            value={comment}
            className={classes.textarea}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              setComment(event.target.value)
            }
          />
        )}
      </DialogContent>
      <DialogActions className={classes.actionsWrapper}>
        <Button onClick={onCancel} variant="outlined" color="primary">
          {t('Study Cards.Discover.Cancel')}
        </Button>
        <Button
          onClick={() => onSubmit(value, comment)}
          size={'medium'}
          color="primary"
          variant={'contained'}
          disableElevation
        >
          {t('Study Cards.Discover.Report')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withTranslation()(ReportModal);
