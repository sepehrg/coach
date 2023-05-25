import React, { useState } from 'react';
import { Box, Grid, IconButton } from '@mui/material';
import useStyles from './MainSection.styles';
import { Calculator, Fingerprint } from 'assets/images/icons';
import { useField } from 'formik';
import MathTextArea from 'components/ui/MathTextArea';
import { StudyCard } from 'entities/StudyCard';
import { WithTranslation, withTranslation } from 'react-i18next';
import { PlusCircleOutlined } from '@ant-design/icons';
import DrawingCanvas from 'components/ui/DrawingCanvas';

interface MainSectionProps {
  currentCard: number;
  setCurrentCard: (card: number) => void;
}

const MainSection: React.FC<MainSectionProps & WithTranslation> = (props) => {
  const { classes } = useStyles();
  const { currentCard, setCurrentCard, t } = props;
  const [showMathPanel, toggleMathPanel] = useState('');
  const [showQuestionCanvas, setShowQuestionCanvas] = useState<boolean>(false);
  const [showAnswerCanvas, setShowAnswerCanvas] = useState<boolean>(false);
  const [animateCards, toggleAnimateCards] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [drawingQuestion, setDrawingQuestion] = useState<boolean>(false);
  const [drawingAnswer, setDrawingAnswer] = useState<boolean>(false);
  const [{ value }, , { setValue }] = useField<Partial<StudyCard>[]>('studyCards');

  const onAddCardButtonClick = () => {
    toggleMathPanel('');
    toggleAnimateCards(true);
    const timeoutForAnimation = setTimeout(() => {
      if (currentCard === -1) {
        let newValue = [];
        newValue = [
          { question, answer, questionIsDrawing: drawingQuestion, answerIsDrawing: drawingAnswer },
          ...value,
        ];
        setValue(newValue);
      }
      setQuestion('');
      setAnswer('');
      setDrawingQuestion(false);
      setDrawingAnswer(false);
      setShowQuestionCanvas(false);
      setShowAnswerCanvas(false);
      setCurrentCard(-2);
      setCurrentCard(-1);
      toggleAnimateCards(false);
    }, 2000);
    return () => clearTimeout(timeoutForAnimation);
  };

  const onQuestionChange = (content: string) => {
    if (!value[currentCard]) return;
    setValue([
      ...value.slice(0, currentCard),
      { ...value[currentCard], question: content },
      ...value.slice(currentCard + 1),
    ]);
  };

  const onAnswerChange = (content: string) => {
    if (!value[currentCard]) return;
    setValue([
      ...value.slice(0, currentCard),
      { ...value[currentCard], answer: content },
      ...value.slice(currentCard + 1),
    ]);
  };

  const questionCardClassName = `${
    showMathPanel === 'question'
      ? `${classes.cardWrapper} ${classes.cardWrapperExtended}`
      : classes.cardWrapper
  }`;
  const answerCardClassName = `${
    showMathPanel === 'answer'
      ? `${classes.cardWrapper} ${classes.cardWrapperExtended}`
      : classes.cardWrapper
  }`;

  return (
    <Box className={classes.root}>
      <Box className={classes.containerWrapper}>
        <Grid
          container
          className={classes.container}
          alignItems={'center'}
          direction={'column'}
          justifyContent={'center'}
        >
          <Grid container direction={'row'} alignItems={'center'} justifyContent={'center'}>
            <Grid className={animateCards ? classes.leftCardAnimation : ''}>
              <Grid item className={questionCardClassName}>
                {showQuestionCanvas ? (
                  <DrawingCanvas
                    currentCard={currentCard}
                    content={question}
                    onContentChange={currentCard === -1 ? setQuestion : onQuestionChange}
                    toggleDrawing={() => setDrawingQuestion(!showQuestionCanvas)}
                    canvasId="question"
                  />
                ) : (
                  <MathTextArea
                    currentCard={currentCard}
                    content={currentCard === -1 ? question : value[currentCard]?.question || ''}
                    placeholder={t('Study Cards.Create.Write question')}
                    onContentChange={currentCard === -1 ? setQuestion : onQuestionChange}
                    showMathPanel={showMathPanel === 'question'}
                  />
                )}
                {!(showQuestionCanvas || value[currentCard]?.questionIsDrawing || false) && (
                  <IconButton
                    className={classes.calculatorBtn}
                    onClick={() =>
                      toggleMathPanel((prevState) => (prevState.length ? '' : 'question'))
                    }
                    size="large"
                  >
                    <img src={Calculator} alt={'math keyboard'} />
                  </IconButton>
                )}
                <IconButton
                  className={classes.drawBtn}
                  onClick={() => {
                    toggleMathPanel('');
                    setShowQuestionCanvas(!showQuestionCanvas);
                    setDrawingQuestion(!showQuestionCanvas);
                  }}
                  size="large"
                >
                  <img src={Fingerprint} alt={'draw'} />
                </IconButton>
              </Grid>
            </Grid>
            <Grid className={animateCards ? classes.rightCardAnimation : ''}>
              <Grid item className={answerCardClassName}>
                {showAnswerCanvas ? (
                  <DrawingCanvas
                    currentCard={currentCard}
                    content={answer}
                    onContentChange={currentCard === -1 ? setAnswer : onAnswerChange}
                    toggleDrawing={() => setDrawingAnswer(!showAnswerCanvas)}
                    canvasId="answer"
                  />
                ) : (
                  <MathTextArea
                    currentCard={currentCard}
                    content={currentCard === -1 ? answer : value[currentCard]?.answer || ''}
                    placeholder={t('Study Cards.Create.Write answer')}
                    onContentChange={currentCard === -1 ? setAnswer : onAnswerChange}
                    showMathPanel={showMathPanel === 'answer'}
                  />
                )}
                {!(showAnswerCanvas || value[currentCard]?.answerIsDrawing || false) && (
                  <IconButton
                    className={classes.calculatorBtn}
                    onClick={() =>
                      toggleMathPanel((prevState) => (prevState.length ? '' : 'answer'))
                    }
                    size="large"
                  >
                    <img src={Calculator} alt={'math keyboard'} />
                  </IconButton>
                )}
                <IconButton
                  className={classes.drawBtn}
                  onClick={() => {
                    toggleMathPanel('');
                    setShowAnswerCanvas(!showAnswerCanvas);
                    setDrawingAnswer(!showAnswerCanvas);
                  }}
                  size="large"
                >
                  <img src={Fingerprint} alt={'draw'} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <IconButton
              disableRipple
              className={classes.plusBtn}
              onClick={onAddCardButtonClick}
              size="large"
            >
              <PlusCircleOutlined />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default withTranslation()(MainSection);
