import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { Field } from 'formik';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { withTranslation, WithTranslation } from 'react-i18next';
import { loadingActionSelector } from 'store/loader/loader.selectors';
import useStyles from './EmailStep.styles';
import GoBackArrow from 'components/ui/GoBackArrow';
import FormTextField from 'components/ui/FormTextField';

interface EmailStepProps {
  changeStepIndex: (index: number) => void;
  redirectAction: () => void;
  error: string | undefined;
}

const EmailStep: React.FC<EmailStepProps & WithTranslation> = ({
  changeStepIndex,
  redirectAction,
  error,
  t,
}) => {
  const { classes } = useStyles();
  const validationInProgress = useSelector(loadingActionSelector)(['AUTH_EMAIL_VALIDATION']);

  useEffect(() => {
    changeStepIndex(1);
  }, [changeStepIndex]);

  return (
    <Box className={classes.root}>
      <Box className={classes.stepTitle}>
        <Typography variant={'body1'}>{t('Register.Email Step.What is your email')}</Typography>
      </Box>
      <Field component={FormTextField} name={'email'} placeholder={t('Placeholders.Email')} />
      <br />
      <Button
        variant="contained"
        color={'primary'}
        disableElevation
        onClick={redirectAction}
        disabled={!!error || validationInProgress}
        className={classes.button}
      >
        {t('Register.Next')}
      </Button>
      <Box style={{ position: 'absolute', top: '40%', left: -100 }}>
        <GoBackArrow />
      </Box>
    </Box>
  );
};

export default withTranslation()(EmailStep);
