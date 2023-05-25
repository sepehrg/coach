import React from 'react';
import { Button, Dialog, DialogContent, Grid, Typography } from '@mui/material';
import useStyles from './SettingsModal.styles';
import { WithTranslation, withTranslation } from 'react-i18next';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChangeSettings: (value: number) => void;
  chosenOption: number | string;
}

const SettingsModal: React.FC<SettingsModalProps & WithTranslation> = (props) => {
  const { classes } = useStyles();
  const { isOpen, onClose, onChangeSettings, chosenOption, t } = props;

  const renderButton = (value: number, title: string) => {
    return (
      <Button
        className={
          chosenOption === value ? `${classes.option} ${classes.chosenOption}` : classes.option
        }
        onClick={() => {
          onChangeSettings(value);
        }}
      >
        {title}
      </Button>
    );
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent className={classes.container}>
        <Typography variant="h2">{t('Study Cards.Learn.Settings')}</Typography>
        <Grid
          container
          direction={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          className={classes.content}
        >
          <Typography variant={'body2'}>{t('Study Cards.Learn.How many cards')}</Typography>
          <Grid
            container
            item
            direction={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            className={classes.buttonsWrapper}
          >
            {renderButton(5, '5')}
            {renderButton(10, '10')}
            {renderButton(15, '15')}
            {renderButton(100, t('Study Cards.Learn.All'))}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default withTranslation()(SettingsModal);
