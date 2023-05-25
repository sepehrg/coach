import React, { useState } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import CopyToClipboardComponent from 'react-copy-to-clipboard';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Grid, Popover, PopoverProps, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import withCardsetElement from 'components/ui/withCardsetElement';
import { Copy, Delete, EyeCrossed, Share, Shared } from 'assets/images/icons';
import useStyles from './EditCardsetElement.styles';

interface EditCardsetElementProps {
  isPrivate: boolean;
  isFollowed: boolean;
  isOwner: boolean;
  onCopySet: () => void;
  onDeleteSet: () => void;
  onEditSet: () => void;
  onShareSet: () => void;
  onUnfollowSet: () => void;
  shareLink: string;
}

const EditCardsetElement: React.FC<EditCardsetElementProps & WithTranslation> = (props) => {
  const { classes } = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    isPrivate,
    isFollowed,
    isOwner,
    onCopySet,
    onDeleteSet,
    onEditSet,
    onShareSet,
    onUnfollowSet,
    shareLink,
    t,
  } = props;

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleOpenPopover = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const popoverProps: PopoverProps = {
    id,
    open,
    anchorEl,
    onClose: handleClose,
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'center',
    },
    classes: { paper: classes.popup },
  };

  return (
    <Grid
      container
      item
      justifyContent={'flex-end'}
      direction={'row'}
      wrap={'nowrap'}
      alignContent={'center'}
    >
      {isFollowed && <img src={Shared} className={classes.icon} alt={'followed set'} />}
      {isPrivate && <img src={EyeCrossed} className={classes.icon} alt={'private'} />}

      {isOwner ? (
        <>
          <Button
            variant={'contained'}
            color={'primary'}
            onClick={onEditSet}
            disableElevation
            className={classes.outlinedButton}
          >
            <EditIcon />
          </Button>
          <CopyToClipboardComponent text={shareLink} onCopy={onShareSet}>
            <Button
              variant={'contained'}
              color={'primary'}
              disableElevation
              className={classes.outlinedButton}
            >
              <img src={Share} alt={'share'} />
            </Button>
          </CopyToClipboardComponent>
          <Button
            variant={'contained'}
            onClick={handleOpenPopover}
            disableElevation
            className={classes.outlinedButton}
          >
            <img src={Delete} alt={'delete'} />
          </Button>
        </>
      ) : (
        <>
          <CopyToClipboardComponent text={shareLink} onCopy={onShareSet}>
            <Button variant={'contained'} className={classes.outlinedButton} disableElevation>
              <img src={Share} alt={'share'} />
            </Button>
          </CopyToClipboardComponent>
          <Button
            variant={'contained'}
            onClick={onCopySet}
            className={classes.outlinedButton}
            disableElevation
          >
            <img src={Copy} alt={'copy'} />
          </Button>
          <Button
            variant={'contained'}
            onClick={onUnfollowSet}
            disableElevation
            className={classes.unfollowButton}
          >
            <RemoveCircleOutlineIcon />
          </Button>
        </>
      )}
      <Popover {...popoverProps}>
        <Grid direction={'row'} container>
          <ErrorOutlineIcon className={classes.popupIcon} />
          {isPrivate ? (
            <Typography className={classes.popupText}>
              {t('Study Cards.Library.Confirm Public')}
            </Typography>
          ) : (
            <Typography className={classes.popupText}>
              {t('Study Cards.Library.Confirm Private')}
            </Typography>
          )}
        </Grid>
        <Grid direction={'row'} container justifyContent={'flex-end'}>
          <Button onClick={handleClose} variant={'outlined'} className={classes.popupButton}>
            {t('Study Cards.Library.Cancel')}
          </Button>
          <Button
            onClick={() => {
              handleClose();
              onDeleteSet();
            }}
            variant={'outlined'}
          >
            {t('Study Cards.Library.Delete')}
          </Button>
        </Grid>
      </Popover>
    </Grid>
  );
};

export default withTranslation()(withCardsetElement(EditCardsetElement));
