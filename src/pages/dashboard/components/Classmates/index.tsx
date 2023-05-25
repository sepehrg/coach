import React from 'react';
import { Grid, Typography } from '@mui/material';
import useStyles from './Classmates.styles';
import { Ido, NoClassmates, NoClassmatesDe } from 'assets/images';
import { useSelector } from 'react-redux';
import { classmatesSelector } from 'store/dashboard/dashboard.selectors';
import { WithTranslation, withTranslation } from 'react-i18next';
import { StudentIcon } from 'assets/images/icons';
import i18next from 'i18next';
import { RecentlyActiveStudent } from 'entities/Student';

const Classmates = ({ t }: WithTranslation) => {
  const { classes } = useStyles();
  const classmates = useSelector(classmatesSelector);

  const renderEmptyState = () => (
    <>
      <Grid item className={classes.studentWrapper}>
        <div className={classes.idoWrapper}>
          <img src={Ido} className={classes.ido} alt={'robot Ido'} />
        </div>
        <Typography className={classes.name}>Ido</Typography>
      </Grid>
      <img
        src={i18next.language === 'de' ? NoClassmatesDe : NoClassmates}
        className={classes.emptyText}
        alt={'you have no classmates yet'}
      />
    </>
  );

  const renderClassmates = () => {
    return (
      <Grid container direction="row" className={classes.classmatesWrapper}>
        {classmates?.map((student: RecentlyActiveStudent) => {
          return (
            <Grid item className={classes.studentWrapper} key={student.firstName}>
              <div>
                <img
                  src={student.icon ? student.icon : StudentIcon}
                  className={classes.studentImg}
                  alt={'student avatar'}
                />
              </div>
              <Typography className={classes.name}>{student.firstName}</Typography>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  return (
    <Grid className={classes.container} container item direction={'row'} wrap={'nowrap'}>
      <Typography variant={'h3'} className={classes.title}>
        {t('Dashboard.Classmates')}
      </Typography>
      {classmates?.length ? renderClassmates() : renderEmptyState()}
    </Grid>
  );
};

export default withTranslation()(Classmates);
