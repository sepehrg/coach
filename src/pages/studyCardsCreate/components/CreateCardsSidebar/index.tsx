import React, { useEffect } from 'react';
import { Box, Button, Grid } from '@mui/material';
import useStyles from './CreateCardsSidebar.styles';
import { useField } from 'formik';
import { StudyCard } from 'entities/StudyCard';
import HamburgerMenu from 'components/layout/Header/components/HamburgerMenu';
import { Add } from 'assets/images/icons';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { WithTranslation, withTranslation } from 'react-i18next';

interface SidebarProps {
  currentCard: number;
  setCurrentCard: (card: number) => void;
}

const CreateCardsSidebar: React.FC<SidebarProps & WithTranslation> = ({
  currentCard,
  setCurrentCard,
  t,
}) => {
  const { classes } = useStyles();
  const [{ value: studyCards }, , { setValue: setStudyCards }] =
    useField<Partial<StudyCard>[]>('studyCards');

  useEffect(() => {
    if (studyCards.length === 0) setCurrentCard(-1);
  }, [studyCards, setCurrentCard]);

  const onDeleteCard = () => {
    const tempValues = [...studyCards] as StudyCard[];
    tempValues.splice(currentCard, 1);
    setStudyCards(tempValues);
  };

  function htmlToText(htmlString?: string) {
    if (!htmlString) return;
    const el = document.createElement('div');
    el.innerHTML = htmlString;
    return el.textContent;
  }

  const onAddCardButtonClick = () => {
    const newValue = [...studyCards];
    newValue.unshift({
      question: '',
      answer: '',
      questionIsDrawing: false,
      answerIsDrawing: false,
    });
    setStudyCards(newValue);
    setCurrentCard(0);
  };

  const renderCards = () => {
    return (
      <>
        {studyCards.map((card: Partial<StudyCard>, index: number) => {
          const isActive = currentCard === index;

          const renderQuestion = () => {
            const isHTML = RegExp.prototype.test.bind(/(<([^>]+))/i);
            const question = card.question?.replace('&nbsp;', ' ') ?? '';
            const firstCharacters = question.slice(0, 10) || '';

            if (question.length > 10 && isHTML(firstCharacters)) {
              return <Box>{`${htmlToText(studyCards[index]?.question)?.slice(0, 1)}...`}</Box>;
            }
            if (question.length > 10) {
              return `${question.slice(0, 10)}...`;
            }
            return question;
          };

          return (
            <Button
              key={index}
              className={`${classes.addCardBtn} ${isActive && classes.sidebarCardActive}`}
              onClick={() => setCurrentCard(index)}
            >
              <div className={classes.cardText}>{renderQuestion()}</div>
              {isActive && (
                <Box onClick={onDeleteCard} className={classes.deleteButton}>
                  <HighlightOffIcon color={'primary'} />
                </Box>
              )}
            </Button>
          );
        })}
      </>
    );
  };

  return (
    <Grid container className={classes.container}>
      <Grid item className={classes.menu}>
        <HamburgerMenu />
      </Grid>
      <div className={classes.subjectsContainerWrapper}>
        <Grid container direction={'column'} wrap={'nowrap'} className={classes.subjectsContainer}>
          <Grid item className={classes.addCardItem}>
            <Button
              className={classes.addCardBtn}
              classes={{ text: classes.label }}
              onClick={onAddCardButtonClick}
            >
              <img src={Add} className={classes.addIcon} alt="add" />
              {t('Study Cards.Create.Add card')}
            </Button>
          </Grid>
          <Grid item container className={classes.cardsWrapper}>
            {renderCards()}
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};

export default withTranslation()(CreateCardsSidebar);
