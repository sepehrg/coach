import React, { useEffect } from 'react';
import useStyles from 'pages/study/components/AnotherLinkModal/AnotherLinkModal.styles';
import { Dialog, DialogContent, Grid, MenuItem } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import FormTextField from 'components/ui/FormTextField';
import Button from '@mui/material/Button';
import { withTranslation, WithTranslation } from 'react-i18next';
import { subjectsSelector } from 'store/subjects/subjects.selectors';
import { gradesSelector } from 'store/grade/grade.selectors';
import { useGradeActions } from 'store/grade';
import { Grade } from 'entities/Grade';
import FormSelectField from 'components/ui/FormSelectField';

interface AnotherLinkModal {
  isOpen: boolean;
  closeAction: () => void;
  submitAction: (url: string, grade: string) => void;
}

const AnotherLinkModal: React.FC<AnotherLinkModal & WithTranslation> = ({
  isOpen,
  closeAction,
  submitAction,
  t,
}) => {
  const { classes } = useStyles();
  const { selectedItem } = useSelector(subjectsSelector);
  const grades = useSelector(gradesSelector);
  const gradeActions = useGradeActions();

  useEffect(() => {
    gradeActions.get();
  }, [gradeActions]);

  const MaterialLinkSchema = Yup.object().shape({
    link: Yup.string()
      .url(t('Validation.Material Link.Enter valid url') ?? '')
      .required(t('Validation.Material Link.Enter url') ?? ''),
    grade: Yup.string().required(t('Validation.Material Link.Describe') ?? ''),
  });

  return (
    <Dialog
      PaperProps={{ className: classes.dialog }}
      BackdropProps={{
        className: classes.backdrop,
      }}
      open={isOpen}
      onClose={closeAction}
    >
      <DialogContent className={classes.root}>
        <Formik
          initialValues={{
            link: '',
            grade: '',
          }}
          initialErrors={{
            link: t('Validation.Common.Not filled') as string,
            grade: t('Validation.Common.Not filled') as string,
          }}
          validationSchema={MaterialLinkSchema}
          onSubmit={(values) => {
            submitAction(values.link, values.grade);
          }}
        >
          {({ submitForm, isValid }) => (
            <Form autoComplete={'off'} className={classes.form}>
              <Typography variant={'h2'} className={classes.title}>
                {t('Study.Another Link Modal.I want to suggest a link')}
              </Typography>
              <Grid container>
                <Grid item className={classes.field}>
                  <Typography variant={'body1'}>{t('Study.Another Link Modal.Subject')}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant={'body1'}>{selectedItem?.name}</Typography>
                </Grid>
              </Grid>
              <Grid container wrap="nowrap">
                <Grid item className={classes.field}>
                  <Typography variant={'body1'}>
                    {t('Study.Another Link Modal.Copy the link in here')}
                  </Typography>
                </Grid>
                <Grid item>
                  <Field
                    component={FormTextField}
                    name={'link'}
                    type={'url'}
                    className={classes.urlInput}
                  />
                </Grid>
              </Grid>
              <Grid container wrap="nowrap">
                <Grid item className={classes.field}>
                  <Typography variant={'body1'}>{t('Study.Another Link Modal.Grade')}</Typography>
                </Grid>
                <Grid item>
                  <Field component={FormSelectField} name={'grade'} className={classes.urlInput}>
                    {grades.data.map((item: Grade) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.year}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
              </Grid>
              <Box className={classes.description}>
                <Typography variant={'body1'}>
                  {t('Study.Another Link Modal.When the teacher check')}
                </Typography>
                <Box className={classes.next}>
                  {t('Study.Another Link Modal.What happens then')}
                </Box>
                <Box className={classes.triangle}></Box>
              </Box>
              <Grid container className={classes.buttonsContainer}>
                <Button
                  color={'primary'}
                  disableElevation
                  variant={'contained'}
                  disabled={!isValid}
                  onClick={submitForm}
                  className={classes.submit}
                >
                  {t('Common.Submit')}
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default withTranslation()(AnotherLinkModal);
