import React, { useCallback, useState } from 'react';
import { Box, Grid, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';

import useStyles from './SelectSessionType.styles';
import Illustrations from 'assets/images/llustrations/illustrations';
import SessionTypeCard from '../SessionTypeCard';
import { useSelector } from 'react-redux';
import { userNameSelector } from 'store/auth/auth.selectors';
import { withTranslation, WithTranslation } from 'react-i18next';
import { QuestionMark } from 'assets/images/icons';
import PageInfo, { PageType } from 'components/ui/PageInfo';

interface SelectSessionTypeProps {
  handleSelect: (sessionType: string) => void;
}

const SelectSessionType: React.FC<SelectSessionTypeProps & WithTranslation> = ({
  handleSelect,
  t,
}) => {
  const { classes } = useStyles();
  const name = useSelector(userNameSelector);
  const [infoModal, toggleInfoModal] = useState<boolean>(false);

  const handleToggleInfoModal = useCallback(() => {
    toggleInfoModal((prevState) => !prevState);
  }, [toggleInfoModal]);

  return (
    <>
      <Grid container direction={'column'} wrap={'nowrap'} justifyContent={'center'}>
        <Grid item container direction={'row'} justifyContent={'flex-start'} alignItems={'center'}>
          <Typography variant="h1">{t('Common.Focus Time')}</Typography>
          <IconButton onClick={handleToggleInfoModal} className={classes.infoButton} size="large">
            <img src={QuestionMark} alt={'question mark'} />
          </IconButton>
        </Grid>
        <Grid container item direction={'column'} alignItems={'center'} justifyContent={'center'}>
          <Grid
            container
            item
            direction={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            className={classes.greetingWrapper}
          >
            <Typography className={classes.greeting}>
              {t('Study.Session Type.Hi')} {name} 👋
            </Typography>
            <Typography className={classes.greeting}>
              {t('Study.Session Type.How can I help')}
            </Typography>
          </Grid>
          <Grid
            container
            direction={'row'}
            alignItems={'center'}
            item
            justifyContent={'space-between'}
            style={{ maxWidth: 580 }}
          >
            <Box onClick={() => handleSelect('studySession')}>
              <SessionTypeCard
                image={Illustrations.StudySession}
                text={t('Study.Session Type.study session').toString()}
              />
            </Box>
            <Box onClick={() => handleSelect('lookUp')}>
              <SessionTypeCard
                image={Illustrations.Search}
                text={t('Study.Session Type.look up').toString()}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <PageInfo isOpen={infoModal} onClose={handleToggleInfoModal} page={PageType.FocusTime} />
    </>
  );
};

export default withTranslation()(SelectSessionType);
