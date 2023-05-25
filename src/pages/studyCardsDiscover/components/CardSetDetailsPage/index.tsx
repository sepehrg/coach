import React, { useEffect, useState } from 'react';
import { Box, Button, Checkbox, Grid, Typography } from '@mui/material';
import { Cards, LikeGrey, StudentIcon } from 'assets/images/icons';
import useStyles from './CardSetDetailsPage.styles';
import useRouterActions from 'store/router';
import { useSelector } from 'react-redux';
import { setDetailsSelector } from 'store/studycards/studycards.selectors';
import { useParams } from 'react-router-dom';
import { useStudycardsActions } from 'store/studycards';
import Loader from 'components/containers/Loader';
import { loadingActionSelector } from 'store/loader/loader.selectors';
import { GET_SET_REQUEST } from 'store/studycards/studycards.types';
import { StudyCard } from 'entities/StudyCard';
import ReportModal from '../ReportModal';
import CardSetSidebar from '../CardSetSidebar';
import CopySidebar from '../CopySidebar';
import { withTranslation, WithTranslation } from 'react-i18next';
import HamburgerMenu from 'components/layout/Header/components/HamburgerMenu';
import { ParamTypes } from 'pages/studyCardsCreate/components/CreateStudyCardsPage';

const CardSetDetailsPage: React.FC<WithTranslation> = ({ t }) => {
  const { classes, cx } = useStyles();
  const params = useParams<ParamTypes>();
  const id = params.id ?? '';
  const cardSet = useSelector(setDetailsSelector);
  const {
    dispatchGetSet,
    dispatchReportSet,
    dispatchCopySet,
    dispatchFollowSet,
    dispatchUnfollowSet,
    dispatchShareSet,
  } = useStudycardsActions();
  const { goBack, navigateToStudyCards } = useRouterActions();
  const loading = useSelector(loadingActionSelector)([GET_SET_REQUEST]);
  const [isOpenModal, toggleModal] = useState<boolean>(false);
  const [isCopyMode, setCopyMode] = useState<boolean>(false);
  const [copiedSet, setCopiedSet] = useState<StudyCard[]>([]);
  const shareLink = `https://educoach-fe.staging.educoachapp.de/study-cards-discover/${id}`;

  useEffect(() => {
    dispatchGetSet(id);
  }, [id, dispatchGetSet]);

  const onSubmitReport = (reason: string, comments?: string) => {
    dispatchReportSet(id, reason, () => toggleModal(false), comments);
  };

  const onCheckboxClick = (card: StudyCard) => {
    if (!copiedSet.includes(card)) {
      const newSet = [...copiedSet];
      newSet.push(card);
      setCopiedSet(newSet);
    }
    if (copiedSet.includes(card)) {
      const cardIndex = copiedSet.findIndex((item) => item.id === card.id);
      const newSet = [...copiedSet];
      newSet.splice(cardIndex, 1);
      setCopiedSet(newSet);
    }
  };

  const checkIfCardIsCopied = (card: StudyCard) => {
    return copiedSet.includes(card);
  };

  const onSaveCopied = () => {
    dispatchCopySet(id, copiedSet, () => navigateToStudyCards());
  };

  const onCopyAllCards = () => {
    if (!cardSet) return;
    setCopiedSet(cardSet.studyCards);
  };

  const cardWrapperClassName = `${
    isCopyMode
      ? `${classes.cardsWrapper} ${classes.cardsWrapperCopyMode}`
      : `${classes.cardsWrapper}`
  }`;

  const mainSidebarProps = {
    onFollowButton: () => dispatchFollowSet(id, () => dispatchGetSet(id)),
    onCopyButton: () => setCopyMode(true),
    onReportButton: () => toggleModal(true),
    onShareButton: () => {
      dispatchShareSet(id, () => {
        return;
      });
    },
    isFollowed: cardSet?.isFollowed,
    onUnfollowButton: () => dispatchUnfollowSet(id, () => dispatchGetSet(id)),
    shareLink,
    isOwner: cardSet?.isOwner,
  };

  return (
    <Loader loading={loading}>
      {cardSet && (
        <Grid container className={classes.container}>
          <Grid item>
            <HamburgerMenu />
          </Grid>
          <Grid item className={classes.content}>
            <Grid container className={classes.main} direction={'row'}>
              <Grid item>
                <Grid container className={classes.headerContainer}>
                  <Grid item>
                    <Grid
                      container
                      className={classes.header}
                      direction={'column'}
                      justifyContent={'center'}
                    >
                      {cardSet.subject && (
                        <Typography variant="h3" className={classes.subject}>
                          {cardSet.subject.name}
                        </Typography>
                      )}
                      <Typography variant="h1" className={classes.title}>
                        {cardSet.title}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid
                      direction={'row'}
                      container
                      alignItems={'center'}
                      justifyContent={'center'}
                    >
                      {isCopyMode ? (
                        <CopySidebar onSelectAll={onCopyAllCards} onSave={onSaveCopied} />
                      ) : (
                        <CardSetSidebar {...mainSidebarProps} />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.cardsWrapperItem}>
                <Grid className={cardWrapperClassName} container direction={'row'}>
                  {cardSet.studyCards.map((card: StudyCard) => {
                    return (
                      <Grid item className={classes.cardRow} key={card.id}>
                        {isCopyMode && (
                          <Checkbox
                            color={'primary'}
                            checked={checkIfCardIsCopied(card)}
                            onChange={() => onCheckboxClick(card)}
                          />
                        )}
                        <Grid container>
                          <Box
                            className={cx(classes.card, classes.leftCard)}
                            style={{ display: 'inline-block' }}
                            dangerouslySetInnerHTML={{ __html: card.question }}
                          />
                          <Box
                            className={classes.card}
                            dangerouslySetInnerHTML={{ __html: card.answer }}
                          />
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.footerItem}>
            <Grid
              direction={'row'}
              container
              className={classes.footer}
              wrap={'nowrap'}
              alignItems={'center'}
            >
              <Grid item>
                <Grid container direction={'row'} alignItems={'center'}>
                  <img
                    src={cardSet.owner.icon ? cardSet.owner.icon : StudentIcon}
                    alt={'author'}
                    className={classes.picture}
                  />
                  <Grid>
                    <Typography variant={'h3'} className={classes.created}>
                      {t('Study Cards.Discover.Created by')}
                    </Typography>
                    <Typography className={classes.creator} variant={'h2'}>
                      {cardSet.owner.firstName} {cardSet.owner.lastName}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction={'row'} wrap={'nowrap'} alignItems={'center'} spacing={8}>
                  <Grid item>
                    <Grid container direction={'row'} alignItems={'center'}>
                      <img src={Cards} className={classes.footerIcons} alt={'study cards number'} />
                      <Typography className={classes.number}>
                        {cardSet.studyCards.length}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction={'row'} alignItems={'center'}>
                      <img src={LikeGrey} className={classes.footerIcons} alt={'likes'} />
                      <Typography className={classes.number}>{cardSet.likesCount}</Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Button
                      className={classes.closeButton}
                      color={'primary'}
                      variant={isCopyMode ? 'outlined' : 'contained'}
                      disableElevation
                      onClick={goBack}
                    >
                      {t('Study Cards.Discover.Close set')}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
      <ReportModal
        isOpen={isOpenModal}
        onCancel={() => toggleModal(false)}
        onSubmit={onSubmitReport}
      />
    </Loader>
  );
};

export default withTranslation()(CardSetDetailsPage);
