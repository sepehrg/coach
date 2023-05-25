import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Box, Chip, TextField, Typography } from '@mui/material';
import { Tag } from 'entities/Tag';
import useStyles from './HashtagInput.styles';
import { GreySearchIcon } from 'assets/images/icons';
import { WithTranslation, withTranslation } from 'react-i18next';
import { useOutsideDetector } from 'components/hooks/useOutsideAction';

interface HashtagInputProps {
  onChange: (input: string) => void;
  onTagSelected: (tag: Tag) => void;
  onTagRemoved: (tagIndex: number) => void;
  initialValue?: Tag[];
  suggestions?: Tag[];
}

const HashtagInput: React.FC<HashtagInputProps & WithTranslation> = (props) => {
  const { classes } = useStyles();
  const { initialValue, onChange, onTagSelected, suggestions, onTagRemoved, t } = props;

  const [selectedTags, setSelectedTags] = useState<Tag[]>(initialValue || []);
  const [inputValue, setInputValue] = useState<string>('');
  const [showSuggestions, toggleSuggestions] = useState<boolean>(false);

  const wrapperRef = useRef(null);
  useOutsideDetector(wrapperRef, () => toggleSuggestions(false));

  const onKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter' && showSuggestions) {
        if (suggestions && suggestions.length && selectedTags.length < 5) {
          const newValue = [...selectedTags];
          newValue.push(suggestions[0]);
          setSelectedTags(newValue);
          setInputValue('');
          onTagSelected(suggestions[0]);
        }
        toggleSuggestions(false);
      }
    },
    [onTagSelected, selectedTags, suggestions, showSuggestions],
  );

  const onTagSelect = (tag: Tag) => {
    if (selectedTags.length > 4) return;
    const newValue = [...selectedTags];
    newValue.push(tag);
    setSelectedTags(newValue);
    setInputValue('');
    onTagSelected(tag);
    toggleSuggestions(false);
  };

  const onTagDelete = (tagIndex: number) => {
    const newValue = [...selectedTags];
    newValue.splice(tagIndex, 1);
    setSelectedTags(newValue);
    onTagRemoved(tagIndex);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (!showSuggestions) toggleSuggestions(true);
    setInputValue(event.target.value);
    onChange(event.target.value);
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeyPress);

    return () => {
      window.removeEventListener('keydown', onKeyPress);
    };
  }, [onKeyPress]);

  const inputProps = {
    className: classes.root,
    startAdornment: selectedTags.map((item, index) => (
      <Chip
        className={classes.chip}
        size="small"
        onDelete={() => onTagDelete(index)}
        key={index}
        label={`#${item.name}`}
      />
    )),
  };

  const textFieldProps = {
    value: inputValue,
    className: classes.container,
    placeholder: `${selectedTags.length < 5 ? t('Study Cards.Create.Start typing') : ''}`,
    onFocus: () => toggleSuggestions(true),
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
      onInputChange(event),
    InputProps: inputProps,
  };

  return (
    <>
      <TextField {...textFieldProps} />
      {suggestions && showSuggestions && (
        <div ref={wrapperRef}>
          <Box className={classes.suggestionsWrapper}>
            {suggestions.length < 1 && (
              <Typography variant={'body1'}>{t('Study Cards.Create.No tags')}</Typography>
            )}
            {suggestions.map((suggestion) => {
              return (
                <Box
                  key={suggestion.id}
                  className={classes.suggestion}
                  display="flex"
                  flexDirection={'row'}
                  flexWrap={'nowrap'}
                  justifyContent={'flex-start'}
                  alignItems="center"
                  onClick={() => onTagSelect(suggestion)}
                >
                  <img src={GreySearchIcon} className={classes.searchIcon} alt={'search'} />
                  <Typography variant={'body1'}>{`#${suggestion.name}`}</Typography>
                </Box>
              );
            })}
          </Box>
        </div>
      )}
    </>
  );
};

export default withTranslation()(HashtagInput);
