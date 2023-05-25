import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import withCardsetElement from 'components/ui/withCardsetElement';
import { Cards, FlatStar, LikeBlue, LikeGrey } from 'assets/images/icons';
import useStyles from './DiscoverCardsetElement.styles';

interface DiscoverCardsetElementProps {
  isLiked?: boolean;
  cardsCount?: number;
  isConfirmed?: boolean;
  like?: () => void;
  unlike?: () => void;
  likesCount: number;
  isFollowed: boolean;
  onFollowButton: () => void;
  onUnfollowButton: () => void;
}

const DiscoverCardsetElement = (props: DiscoverCardsetElementProps) => {
  const { classes } = useStyles();

  const {
    isLiked,
    cardsCount,
    isConfirmed,
    likesCount,
    isFollowed,
    onFollowButton,
    onUnfollowButton,
    like,
    unlike,
  } = props;
  return (
    <Grid container spacing={4}>
      <Grid item>
        {isConfirmed && <img src={FlatStar} className={classes.iconWrapper} alt={'star'} />}
      </Grid>
      <Grid item>
        <Grid container wrap={'nowrap'} alignItems={'center'}>
          <img
            src={Cards}
            className={classes.textIconWrapper}
            alt={'amount of cards in this set'}
          />
          <Typography className={classes.number}>{cardsCount}</Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          alignItems={'center'}
          alignContent={'center'}
          onClick={isLiked ? unlike : like}
        >
          <img
            src={isLiked ? LikeBlue : LikeGrey}
            className={classes.textIconWrapper}
            alt={'likes number'}
          />
          {!!likesCount && <Typography className={classes.number}>{likesCount}</Typography>}
        </Grid>
      </Grid>
      <Grid item>
        {isFollowed ? (
          <Button
            variant={'contained'}
            className={classes.unfollowButton}
            disableElevation
            onClick={onUnfollowButton}
          >
            <RemoveCircleOutlineIcon />
          </Button>
        ) : (
          <Button variant={'contained'} color={'primary'} disableElevation onClick={onFollowButton}>
            <LibraryAddIcon />
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default withCardsetElement(DiscoverCardsetElement);
