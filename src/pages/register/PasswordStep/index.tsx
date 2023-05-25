import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Field } from 'formik';
import FormPasswordField from 'components/ui/FormPasswordField';
import { withTranslation, WithTranslation } from 'react-i18next';
import GoBackArrow from 'components/ui/GoBackArrow';

interface PasswordStepProps {
  changeStepIndex: (value: number) => void;
  redirectAction: () => void;
  errorPass: string | undefined;
  errorConfirm: string | undefined;
}

const PasswordStep: React.FC<PasswordStepProps & WithTranslation> = ({
  changeStepIndex,
  redirectAction,
  errorPass,
  errorConfirm,
  t,
}) => {
  useEffect(() => {
    changeStepIndex(2);
  }, [changeStepIndex]);

  return (
    <Box style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
      <Box style={{ marginBottom: '35px' }}>
        <Typography variant={'body1'} style={{ marginBottom: '12px' }}>
          {t('Register.Password Step.Create Password')}
        </Typography>
        <Field
          component={FormPasswordField}
          name={'password'}
          placeholder={t('Placeholders.Password')}
          autoFocus={true}
        />
      </Box>
      <Box>
        <Typography variant={'body1'} style={{ marginBottom: '12px' }}>
          {t('Register.Password Step.Confirm Password')}
        </Typography>
        <Field
          component={FormPasswordField}
          name={'passwordConfirmation'}
          placeholder={t('Placeholders.Confirm Password')}
        />
      </Box>
      <Button
        variant="contained"
        color={'primary'}
        disableElevation
        onClick={redirectAction}
        disabled={!!errorPass || !!errorConfirm}
        style={{
          alignSelf: 'center',
          marginTop: '25px',
        }}
      >
        {t('Register.Next')}
      </Button>
      <Box style={{ position: 'absolute', top: '40%', left: -100 }}>
        <GoBackArrow />
      </Box>
    </Box>
  );
};

export default withTranslation()(PasswordStep);
