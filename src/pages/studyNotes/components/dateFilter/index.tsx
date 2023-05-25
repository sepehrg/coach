import React from 'react';
import useStyles from './DateFilter.style';
import { Checkbox, Grid } from '@mui/material';
import { withTranslation, WithTranslation } from 'react-i18next';

interface DateFilterProps {
  height: number;
  onDateSelect: (id: number) => void;
}

interface Month {
  id: number;
  name: string;
}

const DateFilter: React.FC<DateFilterProps & WithTranslation> = ({ t }) => {
  const { classes } = useStyles();

  const months: Month[] = [
    { id: 1, name: t('Study Notes.Month.January') },
    { id: 2, name: t('Study Notes.Month.February') },
    { id: 3, name: t('Study Notes.Month.March') },
    { id: 4, name: t('Study Notes.Month.April') },
    { id: 5, name: t('Study Notes.Month.May') },
    { id: 6, name: t('Study Notes.Month.June') },
    { id: 7, name: t('Study Notes.Month.July') },
    { id: 8, name: t('Study Notes.Month.August') },
    { id: 9, name: t('Study Notes.Month.September') },
    { id: 10, name: t('Study Notes.Month.October') },
    { id: 11, name: t('Study Notes.Month.November') },
    { id: 12, name: t('Study Notes.Month.December') },
  ];

  return (
    <Grid container className={classes.list}>
      {months.map((month) => (
        <Grid item key={month.id} className={classes.noteItem}>
          <Checkbox classes={{ root: classes.checkboxRoot }} style={{ color: '#aaa' }}></Checkbox>
          {month.name}
        </Grid>
      ))}
    </Grid>
  );
};

export default withTranslation()(DateFilter);
