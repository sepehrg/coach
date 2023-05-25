import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useStudycardsActions } from 'store/studycards';
import { useSelector } from 'react-redux';
import {
  learningSetOverviewSelector,
  sessionCardsSelector,
} from 'store/studycards/studycards.selectors';
import StudyCardsSession from './components/StudyCardsSession';
import SessionOverview from './components/SessionOverview';
import { ParamTypes } from 'pages/studyCardsCreate/components/CreateStudyCardsPage';
import { LearningSetOverview } from 'entities/StudyCardSet';

type StateFromHistory = {
  subjectTitle: string;
  setTitle: string;
  withTimer: boolean;
};

// Study Cards - Study Card Set branch - when user clicks on 'Study' button on the card set

const StudyCardsLearn = () => {
  const { state: stateFromHistory } = useLocation() as { state: StateFromHistory };
  const params = useParams<ParamTypes>();
  const id = params.id ?? '';
  const set = useSelector(learningSetOverviewSelector);

  const { dispatchGetLearningSet, dispatchGetSessionCardsAll, dispatchGetSessionCardsByLevel } =
    useStudycardsActions();
  const cards = useSelector(sessionCardsSelector);

  const [sessionStarted, setSessionStarted] = useState<boolean>(false);
  const [selectedLevel, setSelectedLevel] = useState<keyof LearningSetOverview | null>(null);
  const [maxCards, setMaxCards] = useState<number>(10);

  const onLevelSelect = (level: keyof LearningSetOverview) => {
    setSelectedLevel(level);
    dispatchGetSessionCardsByLevel(
      id,
      level,
      () => {
        setSessionStarted(true);
      },
      maxCards,
    );
  };

  const onStartSession = () => {
    dispatchGetSessionCardsAll(
      id,
      () => {
        setSessionStarted(true);
      },
      maxCards,
    );
  };

  const onGetSetOverview = useCallback(() => {
    dispatchGetLearningSet(id);
  }, [dispatchGetLearningSet, id]);

  useEffect(() => {
    onGetSetOverview();
  }, [onGetSetOverview]);

  const onReloadSet = () => {
    selectedLevel
      ? dispatchGetSessionCardsByLevel(
          id,
          selectedLevel,
          () => {
            return;
          },
          maxCards,
        )
      : dispatchGetSessionCardsAll(
          id,
          () => {
            return;
          },
          maxCards,
        );
  };

  return (
    <>
      {sessionStarted ? (
        <StudyCardsSession
          cards={cards ?? []}
          setId={id}
          isSetOwner={set?.isOwner}
          setTitle={stateFromHistory.setTitle}
          onBackButton={() => {
            onGetSetOverview();
            setSessionStarted(false);
          }}
          reloadSet={onReloadSet}
          subjectTitle={stateFromHistory.subjectTitle}
          withTimer={stateFromHistory.withTimer}
        />
      ) : (
        <SessionOverview
          set={set}
          onChangeSettings={(maxCards: number) => {
            setMaxCards(maxCards);
          }}
          maxCards={maxCards}
          subjectTitle={stateFromHistory.subjectTitle}
          setTitle={stateFromHistory.setTitle}
          onLevelSelect={onLevelSelect}
          onStartSession={onStartSession}
        />
      )}
    </>
  );
};

export default StudyCardsLearn;
