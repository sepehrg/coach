import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { Subject } from 'entities/Subject';
import _ from 'lodash-es';
import useStyles from './SubjectList.styles';
import { withTranslation, WithTranslation } from 'react-i18next';

interface SubjectListProps {
  subjects: Subject[];
  selected: Subject[];
  toggleSelect: (subject: Subject) => void;
  toggleModal: () => void;
}

const SubjectList: React.FC<SubjectListProps & WithTranslation> = ({
  subjects,
  toggleSelect,
  selected,
  toggleModal,
  t,
}) => {
  const { classes } = useStyles();

  const subjectCards = () =>
    subjects.map((subject: Subject) => (
      <Box
        key={subject.id}
        className={`${classes.subjectBox} ${_.some(selected, subject) && classes.subjectBoxActive}`}
        onClick={() => toggleSelect(subject)}
      >
        <Typography variant={_.some(selected, subject) ? 'body2' : 'body1'}>
          {subject.name}
        </Typography>
      </Box>
    ));

  return (
    <Grid item container>
      {subjectCards()}
      <Box className={classes.subjectBox} onClick={toggleModal}>
        <Typography variant={'body1'}>{t('Register.Subject Step.More')}</Typography>
      </Box>
    </Grid>
  );
};

export default withTranslation()(SubjectList);
