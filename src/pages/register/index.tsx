import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import useStyles from 'pages/register/Register.styles';
import { Button, Checkbox, MenuItem, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import useAuthActions from 'store/auth';
import AuthLayout from 'components/layout/AuthLayout';
import { useSchoolActions } from 'store/schools';
import { useGradeActions } from 'store/grade';
import { WithTranslation, withTranslation } from 'react-i18next';
import { serverSideValidateField } from 'utils/validator';
import FormTextField from 'components/ui/FormTextField';
import FormSelectField from 'components/ui/FormSelectField';
import { School } from 'entities';
import { Grade } from 'entities/Grade';
import EduDatePicker from 'components/ui/DatePicker';
import FormPasswordField from 'components/ui/FormPasswordField';
import { schoolsSelector } from 'store/schools/schools.selectors';
import { gradesSelector } from 'store/grade/grade.selectors';
import { useSelector } from 'react-redux';
import { CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const Register: React.FC<WithTranslation> = ({ t }) => {
  const { classes } = useStyles();
  const actions = useAuthActions();
  const schoolActions = useSchoolActions();
  const gradeActions = useGradeActions();
  const emailValidation = serverSideValidateField(actions.validateEmail);
  const schools = useSelector(schoolsSelector);
  const grades = useSelector(gradesSelector);
  const navigate = useNavigate();

  const SignUpSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, t('Validation.First name.Min') as string)
      .max(20, t('Validation.First name.Max') as string)
      .trim()
      .required(t('Validation.First name.Required') as string),
    lastName: Yup.string()
      .min(2, t('Validation.Last name.Min') as string)
      .max(20, t('Validation.Last name.Max') as string)
      .trim()
      .required(t('Validation.Last name.Required') as string),
    email: Yup.string()
      .email(t('Validation.Email.Invalid') as string)
      .max(30, t('Validation.Email.Max') as string)
      .required(t('Validation.Email.Required') as string)
      .test('Unique Email', t('Validation.Email.Email already in use') as string, (value) => {
        return new Promise((resolve) => {
          if (typeof value === 'string') {
            emailValidation(
              value,
              () => resolve(true),
              () => resolve(false),
            );
          }
        });
      }),
    password: Yup.string()
      .min(8, t('Validation.Password.Min') as string)
      .max(16, t('Validation.Password.Max') as string)
      .trim()
      .required(t('Validation.Password.Required') as string),
    birthDate: Yup.date().required(t('Validation.Birthdate.Required') as string),
    school: Yup.string().required(t('Validation.School.Required') as string),
    grade: Yup.string().required(t('Validation.Class.Required') as string),
  });

  useEffect(() => {
    schoolActions.get();
    gradeActions.get();
  }, [schoolActions, gradeActions]);

  return (
    <AuthLayout>
      <Box className={classes.main}>
        <Grid container className={classes.root}>
          <Grid item className={classes.titleBox}>
            <Typography variant={'h1'}>{t('Register.Create Account')}</Typography>
          </Grid>
          <Grid item style={{ padding: '0 40px' }}>
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                birthDate: new Date(),
                school: '',
                grade: '',
                german: true,
              }}
              initialErrors={{
                firstName: t('Validation.Common.Not filled') as string,
                lastName: t('Validation.Common.Not filled') as string,
                email: t('Validation.Common.Not filled') as string,
                password: t('Validation.Common.Not filled') as string,
                birthDate: t('Validation.Common.Not filled') as string,
                school: t('Validation.Common.Not filled') as string,
                grade: t('Validation.Common.Not filled') as string,
              }}
              onSubmit={(values) => {
                actions.register(values, navigate);
              }}
              validationSchema={SignUpSchema}
            >
              {({ handleSubmit, setFieldValue, setFieldTouched, values }) => (
                <form onSubmit={handleSubmit}>
                  <Typography className={classes.label} style={{ marginTop: 20 }}>
                    {t('Register.First Name')}
                  </Typography>
                  <Field
                    component={FormTextField}
                    className={classes.field}
                    name={'firstName'}
                    placeholder={t('Placeholders.First name')}
                    autoFocus={true}
                  />
                  <Typography className={classes.label}>{t('Register.Last Name')}</Typography>
                  <Field
                    component={FormTextField}
                    className={classes.field}
                    name={'lastName'}
                    placeholder={t('Placeholders.Last name')}
                  />
                  <Typography className={classes.label}>{t('Register.My School')}</Typography>
                  <Field component={FormSelectField} className={classes.field} name={'school'}>
                    {schools.data.map((item: School) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Field>
                  <Typography className={classes.label}>{t('Register.My Class')}</Typography>
                  <Field component={FormSelectField} className={classes.field} name={'grade'}>
                    {grades.data
                      .slice()
                      .sort((a, b) => a.year - b.year)
                      .map((item: Grade) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.year}
                        </MenuItem>
                      ))}
                  </Field>
                  <Typography className={classes.label}>{t('Register.Birthday')}</Typography>
                  <EduDatePicker
                    handler={(date) => {
                      setFieldValue('birthDate', date);
                      setFieldTouched('birthDate', true);
                    }}
                    value={values.birthDate}
                    minDate={moment().subtract(73, 'years').toDate()}
                    maxDate={moment().toDate()}
                  />
                  <Typography className={classes.label}>{t('Register.Your Email')}</Typography>
                  <Field
                    component={FormTextField}
                    className={classes.field}
                    name={'email'}
                    placeholder={t('Placeholders.Email')}
                  />
                  <Typography className={classes.label}>{t('Register.Password')}</Typography>
                  <Field
                    component={FormPasswordField}
                    className={classes.field}
                    name={'password'}
                    placeholder={t('Placeholders.Password')}
                    autoFocus={true}
                  />
                  <Box className={classes.languageBox}>
                    <Checkbox
                      className={classes.languageCheckbox}
                      icon={<RadioButtonUnchecked />}
                      checkedIcon={<CheckCircle />}
                      checked={values.german}
                      onChange={(e) => {
                        setFieldValue('german', e.target.checked);
                      }}
                    />
                    <Typography className={classes.language}>
                      {t('Register.German as a Second Language?')}
                    </Typography>
                  </Box>
                  <Box className={classes.signUpBox}>
                    <Button
                      variant="contained"
                      color={'primary'}
                      type="submit"
                      disableElevation
                      className={classes.signUpBotton}
                    >
                      {t('Register.Sign up')}
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default withTranslation()(Register);
