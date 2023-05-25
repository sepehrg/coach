import GoBackArrow from 'components/ui/GoBackArrow';
import React, { useState } from 'react';
import useStyles from './ForgotPassword.styles';
import AuthLayout from 'components/layout/AuthLayout';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FormTextField from 'components/ui/FormTextField';
import Button from '@mui/material/Button';
import useRouterActions from 'store/router';
import useAuthActions from 'store/auth';
import { withTranslation, WithTranslation } from 'react-i18next';
import i18n from 'translations/i18n';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email(i18n.t('Validation.Email.Invalid') as string)
    .required(i18n.t('Validation.Email.Required') as string),
});

const ForgotPassword: React.FC<WithTranslation> = ({ t }) => {
  const routerActions = useRouterActions();
  const authActions = useAuthActions();
  const { classes } = useStyles();

  const [sent, setSent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  return (
    <AuthLayout>
      {sent ? (
        <Grid container direction={'column'} alignItems={'center'}>
          <Grid item style={{ marginBottom: 24 }}>
            <Typography variant={'h1'}>{t('Forgot Password.Success')}</Typography>
          </Grid>
          <Grid item style={{ marginBottom: 32, maxWidth: 340 }}>
            <Typography variant={'body1'}>
              {t('Forgot Password.A link to reset')}
              <span style={{ color: 'blue' }}>{` ${email} `}</span>
              {t('Forgot Password.successfully')}
            </Typography>
          </Grid>
          <Grid item>
            <Button onClick={routerActions.navigateToLogin} variant={'contained'} disableElevation>
              {t('Forgot Password.Back to login')}
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Formik
          initialErrors={{ email: t('Validation.Common.Not filled') as string }}
          validationSchema={ForgotPasswordSchema}
          initialValues={{ email: '' }}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            authActions.resetPassword(
              values.email,
              () => {
                setSent(true);
                resetForm();
                setEmail(values.email);
              },
              () => {
                setSubmitting(false);
              },
            );
          }}
        >
          {({ errors, submitForm }) => (
            <Form autoComplete={'off'}>
              <Grid container alignItems={'center'} direction={'column'}>
                <Grid
                  item
                  container
                  alignItems={'center'}
                  justifyContent={'center'}
                  lg={4}
                  style={{
                    marginBottom: 50,
                  }}
                >
                  <Grid item>
                    <GoBackArrow />
                  </Grid>
                  <Grid item>
                    <Typography variant={'h1'}>{t('Forgot Password.Forgot Password')}?</Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  direction={'column'}
                  alignItems={'flex-start'}
                  lg={3}
                  md={4}
                  style={{ marginBottom: 12 }}
                >
                  <Typography variant={'body1'}>
                    {t('Forgot Password.Enter your email for restore password')}
                  </Typography>
                  <Typography variant={'body1'}>
                    {t('Forgot Password.and follow the instructions from the letter')}
                  </Typography>
                </Grid>
                <Grid item lg={3} md={4} style={{ marginBottom: 30 }}>
                  <Field
                    component={FormTextField}
                    name={'email'}
                    placeholder={t('Forgot Password.Enter your Email')}
                    type={'email'}
                    className={classes.fullWidth}
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color={'primary'}
                    disabled={!!errors.email}
                    onClick={submitForm}
                    disableElevation
                  >
                    {t('Forgot Password.Send')}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      )}
    </AuthLayout>
  );
};

export default withTranslation()(ForgotPassword);
