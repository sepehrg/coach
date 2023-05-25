import React from 'react';
import {
  Cards,
  CrossedEye,
  FavoriteGrey,
  FlatStar,
  LikeBlue,
  LikeGrey,
  Shared,
  Users,
} from 'assets/images/icons';
import withCardsetElement from 'components/ui/withCardsetElement/index';
import { Button, Grid, Typography } from '@mui/material';
import useStyles from './LibraryCardsetElement.styles';
import i18n from 'translations/i18n';

interface LibraryCardsetActionsProps {
  isLiked?: boolean;
  cardsCount?: number;
  isFollowed?: boolean;
  isConfirmed?: boolean;
  isPrivate?: boolean;
  like: () => void;
  unlike: () => void;
  likesCount: number;
  onStudyButton: () => void;
}

const LibraryCardsetElement = (props: LibraryCardsetActionsProps) => {
  const { classes, cx } = useStyles();

  const {
    isLiked,
    cardsCount,
    isFollowed,
    isConfirmed,
    isPrivate,
    likesCount,
    onStudyButton,
    like,
    unlike,
  } = props;

  return (
    <Grid container spacing={4}>
      <Grid item>
        {isFollowed && (
          <img src={Shared} className={classes.iconWrapper} alt={'public set which you follow'} />
        )}
        {isPrivate && <img src={CrossedEye} className={classes.iconWrapper} alt={'private set'} />}
        {isConfirmed && <img src={FlatStar} className={classes.iconWrapper} alt={'star'} />}
      </Grid>
      <Grid item>
        <Grid container wrap={'nowrap'} alignItems={'center'}>
          <img
            src={FavoriteGrey}
            className={cx(classes.textIconWrapper, classes.firstIcon)}
            alt={'favorite'}
          />
        </Grid>
      </Grid>
      <Grid item>
        <Grid container alignContent={'center'} alignItems={'center'}>
          <img src={Users} className={classes.textIconWrapper} alt={'number of users using deck'} />
          <Typography className={classes.number}></Typography>
        </Grid>
      </Grid>{' '}
      <Grid item>
        <Grid container alignContent={'center'} alignItems={'center'}>
          <img src={Cards} className={classes.textIconWrapper} alt={'number of cards in set'} />
          <Typography className={classes.number}>{cardsCount}</Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          alignContent={'center'}
          alignItems={'center'}
          onClick={isLiked ? unlike : like}
        >
          <img
            src={isLiked ? LikeBlue : LikeGrey}
            className={classes.textIconWrapper}
            alt={'like'}
          />
          {!!likesCount && <Typography className={classes.number}>{likesCount}</Typography>}
        </Grid>
      </Grid>
      <Grid item>
        <Button
          variant={'contained'}
          color={'primary'}
          className={classes.study}
          disableElevation
          onClick={onStudyButton}
        >
          {i18n.t('Study Cards.Library.Study')}
        </Button>
      </Grid>
    </Grid>
  );
};

export default withCardsetElement(LibraryCardsetElement);
