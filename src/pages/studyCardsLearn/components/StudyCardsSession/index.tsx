import React, { useCallback, useEffect, useState } from 'react';
import { StudyCard } from 'entities/StudyCard';
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import {
  Check,
  Close,
  Edit,
  Favorite,
  FavoriteFilled,
  Rotate,
  Shaffle,
  Wrong,
} from 'assets/images/icons';
import useStyles from './StudyCardsSession.styles';
import useRouterActions from 'store/router';
import { useStudycardsActions } from 'store/studycards';
import ResultsFrame from '../ResultsFrame';
import ProgressBar from 'pages/dashboard/components/progressBar';
import HamburgerMenu from 'components/layout/Header/components/HamburgerMenu';
import { useLessonActions } from 'store/lessons';
import { useTagsActions } from 'store/tags';
import { useMaterialActions } from 'store/materials';
import { useSelector } from 'react-redux';
import { timerSelector } from 'store/studycards/studycards.selectors';
import StudyTools from 'pages/studyIndividual/components/studyTools';

interface StudyCardsSessionProps {
  cards: StudyCard[];
}

interface StudyCardsSessionProps {
  cards: StudyCard[];
  setTitle: string;
  subjectTitle: string;
  setId: string;
  onBackButton: () => void;
  reloadSet: () => void;
  isSetOwner?: boolean;
  withTimer: boolean;
}

const StudyCardsSession: React.FC<StudyCardsSessionProps> = (props) => {
  const {
    cards: cardsFromProps,
    setTitle,
    subjectTitle,
    setId,
    onBackButton,
    reloadSet,
    isSetOwner,
    withTimer,
  } = props;
  const { classes } = useStyles();

  const routerActions = useRouterActions();
  const { resetTags } = useTagsActions();
  const { resetMaterials } = useMaterialActions();
  const { clearSelected: clearSelectedLesson } = useLessonActions();

  const [currentCard, setCurrentCard] = useState<number>(0);
  const [cards, setCards] = useState<StudyCard[]>(cardsFromProps);
  const [animateFlip, toggleAnimateFlip] = useState<boolean>(false);
  const [animateSwipeLeft, toggleAnimateSwipeLeft] = useState<boolean>(false);
  const [animateSwipeRight, toggleAnimateSwipeRight] = useState<boolean>(false);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [sessionEnded, setSessionEnded] = useState<boolean>(false);
  const [cardSide, setCardSide] = useState<string>('question');
  const [showButtons, toggleShowButtons] = useState<boolean>(false);

  const timerRemaining = useSelector(timerSelector);

  const { navigateToStudyCardsEditSet } = useRouterActions();
  const { dispatchSetFavorite, dispatchRemoveFavorite, dispatchMarkCorrect, dispatchMarkWrong } =
    useStudycardsActions();

  const onEditButton = useCallback(() => {
    navigateToStudyCardsEditSet(setId);
  }, [navigateToStudyCardsEditSet, setId]);

  const onFlipButton = useCallback(() => {
    if (!showButtons) toggleShowButtons(true);
    toggleAnimateFlip(true);
    const timeoutForAnimation = setTimeout(() => {
      cardSide === 'question' ? setCardSide('answer') : setCardSide('question');
      toggleAnimateFlip(false);
    }, 400);
    return () => clearTimeout(timeoutForAnimation);
  }, [cardSide, showButtons]);

  const onFavoriteClick = useCallback(() => {
    cards[currentCard].isFavorite
      ? dispatchRemoveFavorite(cards[currentCard].studyCardId, () => {
          reloadSet();
        })
      : dispatchSetFavorite(cards[currentCard].studyCardId, () => {
          reloadSet();
        });
  }, [cards, currentCard, dispatchRemoveFavorite, dispatchSetFavorite, reloadSet]);

  const onWrongButton = useCallback(() => {
    dispatchMarkWrong(cards[currentCard].studyCardId, () => {
      toggleAnimateSwipeLeft(true);
      const timeoutForAnimation = setTimeout(() => {
        if (currentCard < cards.length - 1) setCurrentCard((prevState) => prevState + 1);
        if (currentCard === cards.length - 1) setSessionEnded(true);
        toggleAnimateSwipeLeft(false);
        setCardSide('question');
      }, 800);
      return () => clearTimeout(timeoutForAnimation);
    });
    toggleShowButtons(false);
  }, [cards, currentCard, dispatchMarkWrong]);

  const onCorrectButton = useCallback(() => {
    dispatchMarkCorrect(cards[currentCard].studyCardId, () => {
      toggleAnimateSwipeRight(true);
      const timeoutForAnimation = setTimeout(() => {
        if (currentCard < cards.length - 1) setCurrentCard((prevState) => prevState + 1);
        if (currentCard === cards.length - 1) setSessionEnded(true);
        toggleAnimateSwipeRight(false);
        setCardSide('question');
      }, 800);
      return () => clearTimeout(timeoutForAnimation);
    });
    toggleShowButtons(false);
    setCorrectAnswers((prevState) => prevState + 1);
  }, [cards, currentCard, dispatchMarkCorrect]);

  const shuffleArray = <T,>(array: T[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const onRandomize = useCallback(() => {
    const tempCardsArray = [...cards];
    const splicedItems = tempCardsArray.splice(0, currentCard + 1);
    const randomized = shuffleArray(tempCardsArray);
    const newCardsArray = splicedItems.concat(randomized);
    setCards(newCardsArray);
  }, [cards, currentCard]);

  const cardClassNames = useCallback(() => {
    if (animateFlip) return `${classes.card} ${classes.animationFlip}`;
    if (animateSwipeLeft) return `${classes.card} ${classes.animationLeft}`;
    if (animateSwipeRight) return `${classes.card} ${classes.animationRight}`;
    else return `${classes.card}`;
  }, [
    animateFlip,
    animateSwipeLeft,
    animateSwipeRight,
    classes.animationFlip,
    classes.animationLeft,
    classes.animationRight,
    classes.card,
  ]);

  const handleStopStudy = () => {
    clearSelectedLesson();
    resetMaterials();
    resetTags();
    routerActions.navigateToFocusTime();
  };

  const renderSession = useCallback(() => {
    return (
      <Grid container direction={'column'}>
        <Grid item className={classes.main}>
          <Grid
            container
            direction={'row'}
            wrap={'nowrap'}
            justifyContent={'space-between'}
            alignItems={'center'}
            className={classes.header}
          >
            <Grid item>
              <Grid container direction={'column'}>
                <Typography variant={'h5'}>{subjectTitle}</Typography>
                <Typography variant={'h1'}>{setTitle}</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <IconButton
                color={'primary'}
                className={classes.iconButton}
                onClick={() => {
                  onRandomize();
                }}
                size="large"
              >
                <img src={Shaffle} alt={'shuffle'} />
              </IconButton>
              <IconButton
                color={'primary'}
                className={classes.iconButton}
                onClick={onFavoriteClick}
                size="large"
              >
                <img
                  alt={'star'}
                  src={cards[currentCard]?.isFavorite ? FavoriteFilled : Favorite}
                />
              </IconButton>

              {isSetOwner && (
                <IconButton
                  color={'primary'}
                  className={classes.iconButton}
                  onClick={onEditButton}
                  size="large"
                >
                  <img alt={'pencil'} src={Edit} />
                </IconButton>
              )}

              <IconButton
                color={'primary'}
                className={classes.iconButton}
                onClick={onBackButton}
                size="large"
              >
                <img alt={'cross'} src={Close} className={classes.close} />
              </IconButton>
            </Grid>
          </Grid>

          <Grid
            container
            justifyContent={'center'}
            alignItems={'center'}
            direction={'column'}
            wrap={'nowrap'}
            className={classes.container}
          >
            <Grid container className={cardClassNames()}>
              <Box
                className={classes.cardText}
                dangerouslySetInnerHTML={{
                  __html:
                    cardSide === 'question'
                      ? cards[currentCard]?.question
                      : cards[currentCard]?.answer,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{ alignSelf: 'center' }}>
          <Grid
            container
            direction={'row'}
            justifyContent={'space-between'}
            className={classes.buttonsWrapper}
          >
            {showButtons && (
              <Button
                variant={'contained'}
                className={`${classes.cardButton} ${classes.red}`}
                onClick={onWrongButton}
                disableElevation
              >
                <img src={Wrong} alt={'cross'} />
              </Button>
            )}
            <Button
              variant={'contained'}
              color={'secondary'}
              className={`${classes.cardButton} ${classes.grey}`}
              disableElevation
              onClick={onFlipButton}
            >
              <img src={Rotate} alt={'turn'} />
            </Button>
            {showButtons && (
              <Button
                variant={'contained'}
                className={`${classes.cardButton} ${classes.green}`}
                disableElevation
                onClick={onCorrectButton}
              >
                <img src={Check} alt={'check mark'} />
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  }, [
    cardClassNames,
    cardSide,
    cards,
    classes.buttonsWrapper,
    classes.cardButton,
    classes.cardText,
    classes.close,
    classes.container,
    classes.green,
    classes.grey,
    classes.header,
    classes.iconButton,
    classes.main,
    classes.red,
    currentCard,
    isSetOwner,
    onBackButton,
    onCorrectButton,
    onEditButton,
    onFavoriteClick,
    onFlipButton,
    onRandomize,
    onWrongButton,
    setTitle,
    showButtons,
    subjectTitle,
  ]);

  useEffect(() => {
    setCards(cardsFromProps);
    renderSession();
  }, [cardsFromProps, renderSession]);

  return (
    <div>
      <Grid container>
        <Grid item>
          <HamburgerMenu />
        </Grid>
        <Grid item className={classes.progressBarWrapper}>
          <ProgressBar
            className={classes.progressBar}
            percent={Math.floor(((currentCard + 1) / cardsFromProps.length) * 100)}
          />
        </Grid>
        {withTimer && (
          <Grid item>
            <StudyTools
              onStopStudy={handleStopStudy}
              timerDuration={25 * 60}
              timerRemaining={timerRemaining}
              onFinishTimer={() => {
                return;
              }}
            />
          </Grid>
        )}
      </Grid>
      {sessionEnded ? (
        <ResultsFrame
          setTitle={setTitle}
          subjectTitle={subjectTitle}
          points={correctAnswers}
          onEndSession={onBackButton}
          cardsCount={cardsFromProps.length}
        />
      ) : (
        renderSession()
      )}
    </div>
  );
};

export default StudyCardsSession;
