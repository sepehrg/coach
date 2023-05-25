import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { loadingActionSelector } from 'store/loader/loader.selectors';
import * as Assets from 'pages/login/assets';
import useStyles from 'pages/login/Login.styles';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import RememberMe from 'components/ui/RememberMe';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import useAuthActions from 'store/auth';
import { Field, Form, Formik } from 'formik';
import FormPasswordField from 'components/ui/FormPasswordField';
import FormTextField from 'components/ui/FormTextField';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { actions as authActions } from 'store/auth/auth.types';
import Loader from 'components/containers/Loader';
import links from 'framework/links';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Mixpanel } from 'utils/mixpanel';
import withIdo from 'components/narrative-design/withIdo';

interface WithIdoProps {
  showIdo: (label: string, value?: unknown) => void;
}

const Login: React.FC<WithTranslation & WithIdoProps> = ({ t }: WithTranslation & WithIdoProps) => {
  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('Validation.Email.Invalid') as string)
      .required(t('Validation.Email.Required') as string),
    password: Yup.string()
      .min(8, t('Validation.Password.Min') as string)
      .max(16, t('Validation.Password.Max') as string)
      .trim()
      .required(t('Validation.Password.Required') as string),
  });

  const actions = useAuthActions();
  const navigate = useNavigate();
  const { classes } = useStyles();
  const loading = useSelector(loadingActionSelector)([authActions.AUTH_LOGIN]);

  const [isRemember, setIsRemember] = useState<boolean>(true);
  const handleChangeRemember = (value: boolean) => {
    setIsRemember(value);
  };

  const loginSuccessHandler = () => {
    return;
  };

  return (
    <Grid container justifyContent={'space-between'} className={classes.root}>
      <Grid item container xs={6}>
        <Box
          style={{
            width: '100%',
            background: `url(${Assets.LoginLogo})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
      <Grid item container xs={6} alignItems={'center'} justifyContent={'center'}>
        <Grid
          item
          container
          xs={8}
          justifyContent={'space-between'}
          alignItems={'center'}
          style={{ padding: '130px 0' }}
        >
          <Grid item container justifyContent={'center'} style={{ marginBottom: 30 }}>
            <img src={Assets.Logo} alt="Logo" height={48} />
          </Grid>
          <Grid
            item
            container
            xs={12}
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            className={classes.bigSpace}
          >
            <Grid item>
              <Typography variant={'h1'}>Log In</Typography>
            </Grid>
            <Grid item>
              <Typography variant={'body1'}>
                {`${t('Login.or')} `}
                <Link className={classes.linkText} to={'/register'}>
                  {t('Login.Create Account')}
                </Link>
              </Typography>
            </Grid>
          </Grid>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            initialErrors={{
              email: t('Validation.Common.Not filled') as string,
              password: t('Validation.Common.Not filled') as string,
            }}
            validationSchema={SignInSchema}
            onSubmit={(values, { setSubmitting }) => {
              actions.login(
                { ...values, isRememberMe: isRemember },
                navigate,
                loginSuccessHandler,
                // showIdo('INFORMATIVE.DASHBOARD', 0)
              );
              Mixpanel.identify(values.email);
              setSubmitting(false);
            }}
          >
            {({ submitForm, isValid }) => (
              <Loader loading={loading}>
                <Form className={classes.fullWidth} autoComplete={'off'}>
                  <Grid item className={` ${classes.fullWidth} ${classes.bigSpace} `}>
                    <Typography variant={'body1'} className={classes.smallSpace}>
                      {t('Login.Email')}
                    </Typography>
                    <Field
                      component={FormTextField}
                      name={'email'}
                      placeholder={t('Placeholders.Email')}
                      type={'email'}
                      className={classes.fullWidth}
                    />
                  </Grid>
                  <Grid item className={` ${classes.fullWidth} ${classes.bigSpace} `}>
                    <Grid container justifyContent={'space-between'}>
                      <Grid item>
                        <Typography variant={'body1'} className={classes.smallSpace}>
                          {t('Login.Password')}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant={'body1'}>
                          <Link className={classes.linkText} to={links.student.forgotPassword}>
                            {t('Login.Forgot Password')}?
                          </Link>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Field
                      component={FormPasswordField}
                      name={'password'}
                      placeholder={t('Placeholders.Password')}
                      className={classes.fullWidth}
                      onKeyDown={(e: KeyboardEvent) => {
                        if (e.key === 'Enter') {
                          submitForm();
                        }
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    container
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    className={classes.fullWidth}
                  >
                    <Grid item>
                      <RememberMe checked={isRemember} setChecked={handleChangeRemember} />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color={'primary'}
                        disabled={!isValid}
                        onClick={submitForm}
                        disableElevation
                      >
                        {t('Login.Log In')}
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              </Loader>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withTranslation()(withIdo(Login));
