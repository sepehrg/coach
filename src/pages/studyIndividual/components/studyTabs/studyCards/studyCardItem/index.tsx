import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import useStyles from './StudyCardItem.styles';
import { StudyCardSet } from 'entities/StudyCardSet';
import useRouterActions from 'store/router';

interface StudyCardItemProps {
  studyCardSet?: StudyCardSet;
  createCardActive: boolean;
  setCreateCardActive: (state: boolean) => void;
}

const StudyCardItem: React.FC<StudyCardItemProps> = ({
  studyCardSet,
  createCardActive,
  setCreateCardActive,
}) => {
  const { classes, cx } = useStyles();

  const { navigateToLearningSet } = useRouterActions();

  const navigate = () => {
    if (studyCardSet)
      navigateToLearningSet(
        studyCardSet.id,
        studyCardSet.title,
        studyCardSet.subject?.name ? studyCardSet.subject.name : '',
        true,
      );
    else {
      setCreateCardActive(!createCardActive);
    }
  };

  const renderTags = () => {
    return studyCardSet?.studyCardTags.map((currentTag, index) => {
      return (
        <Grid item key={index}>
          <Typography variant={'body2'} className={classes.tag}>
            #{currentTag.name}
          </Typography>
        </Grid>
      );
    });
  };

  return (
    <button onClick={navigate} className={classes.button}>
      <Grid item className={classes.itemWrapper}>
        <Grid container className={classes.card}>
          <Grid item className={cx(classes.coverImage, !studyCardSet && classes.addCoverImage)}>
            <Box className={cx(classes.cardCount, !studyCardSet && classes.addCardPlus)}>
              <Typography className={cx(classes.number, !studyCardSet && classes.plus)}>
                {studyCardSet ? studyCardSet.studyCards : '+'}
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Typography className={classes.title}>
              {studyCardSet ? studyCardSet.title : 'Neues Deck erstellen'}
            </Typography>
          </Grid>
          {studyCardSet && (
            <Grid item className={classes.tags}>
              <Grid container>{renderTags()}</Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </button>
  );
};

export default StudyCardItem;
