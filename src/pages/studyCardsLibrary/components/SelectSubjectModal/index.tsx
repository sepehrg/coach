import React, { useEffect, useState } from 'react';
import useStyles from './SelectSubjectModal.styles';
import { Dialog, DialogContent, Grid, MenuItem, Select } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { withTranslation, WithTranslation } from 'react-i18next';
import { subjectsSelector } from 'store/subjects/subjects.selectors';
import { BaseSubject, Subject } from 'entities/Subject';
import { newSetSubjectSelector } from 'store/studycards/studycards.selectors';
import { useSubjectsActions } from 'store/subjects';
import { IdoBasic } from 'assets/images';
import { profileSelector } from 'store/auth/auth.selectors';
import _ from 'lodash-es';

interface SelectSubjectModalProps {
  isOpen: boolean;
  closeAction: () => void;
  submitAction: (subjectId: string) => void;
}

const SelectSubjectModal: React.FC<SelectSubjectModalProps & WithTranslation> = ({
  isOpen,
  closeAction,
  submitAction,
  t,
}) => {
  const { classes } = useStyles();
  const selectedSubject = useSelector(newSetSubjectSelector);
  const { data: subjects } = useSelector(subjectsSelector);
  const profile = useSelector(profileSelector);
  const { get: getSubjects } = useSubjectsActions();

  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);

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

  const selectSubjectHandler = (e: any) => {
    submitAction(e.target.value);
  };

  return (
    <Dialog
      PaperProps={{ className: classes.dialog }}
      BackdropProps={{
        className: classes.backdrop,
      }}
      open={isOpen}
      onClose={closeAction}
    >
      <DialogContent className={classes.root}>
        <Typography variant={'h2'} className={classes.title}>
          {t('Study Cards.Create.Choose subject')}
        </Typography>
        <Grid container className={classes.content}>
          <Select
            className={classes.subject}
            value={selectedSubject || ''}
            onChange={selectSubjectHandler}
          >
            {filteredSubjects?.map((item: BaseSubject) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          <img src={IdoBasic} className={classes.ido} alt="Ido" width={155} />
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default withTranslation()(SelectSubjectModal);
