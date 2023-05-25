import React, { useState, useEffect } from 'react';
import useStyles from './SuggestedSubjectModal.styles';
import { DialogContent, Dialog } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import Typography from '@mui/material/Typography';
import FormTextField from 'components/ui/FormTextField';
import Button from '@mui/material/Button';
import * as Yup from 'yup';
import ImageUploader from '@starlord25/react-images-upload';
import Box from '@mui/material/Box';
import _ from 'lodash-es';
import { withTranslation, WithTranslation } from 'react-i18next';

interface SuggestedSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, file: File) => void;
}

const SuggestedSubjectModal: React.FC<SuggestedSubjectModalProps & WithTranslation> = ({
  onSubmit,
  isOpen,
  onClose,
  t,
}) => {
  const { classes } = useStyles();

  const [img, setImg] = useState<any>(null);

  useEffect(() => {
    if (!isOpen) {
      _.delay(() => setImg(null), 1000);
    }
  }, [isOpen]);

  const SuggestedScheme = Yup.object().shape({
    name: Yup.string()
      .required('Name field is required')
      .min(2, 'Min length is 2')
      .max(20, 'Max length is 20')
      .trim(),
  });

  const handleChangeImg = (e: File[]) => {
    if (e[0]) {
      setImg({
        src: URL.createObjectURL(e[0]),
        alt: e[0].name,
      });
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent>
        <Formik
          initialValues={{ name: '' }}
          initialErrors={{ name: 'Not filled' }}
          validationSchema={SuggestedScheme}
          onSubmit={(values) => {
            onSubmit(values.name, img.src);
          }}
        >
          {({ submitForm, isValid }) => (
            <Form className={classes.root}>
              <Typography variant={'h2'}>
                {t('Register.Subject Step.Provide your own subject')}
              </Typography>
              <Field
                name={'name'}
                component={FormTextField}
                placeholder={t('Register.Subject Step.Enter a subject name')}
                type={'text'}
                className={classes.nameField}
              />
              <Box style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                {img ? (
                  <img src={img.src} alt={img.alt} height={100} style={{ marginBottom: 20 }} />
                ) : (
                  <ImageUploader
                    withIcon={true}
                    buttonText={t('Register.Subject Step.Choose images')}
                    onChange={handleChangeImg}
                    imgExtension={['.jpg', '.png']}
                    maxFileSize={5242880}
                    label={t('Register.Subject Step.Image uploader label')}
                    fileSizeError={'File is too large'}
                  />
                )}
              </Box>
              <Button
                variant={'contained'}
                disableElevation
                color={'primary'}
                disabled={!isValid || !img}
                onClick={submitForm}
              >
                {t('Common.Submit')}
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default withTranslation()(SuggestedSubjectModal);
