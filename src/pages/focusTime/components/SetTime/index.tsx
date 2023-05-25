import React, { useCallback, useEffect, useState } from 'react';
import { Grid, IconButton } from '@mui/material';

import useStyles from './SetTime.styles';
import { BackArrow } from 'assets/images/icons';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Clock, Less, More } from '../../assets';
import BeforeStartModal from '../BeforeStartModal';
import { useLessonActions } from 'store/lessons';
import { WithTranslation, withTranslation } from 'react-i18next';
import { FormattedInput } from '@buttercup/react-formatted-input';
import { useSelector } from 'react-redux';
import { defaultSessionTimeSelector } from 'store/lessons/lessons.selectors';
import Loader from 'components/containers/Loader';
import { loadingActionSelector } from 'store/loader/loader.selectors';
import { GET_DEFAULT_SESSION_DURATION } from 'store/lessons/lessons.types';

interface SetTimeProps {
  handleConfirmTime: any;
  goBack: () => void;
  submitStudySession: () => void;
}

const SetTime: React.FC<SetTimeProps & WithTranslation> = ({
  handleConfirmTime,
  goBack,
  submitStudySession,
  t,
}) => {
  const { classes } = useStyles();

  const defaultDuration = useSelector(defaultSessionTimeSelector);
  const loading = useSelector(loadingActionSelector)([GET_DEFAULT_SESSION_DURATION]);

  const [count, setCount] = useState<string>('25:00');
  const { dispatchGetDefaultDuration } = useLessonActions();
  const [isOpenModal, setOpenModal] = useState(false);

  const handleIncCount = useCallback(() => {
    setCount((prevState) => {
      const incrementedTime =
        +prevState.slice(0, 2) < 9
          ? `0${(+prevState.slice(0, 2) + 1).toString()}:00`
          : `${(+prevState.slice(0, 2) + 1).toString()}:00`;

      return +prevState.slice(0, 2) + 1 > 45 ? '45:00' : incrementedTime;
    });
  }, [setCount]);

  const handleDecCount = useCallback(
    () =>
      setCount((prevState) => {
        const lessThen10Min =
          +prevState.slice(0, 2) < 6 ? '05:00' : `0${(+prevState.slice(0, 2) - 1).toString()}:00`;

        return +prevState.slice(0, 2) - 1 < 10
          ? lessThen10Min
          : `${(+prevState.slice(0, 2) - 1).toString()}:00`;
      }),
    [setCount],
  );

  useEffect(() => {
    dispatchGetDefaultDuration();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const formattedDuration =
      defaultDuration && defaultDuration < 10 ? `0${defaultDuration}` : defaultDuration;
    setCount(`${formattedDuration}:00`);
    // eslint-disable-next-line
  }, [defaultDuration]);

  const pattern = [
    { char: '[0-4]', repeat: 1 },
    { char: '[0-9]', repeat: 1 },
    { exactly: ':' },
    { exactly: '0' },
    { exactly: '0' },
  ];

  const renderTimeButton = (time: string) => {
    return (
      <Button
        variant={'contained'}
        color={'secondary'}
        disableElevation
        onClick={() => {
          setCount(time);
          handleConfirmTime(+time.slice(0, 2));
          setOpenModal(true);
        }}
        className={classes.timeButton}
      >
        {time}
      </Button>
    );
  };

  return (
    <Loader loading={loading}>
      <IconButton className={classes.backBtn} onClick={goBack} size="large">
        <img src={BackArrow} className={classes.backBtnImage} alt="back button" />
      </IconButton>
      <Grid
        container
        direction={'column'}
        wrap={'nowrap'}
        justifyContent={'center'}
        alignItems={'center'}
        className={classes.pageWrapper}
      >
        <Grid
          container
          item
          direction={'row'}
          alignItems={'flex-start'}
          justifyContent={'center'}
          lg={7}
          md={7}
        >
          <Typography className={classes.title}>{t('Study.Set Time.How long')}</Typography>
        </Grid>
        <Grid
          item
          container
          direction={'column'}
          lg={12}
          md={12}
          className={classes.clockWrapper}
          wrap={'nowrap'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Grid
            container
            direction={'row'}
            wrap={'nowrap'}
            alignItems={'center'}
            justifyContent={'space-between'}
            md={6}
            lg={4}
            xs={8}
          >
            <Grid item className={classes.clockInnerWrapper}>
              <IconButton
                className={`${classes.arrowButton} ${classes.buttonUp}`}
                onClick={handleIncCount}
                size="large"
              >
                <img src={More} alt="arrow up" />
              </IconButton>
              <img src={Clock} alt="clock" />
              <Grid
                item
                container
                alignItems={'center'}
                direction={'row'}
                wrap={'nowrap'}
                justifyContent={'center'}
                className={classes.clockTextWrapper}
              >
                <FormattedInput
                  className={classes.clockText}
                  format={pattern}
                  value={count}
                  onChange={(formattedValue: string) => {
                    setCount(formattedValue);
                  }}
                />
              </Grid>
              <IconButton
                className={`${classes.arrowButton} ${classes.buttonDown}`}
                onClick={handleDecCount}
                size="large"
              >
                <img src={Less} alt="arrow down" />
              </IconButton>
            </Grid>
            <Grid container direction={'column'} md={12} lg={12} xs={12}>
              {renderTimeButton('10:00')}
              {renderTimeButton('15:00')}
              {renderTimeButton('20:00')}
            </Grid>
          </Grid>

          <Grid item>
            <Button
              variant={'contained'}
              color={'primary'}
              className={classes.setTimeBtn}
              disableElevation={true}
              onClick={() => {
                handleConfirmTime(+count.slice(0, 2));
                setOpenModal(true);
              }}
            >
              {t('Study.Set Time.Set time')}
            </Button>
          </Grid>
          <BeforeStartModal isOpen={isOpenModal} chosenTime={count} onClose={submitStudySession} />
        </Grid>
      </Grid>
    </Loader>
  );
};

export default withTranslation()(SetTime);
