import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormTextField from 'components/ui/FormTextField';
import { Field } from 'formik';
import { withTranslation, WithTranslation } from 'react-i18next';

interface NameStepProps {
  changeStepIndex: (value: number) => void;
  redirectAction: () => void;
  error: string | undefined;
}

const NameStep: React.FC<NameStepProps & WithTranslation> = ({
  changeStepIndex,
  redirectAction,
  error,
  t,
}) => {
  useEffect(() => {
    changeStepIndex(0);
  }, [changeStepIndex]);

  return (
    <Box style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant={'body1'} style={{ marginBottom: '12px' }}>
        {t('Register.Name Step.What is your first name')}
      </Typography>
      <Field
        component={FormTextField}
        name={'firstName'}
        placeholder={t('Placeholders.First name')}
        autoFocus={true}
      />
      <br />
      <Typography variant={'body1'} style={{ marginBottom: '12px' }}>
        {t('Register.Name Step.What is your last name')}
      </Typography>
      <Field
        component={FormTextField}
        name={'lastName'}
        placeholder={t('Placeholders.Last name')}
      />
      <br />
      <Typography variant={'body1'} style={{ marginBottom: '12px' }}>
        {t('Register.Name Step.What is your phone number')}
      </Typography>
      <Field component={FormTextField} name={'phone'} placeholder={t('Placeholders.Phone')} />
      <br />
      <Button
        variant="contained"
        color={'primary'}
        disableElevation
        onClick={redirectAction}
        disabled={!!error}
        style={{
          alignSelf: 'center',
        }}
      >
        {t('Register.Next')}
      </Button>
    </Box>
  );
};

export default withTranslation()(NameStep);
