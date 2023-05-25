import { Dialog, DialogContent } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { UserRole } from 'entities/User';
import moment from 'moment';
import { chooseSmileImage } from 'utils/smileyImage';
import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { userRoleSelector } from 'store/auth/auth.selectors';
import { lessonsSelector } from 'store/lessons/lessons.selectors';
import useStyles from './LessonModal.styles';

interface LessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  navigateToTopic?: (topicId: string) => void;
}

const LessonModal: React.FC<LessonModalProps & WithTranslation> = ({ isOpen, onClose, t }) => {
  const { classes } = useStyles();
  const { selectedItem } = useSelector(lessonsSelector);
  const userRole = useSelector(userRoleSelector);

  return selectedItem && selectedItem.summary.length > 0 ? (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent className={classes.dialogContainer}>
        <Grid container direction={'row'} justifyContent={'flex-start'} alignItems={'center'}>
          <Grid item lg={3}>
            <img src={selectedItem.subject.icon} alt="Subject pic" width={67} />
          </Grid>
          <Grid item container direction={'column'} justifyContent={'center'} lg={8}>
            <Grid item>
              <Typography variant={'h3'}>
                {moment(selectedItem?.startedAt).format('hh:mm A')}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant={'h2'}>{selectedItem?.subject.name}</Typography>
            </Grid>
          </Grid>
          <Grid item lg={1}>
            <img
              src={chooseSmileImage(selectedItem.summary[0]?.rate, false)}
              alt={'Smile'}
              className={classes.smileImg}
            />
          </Grid>
        </Grid>
        <Grid container direction={'column'}>
          <Grid item>
            <Typography variant={'h2'}>{t('Modals.Lesson Modal.Summary')}</Typography>
          </Grid>
          <Grid item className={classes.descriptionBox}>
            <Typography variant={'body1'}>{selectedItem.summary[0].description}</Typography>
          </Grid>
        </Grid>
        <Grid container direction={'column'}>
          <Grid item>
            <Typography variant={'h2'}>{t('Modals.Lesson Modal.Time Spent')}</Typography>
          </Grid>
          <Grid item>
            <Typography variant={'body1'}>{`00:${
              (Math.floor(selectedItem.summary[0].timeSpent / 600) > 9 && '') ||
              '0' + Math.floor(selectedItem.summary[0].timeSpent / 600)
            }:00`}</Typography>
          </Grid>
        </Grid>
        {userRole === UserRole.Student ? null : (
          <Button onClick={onClose} color={'secondary'} variant={'contained'} disableElevation>
            Close
          </Button>
        )}
      </DialogContent>
    </Dialog>
  ) : null;
};

export default withTranslation()(LessonModal);
