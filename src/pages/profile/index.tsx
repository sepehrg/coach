import { Checkbox, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Loader from 'components/containers/Loader';
import ChangePasswordModal from 'components/ui/ChangePasswordModal';
import DatePicker from 'components/ui/DatePicker';
import FormSelectField from 'components/ui/FormSelectField';
import FormTextField from 'components/ui/FormTextField';
import { School } from 'entities';
import { Grade } from 'entities/Grade';
import { ChangeProfileRequest } from 'entities/Profile';
import { UserRole } from 'entities/User';
import { Field, Form, Formik } from 'formik';
import links from 'framework/links';
import useStyles from 'pages/profile/Profile.styles';
import React, { useCallback, useEffect, useState } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import useAuthActions from 'store/auth';
import { profileSelector, userRoleSelector } from 'store/auth/auth.selectors';
import { actions as authActions } from 'store/auth/auth.types';
import { useGradeActions } from 'store/grade';
import { gradesSelector } from 'store/grade/grade.selectors';
import { GET_GRADES_REQUEST } from 'store/grade/grade.types';
import { loadingActionSelector } from 'store/loader/loader.selectors';
import { useSchoolActions } from 'store/schools';
import { schoolsSelector } from 'store/schools/schools.selectors';
import { GET_SCHOOLS_REQUEST } from 'store/schools/schools.types';
import * as Yup from 'yup';
import MySubjectModal from 'pages/profile/components/MySubjectModal';
import { useSubjectsActions } from 'store/subjects';
import { serverSideValidateField } from 'utils/validator';
import Avatar from 'pages/profile/components/Avatar';
import { CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';
import HamburgerMenu from 'components/layout/Header/components/HamburgerMenu';
import i18n from 'translations/i18n';
import moment from 'moment';
import { Navigate, useNavigate } from 'react-router-dom';

const Profile: React.FC<WithTranslation> = ({ t }) => {
  const { classes, cx } = useStyles();
  const actions = useAuthActions();
  const navigate = useNavigate();
  const schoolActions = useSchoolActions();
  const gradeActions = useGradeActions();
  const subjectActions = useSubjectsActions();
  const userRole = useSelector(userRoleSelector);
  const profile = useSelector(profileSelector);
  const schools = useSelector(schoolsSelector);
  const grades = useSelector(gradesSelector);
  const emailValidation = serverSideValidateField(actions.validateEmail);
  const loading = useSelector(loadingActionSelector)([
    authActions.AUTH_UPDATE_PROFILE,
    GET_GRADES_REQUEST,
    GET_SCHOOLS_REQUEST,
  ]);

  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, t('Validation.First name.Min') ?? '')
      .max(20, t('Validation.First name.Max') ?? '')
      .trim()
      .required(t('Validation.First name.Required') ?? ''),
    lastName: Yup.string()
      .min(2, t('Validation.Last name.Min') ?? '')
      .max(20, t('Validation.Last name.Max') ?? '')
      .required(t('Validation.Last name.Required') ?? '')
      .trim(),
    email: Yup.string()
      .email(t('Validation.Email.Invalid') ?? '')
      .required(t('Validation.Email.Required') ?? '')
      .max(30, t('Validation.Email.Max') ?? '')
      .test('Unique Email', t('Validation.Email.Email already in use') ?? '', (value) => {
        return new Promise((resolve) => {
          if (typeof value === 'string') {
            if (value === profile?.email) {
              resolve(true);
            } else {
              emailValidation(
                value,
                () => resolve(true),
                () => resolve(false),
              );
            }
          }
        });
      }),
    birthDate: Yup.date(),
    school: Yup.string(),
    grade: Yup.string(),
  });

  const [modal, setModal] = useState<boolean>(false);
  const [subjectEditing, setSubjectEditing] = useState<boolean>(false);
  const [changedIcon, setChangedIcon] = useState<File | null>(null);
  const [lng, setLng] = useState<string>(i18n.language);

  useEffect(() => {
    schoolActions.get();
    gradeActions.get();
    subjectActions.get();
  }, [schoolActions, gradeActions, subjectActions]);

  useEffect(() => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lng', lng);
  }, [lng]);

  const handleUpdateProfile = (profile: ChangeProfileRequest) => {
    actions.updateProfile(profile);
  };

  const handleToggleModal = () => {
    setModal((prevState) => !prevState);
  };

  const handleUpdatePassword = (oldPassword: string, newPassword: string) => {
    actions.changePassword({
      oldPassword,
      newPassword,
      navigate,
      successAction: () => {
        handleToggleModal();
      },
    });
  };

  const handleUpdateSubjects = (subjects: { id: string }[]) => {
    subjectActions.updateMySubjects(subjects, () => handleToggleSubjectModal());
  };

  const handleToggleSubjectModal = useCallback(() => {
    setSubjectEditing((prevState) => !prevState);
  }, [setSubjectEditing]);

  const handleSetChangedIcon = useCallback(
    (icon: File) => {
      setChangedIcon(icon);
    },
    [setChangedIcon],
  );

  if (!profile) return <Navigate replace to={links.student.focusTime} />;

  return (
    <>
      <Grid container className={classes.columns}>
        <Grid item>
          <HamburgerMenu />
        </Grid>
        <Grid item className={classes.photoItem}>
          <Box className={cx(classes.main, classes.mainPhoto)}>
            <Grid container className={classes.root}>
              <Avatar img={profile.icon} changeImg={handleSetChangedIcon} />
              <Button
                className={classes.changePassword}
                variant={'contained'}
                onClick={handleToggleModal}
              >
                <Typography className={classes.changePasswordText}>
                  {t('Profile.Change the password')}
                </Typography>
              </Button>
            </Grid>
          </Box>
        </Grid>
        <Grid item>
          <Box className={cx(classes.main, classes.mainProfile)}>
            <Grid container className={classes.root}>
              <Grid item className={classes.titleBox}>
                <Typography variant={'h1'}>{t('Profile.Profile')}</Typography>
              </Grid>
              <Loader loading={loading}>
                <Formik
                  validateOnBlur={false}
                  validateOnChange={false}
                  initialValues={{
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    phone: profile.phone,
                    email: profile.email,
                    birthDate: new Date(profile.birthDate),
                    school: profile.school?.id || '',
                    grade: profile.grade?.id || '',
                    nonnative: profile.native ? 'false' : 'true',
                    english: lng === 'en',
                  }}
                  validationSchema={ProfileSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    setLng(values.english ? 'en' : 'de');
                    if (userRole === UserRole.Student) {
                      handleUpdateProfile({
                        birthDate: values.birthDate,
                        grade: values.grade,
                        firstName: values.firstName,
                        lastName: values.lastName,
                        school: values.school,
                        ...(values.email !== profile?.email && {
                          email: values.email,
                        }),
                        ...(changedIcon !== null && {
                          icon: changedIcon,
                        }),
                        native: values.nonnative === 'true' ? 'false' : 'true',
                      });
                    } else {
                      handleUpdateProfile({
                        birthDate: values.birthDate,
                        firstName: values.firstName,
                        lastName: values.lastName,
                        school: values.school,
                        email: values.email,
                      });
                    }
                    setSubmitting(false);
                  }}
                >
                  {({ values, submitForm, setFieldValue, isValid, touched, setFieldTouched }) => (
                    <Form autoComplete={'off'} style={{ width: '85%' }}>
                      <Typography variant={'body1'} className={classes.fieldTitle}>
                        {t('Profile.First name')}
                      </Typography>
                      <Field
                        component={FormTextField}
                        className={classes.field}
                        name={'firstName'}
                        placeholder={t('Placeholders.First name')}
                      />
                      <Typography variant={'body1'} className={classes.fieldTitle}>
                        {t('Profile.Last name')}
                      </Typography>
                      <Field
                        component={FormTextField}
                        className={classes.field}
                        name={'lastName'}
                        placeholder={t('Placeholders.Last name')}
                      />
                      <Typography variant={'body1'} className={classes.fieldTitle}>
                        {t('Profile.Email')}
                      </Typography>
                      <Field
                        component={FormTextField}
                        className={classes.field}
                        name={'email'}
                        placeholder={t('Placeholders.Email')}
                      />
                      <Typography variant={'body1'} className={classes.fieldTitle}>
                        {t('Profile.School name')}
                      </Typography>
                      <Field
                        component={FormSelectField}
                        className={classes.field}
                        name={'school'}
                        disabled
                      >
                        {schools.data.map((item: School) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Field>
                      {userRole && (
                        <Grid item>
                          <Typography variant={'body1'} className={classes.fieldTitle}>
                            {t('Profile.Class')}
                          </Typography>
                          <Field
                            component={FormSelectField}
                            className={classes.field}
                            name={'grade'}
                            disabled
                          >
                            {grades.data.map((item: Grade) => (
                              <MenuItem key={item.id} value={item.id}>
                                {item.year}
                              </MenuItem>
                            ))}
                          </Field>
                        </Grid>
                      )}
                      <Typography variant={'body1'} className={classes.fieldTitle}>
                        {t('Profile.Birthday')}
                      </Typography>
                      <DatePicker
                        handler={(date) => {
                          setFieldValue('birthDate', date);
                          setFieldTouched('birthDate', true);
                        }}
                        value={values.birthDate}
                        minDate={moment().subtract(73, 'years').toDate()}
                        maxDate={moment().toDate()}
                      />

                      <Box className={classes.languageBox}>
                        <Checkbox
                          className={classes.languageCheckbox}
                          icon={<RadioButtonUnchecked />}
                          checkedIcon={<CheckCircle />}
                          checked={values.nonnative === 'true' ? true : false}
                          onChange={(e) => {
                            setFieldValue('nonnative', e.target.checked ? 'true' : 'false');
                            setFieldTouched('nonnative', true);
                          }}
                        />
                        <Typography className={classes.language}>
                          {t('Register.German as a Second Language?')}
                        </Typography>
                      </Box>

                      <Box className={cx(classes.languageBox, classes.englishBox)}>
                        <Checkbox
                          className={classes.languageCheckbox}
                          icon={<RadioButtonUnchecked />}
                          checkedIcon={<CheckCircle />}
                          checked={values.english}
                          onChange={(e) => {
                            setFieldValue('english', e.target.checked);
                            setFieldTouched('english', true);
                          }}
                        />
                        <Typography className={classes.language}>
                          {t('Register.Switch to English?')}
                        </Typography>
                      </Box>
                      <Box className={classes.signUpBox}>
                        <Button
                          variant="contained"
                          color={'primary'}
                          className={classes.signUpBotton}
                          onClick={submitForm}
                          disabled={
                            !isValid || !(Object.keys(touched).length > 0 || changedIcon !== null)
                          }
                          disableElevation
                        >
                          {t('Profile.Save Changes')}
                        </Button>
                      </Box>
                    </Form>
                  )}
                </Formik>
              </Loader>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <ChangePasswordModal
        isOpen={modal}
        submitAction={handleUpdatePassword}
        closeAction={handleToggleModal}
      />
      <MySubjectModal
        isOpen={subjectEditing}
        onClose={handleToggleSubjectModal}
        onSubmit={handleUpdateSubjects}
      />
    </>
  );
};

export default withTranslation()(Profile);
