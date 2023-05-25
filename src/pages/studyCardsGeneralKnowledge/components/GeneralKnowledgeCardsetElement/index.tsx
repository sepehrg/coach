import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import withCardsetElement from 'components/ui/withCardsetElement';
import { Cards, FlatStar, LikeBlue, LikeGrey } from 'assets/images/icons';
import useStyles from './GeneralKnowledgeCardsetElement.styles';

interface GeneralKnowledgeCardsetElementProps {
  isLiked?: boolean;
  cardsCount?: number;
  isConfirmed?: boolean;
  grade: number;
  like: () => void;
  unlike: () => void;
  likesCount: number;
  isFollowed: boolean;
  onFollowButton: () => void;
  onUnfollowButton: () => void;
}

const GeneralKnowledgeCardsetElement = (props: GeneralKnowledgeCardsetElementProps) => {
  const { classes } = useStyles();

  const {
    isLiked,
    cardsCount,
    isConfirmed,
    likesCount,
    isFollowed,
    onFollowButton,
    onUnfollowButton,
    grade,
    like,
    unlike,
  } = props;
  return (
    <Grid
      container
      item
      md={7}
      lg={6}
      justifyContent={'flex-end'}
      direction={'row'}
      wrap={'nowrap'}
      alignContent={'center'}
    >
      <Grid
        className={classes.gradeLabel}
        container
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Typography variant={'body2'}>{grade}</Typography>
      </Grid>
      {isConfirmed && <img src={FlatStar} className={classes.iconWrapper} alt={'star'} />}
      <Grid item container direction={'row'} wrap={'nowrap'} md={5} lg={5}>
        <Grid item container direction={'row'} alignContent={'center'}>
          <img
            src={Cards}
            className={classes.textIconWrapper}
            alt={'amount of cards in this set'}
          />
          <Typography>{cardsCount}</Typography>
        </Grid>
        <Grid
          item
          container
          direction={'row'}
          alignContent={'center'}
          onClick={isLiked ? unlike : like}
        >
          <img
            src={isLiked ? LikeBlue : LikeGrey}
            className={classes.textIconWrapper}
            alt={'likes number'}
          />
          {!!likesCount && <Typography>{likesCount}</Typography>}
        </Grid>
      </Grid>

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
  );
};

export default withCardsetElement(GeneralKnowledgeCardsetElement);
