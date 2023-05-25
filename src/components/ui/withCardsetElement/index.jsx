import React from 'react';
import { Grid, Typography } from '@mui/material';
import useStyles from './WithCardsetElement.styles';

function withCardsetElement(WrappedComponent) {
  return function WithCardsetElementComponent(props) {
    const { title, tags, clickable, onClick, ...rest } = props;
    const classes = useStyles();

    const renderTags = () => {
      return tags.map((currentTag, index) => {
        return (
          <Typography key={index} variant={'body2'} className={classes.tag}>
            #{currentTag.name}
          </Typography>
        );
      });
    };

    return (
      <Grid
        container
        alignItems={'center'}
        className={clickable ? `${classes.container} ${classes.clickable}` : `${classes.container}`}
        onClick={onClick}
        style={{ boxShadow: '0px 11px 13px rgba(188, 193, 232, 0.3)' }}
      >
        <Grid item>
          <Grid container direction="column">
            <div>
              <Typography className={classes.title}>{title}</Typography>
            </div>
            <Grid container direction="row">
              {renderTags()}
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <WrappedComponent {...rest} />
        </Grid>
      </Grid>
    );
  };
}

export default withCardsetElement;
