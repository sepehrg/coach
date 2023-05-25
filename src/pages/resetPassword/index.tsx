import React from 'react';
import { loadingActionSelector } from 'store/loader/loader.selectors';
import useStyles from 'pages/resetPassword/ResetPassword.styles';
import AuthLayout from 'components/layout/AuthLayout';
import { Field, Form, Formik } from 'formik';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import * as Yup from 'yup';
import FormPasswordField from 'components/ui/FormPasswordField';
import Box from '@mui/material/Box';
import { useNavigate, useParams } from 'react-router-dom';
import useAuthActions from 'store/auth';
import { useSelector } from 'react-redux';
import Loader from 'components/containers/Loader';
import { withTranslation, WithTranslation } from 'react-i18next';
import i18n from 'translations/i18n';
import { actions as authActions } from 'store/auth/auth.types';

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, i18n.t('Validation.Password.Min') ?? '')
    .max(16, i18n.t('Validation.Password.Max') ?? '')
    .trim()
    .required(i18n.t('Validation.Password.Required') ?? ''),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), ''], i18n.t('Validation.Password.Not Match') ?? '')
    .required(i18n.t('Validation.Password.Required') ?? ''),
});

const ResetPassword: React.FC<WithTranslation> = ({ t }) => {
  const { classes } = useStyles();
  const { token } = useParams<{ token: string }>();
  const actions = useAuthActions();
  const loading = useSelector(loadingActionSelector)([authActions.AUTH_RESET_PASSWORD]);
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <Formik
        initialErrors={{ password: 'Not filled', passwordConfirmation: 'Not filled' }}
        validationSchema={ResetPasswordSchema}
        initialValues={{ password: '', passwordConfirmation: '' }}
        onSubmit={(values, { resetForm }) => {
          actions.changePassword({
            oldPassword: values.password,
            newPassword: values.password,
            token,
            navigate,
          });
          resetForm();
        }}
      >
        {({ isValid, submitForm }) => (
          <Form autoComplete={'off'}>
            <Grid container alignItems={'center'} direction={'column'}>
              <Grid item className={classes.bigSpace}>
                <Typography variant={'h1'}>{t('Reset Password.Create new password')}</Typography>
              </Grid>
              <Loader loading={loading}>
                <Grid item className={classes.smallSpace}>
                  <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <Box className={classes.smallSpace}>
                      <Typography variant={'body1'} style={{ marginBottom: '12px' }}>
                        {t('Reset Password.Create new password')}
                      </Typography>
                      <Field
                        component={FormPasswordField}
                        name={'password'}
                        placeholder={t('Placeholders.Password')}
                      />
                    </Box>
                    <Box>
                      <Typography variant={'body1'} style={{ marginBottom: '12px' }}>
                        {t('Reset Password.Confirm Password')}
                      </Typography>
                      <Field
                        component={FormPasswordField}
                        name={'passwordConfirmation'}
                        placeholder={t('Placeholders.Confirm Password')}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <Button
                    color={'primary'}
                    variant={'contained'}
                    disableElevation
                    disabled={!isValid}
                    onClick={submitForm}
                  >
                    {t('Reset Password.Save New Password')}
                  </Button>
                </Grid>
              </Loader>
            </Grid>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default withTranslation()(ResetPassword);
