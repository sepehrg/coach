import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import useStyles from './LearningHistory.styles';
import MaterialsList from '../../materialsList';
import { useSelector } from 'react-redux';
import { materialsHistorySelector, materialsSelector } from 'store/materials/materials.selectors';
import { useMaterialActions } from 'store/materials';
import { LikedMaterial } from 'entities/Material';
import { subjectsSelector } from 'store/subjects/subjects.selectors';

const LearningHistory: React.FC = () => {
  const { classes } = useStyles();
  const { page, historyPageCount } = useSelector(materialsSelector);
  const history = useSelector(materialsHistorySelector);
  const { selectedItem: selectedSubject } = useSelector(subjectsSelector);
  const { getHistory, dispatchSelectMaterial } = useMaterialActions();

  useEffect(() => {
    if (selectedSubject) getHistory(selectedSubject.id, page, 20);
  }, [getHistory, selectedSubject, page]);

  const handleSelectLink = (material: LikedMaterial, key: number) => {
    dispatchSelectMaterial(material, key);
  };

  return (
    <Grid container spacing={4} className={classes.container}>
      <MaterialsList materials={history} pageCount={historyPageCount} openLink={handleSelectLink} />
    </Grid>
  );
};

export default LearningHistory;
