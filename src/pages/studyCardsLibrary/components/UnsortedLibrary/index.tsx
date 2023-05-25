import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Form, Formik } from 'formik';
import i18next from 'i18next';

import { unsortedCardsSelector } from 'store/studycards/studycards.selectors';
import { UnsortedStudyCard } from 'entities/StudyCard';
import { BaseSubject } from 'entities/Subject';
import useStyles from './UnsortedLibrary.styles';
import { useStudycardsActions } from 'store/studycards';
import UnsortedSelectPanel from '../UnsortedSelectPanel';
import Loader from 'components/containers/Loader';
import { loadingActionSelector } from 'store/loader/loader.selectors';
import { GET_UNSORTED_CARDS_REQUEST } from 'store/studycards/studycards.types';
import { NoUnsortedDe, NoUnsortedEn } from 'assets/images';

const UnsortedLibrary = () => {
  const [selectedSubject] = useState<BaseSubject>();

  const unsortedCards = useSelector(unsortedCardsSelector);
  const loading = useSelector(loadingActionSelector)([GET_UNSORTED_CARDS_REQUEST]);

  const { dispatchGetLibrarySetsBySubject, dispatchGetLibraryStudyCardSets, dispatchGetUnsorted } =
    useStudycardsActions();

  const { classes } = useStyles();

  useEffect(() => {
    dispatchGetLibraryStudyCardSets();
  }, [dispatchGetLibraryStudyCardSets]);

  useEffect(() => {
    if (selectedSubject) {
      dispatchGetLibrarySetsBySubject(selectedSubject, '', 1, 100);
    }
  }, [dispatchGetLibrarySetsBySubject, selectedSubject]);

  const renderEmptyState = () => {
    const EmptyState = i18next.language === 'de' ? NoUnsortedDe : NoUnsortedEn;
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        className={classes.emptyContainer}
      >
        <img src={EmptyState} alt={'no unsorted cards'} className={classes.emptyImage} />
      </Grid>
    );
  };

  const renderUnsortedItem = useCallback(
    (card: UnsortedStudyCard) => {
      return (
        <Formik
          key={card.id}
          validateOnBlur={false}
          validateOnChange={true}
          initialValues={{
            subject: '',
            studyCardSet: '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            dispatchGetUnsorted();
            dispatchGetLibraryStudyCardSets();
          }}
        >
          {({ submitForm }) => (
            <Form autoComplete={'off'}>
              <Grid container className={classes.cardsContainer}>
                <Grid item className={classes.cards}>
                  <Grid container item direction={'column'}>
                    <Box
                      className={classes.card}
                      dangerouslySetInnerHTML={{ __html: card.question }}
                    />
                    <Box className={classes.separator}></Box>
                    <Box
                      className={classes.card}
                      dangerouslySetInnerHTML={{ __html: card.answer }}
                    />
                  </Grid>
                </Grid>
                <Grid item className={classes.panel}>
                  <UnsortedSelectPanel card={card} submitForm={submitForm} />
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      );
    },
    [
      classes.card,
      classes.cards,
      classes.cardsContainer,
      classes.panel,
      classes.separator,
      dispatchGetLibraryStudyCardSets,
      dispatchGetUnsorted,
    ],
  );

  const renderCards = useCallback(() => {
    return (
      <>
        {unsortedCards?.map((card) => {
          return renderUnsortedItem(card);
        })}
      </>
    );
  }, [unsortedCards, renderUnsortedItem]);

  useEffect(() => {
    renderCards();
  }, [renderCards]);

  return (
    <Loader loading={loading}>
      <div className={classes.root}>
        <div className={classes.title}>
          <Typography className={classes.header}>Unsortierte Karteikarten</Typography>
        </div>
        <div className={classes.container}>
          {unsortedCards?.length ? renderCards() : renderEmptyState()}
        </div>
      </div>
    </Loader>
  );
};

export default UnsortedLibrary;
