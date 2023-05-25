import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { Button, Grid, Typography } from '@mui/material';
import useStyles from './ResultsFrame.styles';
import { IdoBasic } from 'assets/images';
import { t } from 'i18next';

interface ResultsFrameProps {
  subjectTitle: string;
  setTitle: string;
  points: number;
  cardsCount: number;
  onEndSession: () => void;
}

const messagesData = [
  { correct: 80, text: t('Study Cards.Learn.Great job') },
  { correct: 50, text: t('Study Cards.Learn.Good job') },
  { correct: 0, text: t('Study Cards.Learn.Practice') },
];

const ResultsFrame: React.FC<ResultsFrameProps & WithTranslation> = (props) => {
  const { classes } = useStyles();
  const { subjectTitle, setTitle, points, cardsCount, onEndSession, t } = props;

  const renderMessage = () => {
    const index = messagesData.findIndex(
      (message) => message.correct <= (points / cardsCount) * 100,
    );

    return (
      <Grid
        className={classes.messageBox}
        container
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Typography variant={'subtitle1'}>{messagesData[index].text}</Typography>
        <Typography variant={'subtitle1'}>
          {t('Study Cards.Learn.Correct answers', { points: points, cardsCount: cardsCount })}
        </Typography>
      </Grid>
    );
  };

  return (
    <>
      <Grid
        container
        direction={'row'}
        wrap={'nowrap'}
        md={12}
        lg={12}
        justifyContent={'space-between'}
        alignItems={'center'}
        className={classes.header}
      >
        <Grid container direction={'column'} md={9} lg={9}>
          <Typography variant={'h5'}>{subjectTitle}</Typography>
          <Typography variant={'h2'}>{setTitle}</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent={'space-around'}
        alignItems={'center'}
        className={classes.body}
      >
        <Grid className={classes.centerContainer} container justifyContent={'flex-start'}>
          {renderMessage()}
          <img src={IdoBasic} className={classes.image} alt={'Ido robot'} width={120} />
          <Grid container direction={'row'} justifyContent={'center'} alignItems={'center'}>
            <Button
              variant={'contained'}
              color={'primary'}
              disableElevation
              className={classes.buttonBottom}
              onClick={onEndSession}
            >
              {t('Study Cards.Learn.End session')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default withTranslation()(ResultsFrame);
