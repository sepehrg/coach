import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import DiscoverSidebar from './components/DiscoverSidebar';
import DiscoverLibrary from './components/DiscoverLibraryPage';
import { useStudycardsActions } from 'store/studycards';
import useStyles from './StudyCardsDiscover.styles';

// Study Cards Discover branch

const StudyCardsDiscover = () => {
  const { classes } = useStyles();

  const { dispatchGetDiscoverStudyCardSets, dispatchClearSetIndex } = useStudycardsActions();

  useEffect(() => {
    dispatchGetDiscoverStudyCardSets();
    dispatchClearSetIndex();
  }, [dispatchGetDiscoverStudyCardSets, dispatchClearSetIndex]);

  return (
    <Grid container direction={'row'} wrap={'nowrap'}>
      <Grid item>
        <DiscoverSidebar />
      </Grid>
      <div className={classes.container}>
        <DiscoverLibrary />
      </div>
    </Grid>
  );
};

export default StudyCardsDiscover;
