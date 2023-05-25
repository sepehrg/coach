import React, { useEffect } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import useStyles from './Recommendations.styles';
import MaterialsList from '../../materialsList';
import { useSelector } from 'react-redux';
import {
  materialsLinksSelector,
  materialsPageCountSelector,
} from 'store/materials/materials.selectors';
import { useMaterialActions } from 'store/materials';
import { selectedMainTagSelector } from 'store/tags/tags.selectors';
import { userGradeSelector } from 'store/auth/auth.selectors';
import { LikedMaterial } from 'entities/Material';
import { subjectsSelector } from 'store/subjects/subjects.selectors';

const Recommendations: React.FC<WithTranslation> = () => {
  const { classes } = useStyles();
  const materialsLinks = useSelector(materialsLinksSelector);
  const { selectedItem: selectedSubject } = useSelector(subjectsSelector);
  const { getMaterialsLinks, dispatchSelectMaterial, createHistory } = useMaterialActions();
  const selectedMainTag = useSelector(selectedMainTagSelector);
  const grade = useSelector(userGradeSelector);
  const pageCount = useSelector(materialsPageCountSelector);

  useEffect(() => {
    if (selectedMainTag && grade && selectedSubject)
      getMaterialsLinks({
        tagName: selectedMainTag,
        gradeId: grade.id,
        subjectId: selectedSubject.id,
        filterTag: '',
        relatedTags: true,
      });
  }, [getMaterialsLinks, selectedMainTag, selectedSubject, grade]);

  const handleSelectLink = (material: LikedMaterial, key: number) => {
    dispatchSelectMaterial(material, key);
    createHistory(material.id);
  };

  return (
    <Grid container spacing={4} className={classes.container}>
      <MaterialsList materials={materialsLinks} pageCount={pageCount} openLink={handleSelectLink} />
    </Grid>
  );
};

export default withTranslation()(Recommendations);
