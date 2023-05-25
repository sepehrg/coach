import React, { useEffect, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import useStyles from './Search.styles';
import HamburgerMenu from 'components/layout/Header/components/HamburgerMenu';
import { CrossCircle } from 'assets/images/icons';
import { selectedMaterialSelector } from 'store/materials/materials.selectors';
import MaterialFrame from 'pages/study/components/MaterialFrame';
import TabTools from 'pages/studyIndividual/components/tabTools';
import { useMaterialActions } from 'store/materials';
import Recommendations from '../studyIndividual/components/studyTabs/recommendations';
import { subjectsSelector } from 'store/subjects/subjects.selectors';
import SelectSubject from 'components/ui/SelectSubject';
import { Subject } from 'entities/Subject';
import { useSubjectsActions } from 'store/subjects';
import { profileSelector } from 'store/auth/auth.selectors';
import _ from 'lodash-es';
import { useTagsActions } from 'store/tags';
import { MaterialLearningTypes } from 'entities/Material';

const Search: React.FC<WithTranslation> = ({ t }) => {
  const { classes } = useStyles();

  const selectedMaterial = useSelector(selectedMaterialSelector);
  const { selectedItem: selectedSubject } = useSelector(subjectsSelector);
  const { data: subjects } = useSelector(subjectsSelector);
  const profile = useSelector(profileSelector);
  const { dispatchClearSelectedMaterial, resetMaterials, filterMaterials } = useMaterialActions();
  const { get: getSubjects, selectItem } = useSubjectsActions();
  const { resetTags } = useTagsActions();
  const [input, setInput] = useState<string>('');
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    return () => {
      resetMaterials();
      resetTags();
    };
  }, [resetMaterials, resetTags]);

  useEffect(() => {
    getSubjects();
  }, [getSubjects]);

  useEffect(() => {
    if (!_.isEmpty(subjects))
      setFilteredSubjects(
        subjects
          .filter((subject) => (profile?.native ? subject.native : subject.nonnative))
          .map((subject) => ({ ...subject, name: t(`Study.Subjects.${subject.name}`) })),
      );
  }, [subjects, profile, t]);

  useEffect(() => {
    if (!_.isEmpty(filteredSubjects)) selectItem(filteredSubjects[0]);
  }, [filteredSubjects, selectItem]);

  return (
    <Grid container justifyContent={'center'} direction="column">
      <Grid item container justifyContent={'space-between'} alignItems={'center'} direction={'row'}>
        <Grid container direction={'row'} className={classes.topWrapper}>
          <Grid item>
            <HamburgerMenu />
          </Grid>
          <Grid item className={classes.search}>
            <TabTools
              tab={1}
              input={input}
              onInputChange={setInput}
              onTabChange={(tab: MaterialLearningTypes | null) => filterMaterials(tab)}
              createCardActive={false}
            />
          </Grid>
          <Grid item style={{ flexGrow: 1 }}>
            <SelectSubject
              selectedSubject={selectedSubject}
              handleSelect={(item: Subject) => {
                selectItem(item);
              }}
              subjects={filteredSubjects}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        {!selectedMaterial ? (
          <Recommendations />
        ) : (
          <Box className={classes.frame}>
            <MaterialFrame url={selectedMaterial.material.link} />
            <Button
              disableElevation
              className={classes.closeButton}
              onClick={dispatchClearSelectedMaterial}
            >
              <img src={CrossCircle} alt="close" />
            </Button>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default withTranslation()(Search);
