import { Dialog, DialogContent } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Loader from 'components/containers/Loader';
import FormPasswordField from 'components/ui/FormPasswordField';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { loadingActionSelector } from 'store/loader/loader.selectors';
import * as Yup from 'yup';
import useStyles from 'components/ui/ChangePasswordModal/ChangePasswordModal.styles';
import { actions } from 'store/auth/auth.types';

interface ChangePasswordModalProps {
  submitAction: (oldPassword: string, newPassword: string) => void;
  closeAction: () => void;
  isOpen: boolean;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps & WithTranslation> = ({
  submitAction,
  closeAction,
  isOpen,
  t,
}) => {
  const { classes } = useStyles();
  const loading = useSelector(loadingActionSelector)([actions.AUTH_CHANGE_PASSWORD]);

  const ChangePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .min(8, t('Validation.Password.Min') ?? '')
      .max(16, t('Validation.Password.Max') ?? '')
      .required(t('Validation.Password.Required') ?? '')
      .trim(),
    newPassword: Yup.string()
      .min(8, t('Validation.Password.Min') ?? '')
      .max(16, t('Validation.Password.Max') ?? '')
      .required(t('Validation.Password.Required') ?? '')
      .trim(),
    newPasswordConfirmation: Yup.string()
      .oneOf([Yup.ref('newPassword'), ''], t('Validation.Password.Not Match') ?? '')
      .required(t('Validation.Password.Required') ?? ''),
  });

  return (
    <Dialog open={isOpen} onClose={closeAction} PaperProps={{ className: classes.dialog }}>
      <DialogContent className={classes.root}>
        <Loader loading={loading}>
          <Formik
            initialValues={{ oldPassword: '', newPassword: '', newPasswordConfirmation: '' }}
            initialErrors={{
              oldPassword: 'Not filled',
              newPassword: 'Not filled',
              newPasswordConfirmation: 'Not filled',
            }}
            onSubmit={(values) => {
              submitAction(values.oldPassword, values.newPassword);
            }}
            validationSchema={ChangePasswordSchema}
          >
            {({ submitForm, isValid }) => (
              <Form autoComplete={'off'}>
                <Box className={classes.modalTitle}>
                  <Typography variant={'h1'}>{t('Profile.Password')}</Typography>
                </Box>
                <Box className={classes.fieldBox}>
                  <Typography variant={'body1'} className={classes.fieldTitle}>
                    {t('Profile.Old Password')}
                  </Typography>
                  <Field
                    component={FormPasswordField}
                    name={'oldPassword'}
                    placeholder={t('Placeholders.Old Password')}
                  />
                </Box>
                <Box className={classes.fieldBox}>
                  <Typography variant={'body1'} className={classes.fieldTitle}>
                    {t('Profile.New Password')}
                  </Typography>
                  <Field
                    component={FormPasswordField}
                    name={'newPassword'}
                    placeholder={t('Placeholders.New Password')}
                  />
                </Box>
                <Box className={classes.fieldBox}>
                  <Typography variant={'body1'} className={classes.fieldTitle}>
                    {t('Profile.Confirm New Password')}
                  </Typography>
                  <Field
                    component={FormPasswordField}
                    name={'newPasswordConfirmation'}
                    placeholder={t('Placeholders.Confirm Password')}
                  />
                </Box>
                <Box className={classes.buttonBox}>
                  <Button
                    className={classes.submitButton}
                    variant="contained"
                    color={'primary'}
                    onClick={submitForm}
                    disabled={!isValid}
                    disableElevation
                  >
                    {t('Profile.Save Changes')}
                  </Button>
                  <Button
                    variant={'contained'}
                    disableElevation
                    color={'secondary'}
                    className={classes.closeButton}
                    onClick={closeAction}
                  >
                    {t('Common.Close')}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Loader>
      </DialogContent>
    </Dialog>
  );
};

export default withTranslation()(ChangePasswordModal);
