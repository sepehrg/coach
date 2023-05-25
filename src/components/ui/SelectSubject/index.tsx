import React from 'react';
import { Grid } from '@mui/material';

import useStyles from './SelectSubject.styles';
import { Subject } from 'entities/Subject';
import SubjectCard from 'components/ui/SubjectCard';

interface SelectSubjectProps {
  selectedSubject?: Subject | null;
  handleSelect: (subject: Subject) => void;
  subjects: Subject[];
}

const SelectSubject: React.FC<SelectSubjectProps> = ({
  selectedSubject,
  handleSelect,
  subjects,
}) => {
  const { classes } = useStyles();

  return (
    <>
      <Grid
        container
        direction={'column'}
        wrap={'nowrap'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Grid item container alignItems={'center'} justifyContent={'center'}>
          <Grid item container className={classes.subjectsContainer}>
            {subjects.map((item) => (
              <SubjectCard
                key={item.id}
                onChoose={() => handleSelect(item)}
                subject={item}
                isActive={item.id === selectedSubject?.id}
                cardStyles={classes.subjectCard}
              />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SelectSubject;
