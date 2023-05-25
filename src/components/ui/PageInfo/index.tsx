import React from 'react';
import useStyles from './PageInfo.styles';
import { Dialog, DialogContent } from '@mui/material';
import * as InfoAssets from './assets';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { WithTranslation, withTranslation } from 'react-i18next';

export enum PageType {
  StudyDiary = 'STUDY_DIARY',
  FocusTime = 'FOCUS_TIME',
  Dashboard = 'DASHBOARD',
}

interface PageInfoProps {
  isOpen: boolean;
  onClose: () => void;
  page: PageType;
}

const PageInfo: React.FC<PageInfoProps & WithTranslation> = ({ isOpen, onClose, page, t }) => {
  const { classes } = useStyles();

  const PAGE_INFO_CONTENT: { [key: string]: any } = {
    FOCUS_TIME: {
      title: t('PageInfoModals.Focus Time.Title'),
      paragraphs: [t('PageInfoModals.Focus Time.p1'), t('PageInfoModals.Focus Time.p2')],
      icon: InfoAssets.FocusTime,
    },
    STUDY_DIARY: {
      title: t('PageInfoModals.Study Diary.Title'),
      paragraphs: [t('PageInfoModals.Focus Time.p1')],
      icon: InfoAssets.StudyDiary,
    },
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent className={classes.root}>
        <Box className={classes.titleBox}>
          <Typography variant={'h2'}>{PAGE_INFO_CONTENT[`${page}`].title}</Typography>
          <IconButton onClick={onClose} size="large">
            <img src={InfoAssets.DialogClose} width={14} alt={'Close Button'} />
          </IconButton>
        </Box>
        {PAGE_INFO_CONTENT[`${page}`].paragraphs.map((paragraph: string) => (
          <Typography className={classes.paragraph} variant={'body1'} key={paragraph}>
            {paragraph}
          </Typography>
        ))}
        <Box className={classes.iconBox}>
          <img src={PAGE_INFO_CONTENT[`${page}`].icon} width={250} alt={'Page Icon'} />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default withTranslation()(PageInfo);
