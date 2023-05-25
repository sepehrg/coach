import React from 'react';
import { Box, Button, Grid, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import useStyles from './SearchBar.styles';
import { Cross, GreySearchIcon } from '../../../assets/images/icons';
import { Tag } from 'entities/Tag';
import Loader from '../../containers/Loader';
import { WithTranslation, withTranslation } from 'react-i18next';

interface SearchbarProps {
  query: string;
  onChange: (query: string) => void;
  onTagSelect: (tag: Tag) => void;
  searchActive: boolean;
  onButtonClick?: () => void;
  onClearSearch: () => void;
  placeholderTags?: string[];
  tagsArray: Tag[];
  loading: boolean;
  searchBarStyles?: string;
  clearButtonStyles?: string;
}

const SearchBar = (props: SearchbarProps & WithTranslation) => {
  const { classes } = useStyles();
  const {
    onChange,
    query,
    onTagSelect,
    onButtonClick,
    searchActive,
    onClearSearch,
    placeholderTags,
    tagsArray,
    loading,
    searchBarStyles,
    clearButtonStyles,
  } = props;

  const formatPlaceholder = () => {
    return placeholderTags?.join(', ');
  };

  const placeholderString = formatPlaceholder();

  const renderSuggestions = () => {
    return (
      <Grid container style={{ position: 'relative', width: '100%' }}>
        <Box className={classes.resultsWrapper}>
          <Loader loading={loading}>
            {tagsArray?.map((item, index) => {
              return (
                <Grid
                  container
                  item
                  key={index}
                  direction={'row'}
                  className={classes.searchItem}
                  onClick={() => onTagSelect(item)}
                >
                  <img src={GreySearchIcon} alt="search" />
                  <Typography variant="body1" style={{ marginLeft: '7px' }}>
                    {item.name}
                  </Typography>
                </Grid>
              );
            })}
          </Loader>
        </Box>
      </Grid>
    );
  };

  return (
    <>
      <Grid container direction={'row'} className={classes.container}>
        <Grid container className={`${classes.root} ${searchBarStyles}`}>
          <input
            onChange={(event) => onChange(event.target.value)}
            value={query}
            className={classes.input}
            placeholder={placeholderTags ? `${placeholderString}` : ''}
          />
          <Button
            onClick={onButtonClick ? onButtonClick : undefined}
            variant="contained"
            className={classes.button}
            disableRipple={!onButtonClick}
            disableElevation
          ></Button>
          {query?.length > 0 && (
            <IconButton
              className={`${classes.clearButton} ${clearButtonStyles}`}
              onClick={onClearSearch}
              size="large"
            >
              <img src={Cross} alt="Clear search" />
            </IconButton>
          )}
        </Grid>
      </Grid>
      {tagsArray.length && searchActive ? renderSuggestions() : null}
    </>
  );
};

export default withTranslation()(SearchBar);
