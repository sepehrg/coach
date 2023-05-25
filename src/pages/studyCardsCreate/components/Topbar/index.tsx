import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  Popover,
  PopoverProps,
  Typography,
} from '@mui/material';
import useStyles from './Topbar.styles';
import { HashtagsInfo } from 'assets/images';
import { Field, useField } from 'formik';
import HashtagInput from '../HashtagInput';
import { Tag } from 'entities/Tag';
import { useStudycardsActions } from 'store/studycards';
import { useSelector } from 'react-redux';
import { studyCardsTagsSelector } from 'store/studycards/studycards.selectors';
import { Switch } from 'formik-mui';
import { WithTranslation, withTranslation } from 'react-i18next';
import { QuestionCircleOutlined } from '@ant-design/icons';

interface TopbarProps {
  onSubmit: () => void;
  isValid: boolean;
}

const Topbar: React.FC<TopbarProps & WithTranslation> = (props) => {
  const { onSubmit, isValid, t } = props;
  const { classes } = useStyles();
  const { dispatchSearchTags, dispatchClearStudyCards } = useStudycardsActions();
  const tags = useSelector(studyCardsTagsSelector);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [{ value }, , { setValue }] = useField('studyCardTags');

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClick: React.MouseEventHandler<Element> = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = () => {
    dispatchClearStudyCards();
    onSubmit();
  };

  const popoverProps: PopoverProps = {
    id,
    open,
    anchorEl,
    onClose: handleClose,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'center',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'center',
    },
  };

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.shadowBox}></Box>
      <Grid container direction={'row'} className={classes.inputBarWrapper}>
        <Field
          className={classes.input}
          placeholder={t('Study Cards.Create.Set title')}
          name={'title'}
        />
        <HashtagInput
          onTagSelected={(tag?: Tag) => {
            const newValue = [...value];
            newValue.push(tag);
            setValue(newValue);
          }}
          onTagRemoved={(tagIndex: number) => {
            const newValue = [...value];
            newValue.splice(tagIndex, 1);
            setValue(newValue);
          }}
          onChange={(input: string) => {
            dispatchSearchTags(input);
          }}
          initialValue={value}
          suggestions={tags}
        />
        <IconButton
          className={classes.infoBtn}
          aria-describedby={id}
          onClick={handleClick}
          size="large"
        >
          <QuestionCircleOutlined className={classes.infoIcon} />
        </IconButton>
        <FormControlLabel
          control={
            <Field
              component={Switch}
              name={'isPrivate'}
              classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
              }}
            />
          }
          label={t('Study Cards.Create.Private')}
          labelPlacement="start"
        />
        <Button
          variant={'contained'}
          disableElevation
          color={'primary'}
          onClick={handleSubmit}
          disabled={!isValid}
          className={classes.saveBtn}
        >
          {t('Study Cards.Create.Save')}
        </Button>
        <Popover {...popoverProps}>
          <Box className={classes.infoBox}>
            <Typography variant={'body1'} className={classes.infoText}>
              {t('Study Cards.Create.At least one tag')}
            </Typography>
            <Typography variant={'body1'} className={classes.infoText}>
              {t('Study Cards.Create.Separate hashtags')}
            </Typography>
            <img className={classes.infoPicture} src={HashtagsInfo} alt={''} />
          </Box>
        </Popover>
      </Grid>
    </Box>
  );
};

export default withTranslation()(Topbar);
