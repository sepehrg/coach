import React from 'react';
import { Button, Grid } from '@mui/material';
import { Copy, Report, Share, Unfollow } from 'assets/images/icons';
import useStyles from './CardSetSidebar.styles';
import CopyToClipboardComponent from 'react-copy-to-clipboard';
import { withTranslation, WithTranslation } from 'react-i18next';

interface CardSetSidebar {
  onFollowButton: () => void;
  onCopyButton: () => void;
  onReportButton: () => void;
  onShareButton: () => void;
  onUnfollowButton: () => void;
  isFollowed?: boolean;
  shareLink: string;
  isOwner?: boolean;
}

const CardSetSidebar: React.FC<CardSetSidebar & WithTranslation> = (props) => {
  const { classes } = useStyles();
  const {
    onFollowButton,
    onCopyButton,
    onReportButton,
    onShareButton,
    isFollowed,
    onUnfollowButton,
    shareLink,
    isOwner,
    t,
  } = props;

  return (
    <Grid className={classes.sidebar} container alignItems={'center'} justifyContent={'center'}>
      {!isOwner && (
        <>
          {isFollowed ? (
            <Button
              disableElevation
              variant="contained"
              onClick={onUnfollowButton}
              classes={{ root: classes.menuButton, text: classes.menuLabel }}
            >
              <img src={Unfollow} alt={''} />
              {t('Study Cards.Discover.Unfollow')}
            </Button>
          ) : (
            <Button
              disableElevation
              variant="contained"
              onClick={onFollowButton}
              classes={{ root: classes.menuButton, text: classes.menuLabel }}
            >
              <img src={Unfollow} alt={''} />
              {t('Study Cards.Discover.Follow')}
            </Button>
          )}
        </>
      )}
      <Button
        disableElevation
        classes={{ root: classes.menuButton, text: classes.menuLabel }}
        onClick={onCopyButton}
        variant="contained"
      >
        <img src={Copy} alt={''} />
        {t('Study Cards.Discover.Copy')}
      </Button>
      <CopyToClipboardComponent text={shareLink} onCopy={onShareButton}>
        <Button
          disableElevation
          variant="contained"
          classes={{ root: classes.menuButton, text: classes.menuLabel }}
        >
          <img src={Share} alt={''} />
          {t('Study Cards.Discover.Share')}
        </Button>
      </CopyToClipboardComponent>
      {!isOwner && (
        <Button
          disableElevation
          classes={{ root: classes.menuButton, text: classes.menuLabel }}
          variant="contained"
          onClick={onReportButton}
        >
          <img src={Report} alt={''} />
          {t('Study Cards.Discover.Report')}
        </Button>
      )}
    </Grid>
  );
};

export default withTranslation()(CardSetSidebar);
