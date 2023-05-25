import React, { useState } from 'react';
import { Button, Grid, IconButton } from '@mui/material';
import useStyles from './StudyCardModal.styles';
import MathTextArea from 'components/ui/MathTextArea';
import { Calculator, TurnWhite } from 'assets/images/icons';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import i18n from 'translations/i18n';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useStudycardsActions } from 'store/studycards';

interface StudyCardModalProps {
  isOpen: boolean;
  toggle: () => void;
}

enum CardSides {
  QUESTION = 'question',
  ANSWER = 'answer',
}

const CardSchema = Yup.object().shape({
  question: Yup.string()
    .min(1, i18n.t('Validation.Common.Too Short').toString())
    .required(i18n.t('Validation.Common.Required').toString()),
  answer: Yup.string()
    .min(1, i18n.t('Validation.Common.Too Short').toString())
    .required(i18n.t('Validation.Common.Required').toString()),
});

const StudyCardModal: React.FC<StudyCardModalProps> = (props) => {
  const { classes } = useStyles();

  const { isOpen, toggle } = props;

  const [showMathPanel, toggleMathPanel] = useState<boolean>(false);
  const [animateFlip, toggleAnimateFlip] = useState<boolean>(false);
  const [currentSide, setCurrentSide] = useState<CardSides>(CardSides.QUESTION);

  const { dispatchCreateUnsorted } = useStudycardsActions();

  const cardClassName = `${
    showMathPanel ? `${classes.cardWrapper} ${classes.cardWrapperExtended}` : classes.cardWrapper
  }`;

  const onTurnButton = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    toggleAnimateFlip(true);
    const timeoutForAnimation = setTimeout(() => {
      setCurrentSide((prevState) =>
        prevState === CardSides.QUESTION ? CardSides.ANSWER : CardSides.QUESTION,
      );
      toggleAnimateFlip(false);
    }, 400);
    return () => clearTimeout(timeoutForAnimation);
  };

  return (
    <Formik
      initialValues={{ question: '', answer: '' }}
      validationSchema={CardSchema}
      onSubmit={(values, { resetForm }) => {
        dispatchCreateUnsorted(values.question, values.answer, () => {
          toggle();
        });
        resetForm();
      }}
    >
      {({ submitForm, isValid, values, setFieldValue }) => (
        <Form autoComplete={'off'}>
          <div className={isOpen ? classes.animationSlideIn : classes.animationSlideOut}>
            <Grid
              className={classes.container}
              container
              direction={'column'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Grid className={animateFlip ? `${classes.animationFlip}` : ''}>
                <Grid item className={cardClassName}>
                  <MathTextArea
                    currentCard={currentSide === CardSides.QUESTION ? 0 : 1}
                    content={currentSide === CardSides.QUESTION ? values.question : values.answer}
                    placeholder={`Write ${currentSide}...`}
                    onContentChange={(content: string) => {
                      setFieldValue(`${currentSide}`, content);
                    }}
                    showMathPanel={showMathPanel}
                  />
                  <IconButton
                    color={'primary'}
                    className={classes.calculatorBtn}
                    onClick={(event: React.SyntheticEvent) => {
                      event.stopPropagation();
                      toggleMathPanel(!showMathPanel);
                    }}
                    size="large"
                  >
                    <img src={Calculator} alt={'math keyboard'} />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid
                container
                direction={'row'}
                justifyContent={'space-between'}
                className={classes.buttonsWrapper}
              >
                <Button
                  variant={'contained'}
                  color={'secondary'}
                  className={classes.cardButton}
                  disableElevation
                  onClick={onTurnButton}
                >
                  <img src={TurnWhite} alt={'turn'} className={classes.turnIcon} />
                </Button>
                <Button
                  variant={'contained'}
                  className={classes.cardButton}
                  color={'secondary'}
                  disableElevation
                  onClick={(event: React.SyntheticEvent) => {
                    event.stopPropagation();
                    submitForm();
                  }}
                  disabled={!isValid}
                >
                  SAVE
                </Button>
              </Grid>
            </Grid>
          </div>
          {isOpen && (
            <Button
              className={classes.arrowButton}
              variant={'contained'}
              disableElevation
              onClick={toggle}
            >
              <ChevronRightIcon />
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default StudyCardModal;
