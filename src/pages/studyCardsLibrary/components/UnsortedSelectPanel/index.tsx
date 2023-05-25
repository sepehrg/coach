import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, FormControl, InputLabel } from '@mui/material';
import { Field, useField } from 'formik';
import FormSelectField from 'components/ui/FormSelectField';
import { StudyCardsSubject } from 'entities/Subject';
import MenuItem from '@mui/material/MenuItem';
import useStyles from './UnsortedSelectPanel.styles';
import { useSelector } from 'react-redux';
import { useStudycardsActions } from 'store/studycards';
import { setsSelector, setsSubjectsSelector } from 'store/studycards/studycards.selectors';
import { StudyCardSet } from 'entities/StudyCardSet';
import { UnsortedStudyCard } from 'entities/StudyCard';
import { ownedByMeSets } from 'utils/filterStudyCardSets';
import { WithTranslation, withTranslation } from 'react-i18next';

interface UnsortedSelectPanelProps {
  card: UnsortedStudyCard;
  submitForm: () => void;
}

const UnsortedSelectPanel: React.FC<UnsortedSelectPanelProps & WithTranslation> = (props) => {
  const { classes } = useStyles();
  const { submitForm, card, t } = props;
  const subjects = useSelector(setsSubjectsSelector);
  const sets = useSelector(setsSelector);
  const [filteredSets, setFilteredSets] = useState<StudyCardSet[] | null>(null);
  const { dispatchGetLibrarySetsBySubject, dispatchLinkUnsorted } = useStudycardsActions();
  const [{ value: subject }] = useField('subject');
  const [{ value: studyCardSet }] = useField('studyCardSet');

  useEffect(() => {
    subject && dispatchGetLibrarySetsBySubject({ id: subject, name: '', icon: '' }, '', 1, 100);
  }, [subject, dispatchGetLibrarySetsBySubject]);

  useEffect(() => {
    if (!sets) return;
    sets && setFilteredSets(ownedByMeSets(sets));
  }, [sets]);

  const onSave = () => {
    dispatchLinkUnsorted(studyCardSet, card, () => {
      return;
    });
    submitForm();
  };

  return (
    <Grid direction={'row'} container className={classes.itemWrapper}>
      <FormControl className={classes.selectWrapper}>
        <InputLabel
          id="select-label"
          shrink={true}
          classes={{
            root: classes.label,
            focused: classes.focusedLabel,
            shrink: classes.shrinkLabel,
          }}
        >
          {t('Study Cards.Library.Subject')}
        </InputLabel>
        <Field
          component={FormSelectField}
          name={'subject'}
          className={classes.selectWrapper}
          classes={{
            root: classes.selectRoot,
          }}
        >
          {subjects?.map((item: StudyCardsSubject) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Field>
      </FormControl>
      <FormControl className={classes.selectWrapper}>
        <InputLabel
          id="select-label"
          shrink={true}
          classes={{
            root: classes.label,
            focused: classes.focusedLabel,
            shrink: classes.shrinkLabel,
          }}
        >
          {t('Study Cards.Library.Study Card Set')}
        </InputLabel>
        <Field
          component={FormSelectField}
          name={'studyCardSet'}
          className={classes.selectWrapper}
          classes={{
            root: classes.selectRoot,
          }}
        >
          {filteredSets?.map((item: StudyCardSet) => (
            <MenuItem key={item.id} value={item.id}>
              {item.title}
            </MenuItem>
          ))}
        </Field>
      </FormControl>
      <Button
        variant={'contained'}
        color={'primary'}
        className={classes.saveButton}
        onClick={onSave}
        disableElevation
      >
        {t('Study Cards.Library.Save')}
      </Button>
    </Grid>
  );
};

export default withTranslation()(UnsortedSelectPanel);
