import React from 'react';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { BaseSubject } from 'entities/Subject';
import useStyles from './SubjectCard.styles';
import { WithTranslation, withTranslation } from 'react-i18next';
import config from 'config';

export interface SubjectCardProps {
  subject: BaseSubject;
  onChoose: () => void;
  isActive?: boolean;
  cardStyles?: string;
}

const SubjectCard: React.FC<SubjectCardProps & WithTranslation> = ({
  subject,
  isActive,
  onChoose,
  cardStyles,
  t,
  i18n,
}) => {
  const { classes } = useStyles();

  const renderTitle = () => {
    const translation = `Study.Subjects.${subject.name}`;
    if (i18n.exists(translation)) {
      return t(translation);
    }
    return subject.name;
  };

  return (
    <Box
      className={` ${cardStyles} ${classes.root} ${(isActive && classes.active) || ''}`}
      onClick={onChoose}
    >
      <Grid
        container
        justifyContent={'center'}
        alignItems={'center'}
        className={classes.iconWrapper}
      >
        <img src={config.BACKEND_URL + subject.icon} alt="" className={classes.img} />
      </Grid>
      <Typography variant={'body1'} className={classes.label}>
        {renderTitle()}
      </Typography>
    </Box>
  );
};

export default withTranslation()(SubjectCard);
