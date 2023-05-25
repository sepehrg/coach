import React, { useState } from 'react';
import useStyles from './StudyCardsModal.style';
import { Box, Button, Dialog, DialogContent, Grid, IconButton } from '@mui/material';
import StudyCard from './studyCard';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useStudycardsActions } from 'store/studycards';
import { Rotate, ArrowLeft } from 'assets/images/icons';
import { PlusCircleOutlined } from '@ant-design/icons';
import i18n from 'translations/i18n';

interface StudyCardsModalProps {
  isOpen: boolean;
  closeAction: () => void;
}

const CardSchema = Yup.object().shape({
  question: Yup.string()
    .min(1, i18n.t('Validation.Common.Too Short') ?? '')
    .required(i18n.t('Validation.Common.Required') ?? ''),
  answer: Yup.string()
    .min(1, i18n.t('Validation.Common.Too Short') ?? '')
    .required(i18n.t('Validation.Common.Required') ?? ''),
});

const StudyCardsModal: React.FC<StudyCardsModalProps> = ({ isOpen, closeAction }) => {
  const { classes } = useStyles();
  const { dispatchCreateUnsorted } = useStudycardsActions();

  const [showQuestion, setShowQuestion] = useState<boolean>(true);

  const currentCard = 0;

  return (
    <Dialog
      PaperProps={{ className: classes.dialog }}
      BackdropProps={{
        className: classes.backdrop,
      }}
      classes={{
        paper: classes.paper,
      }}
      open={isOpen}
      onClose={closeAction}
    >
      <DialogContent className={classes.root}>
        <Formik
          initialValues={{
            question: '',
            answer: '',
          }}
          onSubmit={(values) => {
            dispatchCreateUnsorted(values.question, values.answer, () => {
              setShowQuestion(true);
              closeAction();
            });
          }}
          validationSchema={CardSchema}
        >
          {({ submitForm, isValid, setFieldValue, values }) => (
            <Form autoComplete={'off'}>
              <Grid container className={classes.container}>
                <Grid item className={classes.cardItem}>
                  {showQuestion ? (
                    <Box className={classes.question}>
                      <StudyCard
                        type="question"
                        value={{ question: values.question }}
                        onValueChange={(value) => setFieldValue('question', value.question)}
                        currentCard={currentCard}
                      />
                    </Box>
                  ) : (
                    <StudyCard
                      type="answer"
                      value={{ answer: values.answer }}
                      onValueChange={(value) => setFieldValue('answer', value.answer)}
                      currentCard={currentCard}
                    />
                  )}
                </Grid>
                <Grid item container className={classes.cardButtons}>
                  <Grid item>
                    {showQuestion && (
                      <Button
                        variant={'contained'}
                        color={'primary'}
                        startIcon={<img src={ArrowLeft} alt={'arrow left'} />}
                        disableElevation
                        onClick={closeAction}
                      ></Button>
                    )}
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={`${classes.cardButton} ${classes.grey}`}
                      disableElevation
                      onClick={() => setShowQuestion(!showQuestion)}
                    >
                      <img src={Rotate} alt="turn" />
                    </Button>
                    {!showQuestion && (
                      <IconButton
                        disableRipple
                        className={classes.plusBtn}
                        onClick={() => submitForm()}
                        disabled={!isValid}
                        size="large"
                      >
                        <PlusCircleOutlined />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default StudyCardsModal;
