import React from 'react';
import useStyles from 'components/containers/Calendar/CalendarHeader/CalendarHeader.styles';
import { Grid } from '@mui/material';
import IconButton from 'components/ui/IconButton';
import * as Assets from 'pages/studyDiary/assets';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import 'moment/locale/de';
import { withTranslation, WithTranslation } from 'react-i18next';
import i18next from 'i18next';

interface CalendarHeaderProps {
  selectDate: Date;
  nextMonthAction: () => void;
  previousMonthAction: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps & WithTranslation> = ({
  selectDate,
  nextMonthAction,
  previousMonthAction,
  t,
}) => {
  const { classes } = useStyles();

  return (
    <Grid
      className={classes.root}
      container
      direction={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Grid item>
        <IconButton action={previousMonthAction} outerClass={classes.button}>
          <img src={Assets.LeftArrow} alt="Left Arrow" className={classes.arrowImg} />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton action={nextMonthAction} outerClass={classes.button}>
          <img src={Assets.RightArrow} alt="Left Arrow" className={classes.arrowImg} />
        </IconButton>
      </Grid>
      <Grid item className={classes.monthBox}>
        <Typography variant={'h3'}>
          {moment(selectDate).locale(i18next.language).format('MMMM')}
        </Typography>
      </Grid>
      <Grid item className={classes.yearBox}>
        <Typography variant={'h3'}>{moment(selectDate).format('yyyy')}</Typography>
      </Grid>
      <Grid item className={classes.dayBox}>
        <Typography variant={'h3'}>
          {moment(selectDate).isSame(moment(), 'day')
            ? t('Study.Today')
            : moment(selectDate).locale(i18next.language).date()}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default withTranslation()(CalendarHeader);
