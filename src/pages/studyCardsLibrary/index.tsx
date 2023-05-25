import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import { Grid } from '@mui/material';
import Library from './components/Library';
import useStyles from './StudyCards.styles';
import { useStudycardsActions } from 'store/studycards';
import LibraryEditMode from './components/LibraryEditMode';
import UnsortedLibrary from './components/UnsortedLibrary';

// Study Cards flow entry point & main page
const StudyCards = () => {
  const { classes } = useStyles();
  const { dispatchGetLibraryStudyCardSets, dispatchGetUnsorted, dispatchClearSetIndex } =
    useStudycardsActions();
  const [editMode, toggleEditMode] = useState<boolean>(false);
  const [isSelectedUnsorted, selectUnsorted] = useState<boolean>(false);

  const handleToggleEditMode = () => {
    toggleEditMode((prevState) => !prevState);
  };

  const renderLibrary = () => (
    <>
      {' '}
      {editMode ? (
        <LibraryEditMode toggleEditMode={handleToggleEditMode} />
      ) : (
        <Library toggleEditMode={handleToggleEditMode} />
      )}
    </>
  );

  useEffect(() => {
    isSelectedUnsorted && dispatchGetUnsorted();
  }, [isSelectedUnsorted, dispatchGetUnsorted]);

  useEffect(() => {
    dispatchGetLibraryStudyCardSets();
    dispatchClearSetIndex();
  }, [dispatchGetLibraryStudyCardSets, dispatchClearSetIndex]);

  return (
    <Grid container direction={'row'} wrap={'nowrap'}>
      <Grid item>
        <Sidebar
          isSelectedUnsorted={isSelectedUnsorted}
          selectUnsorted={() => selectUnsorted(true)}
          unselectUnsorted={() => selectUnsorted(false)}
        />
      </Grid>
      <div className={classes.container}>
        {isSelectedUnsorted ? <UnsortedLibrary /> : renderLibrary()}
      </div>
    </Grid>
  );
};

export default StudyCards;
