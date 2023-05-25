import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useStyles from './Header.styles';
import HamburgerMenu from './components/HamburgerMenu';
import { useSelector } from 'react-redux';
import { idoActionsSelector } from 'store/ido/ido.selectors';
import { useIdoActions } from 'store/ido';
import moment from 'moment';
import Ido3D from 'components/narrative-design/Ido3D/Scene3D';
import { idoScenes } from 'components/narrative-design/Ido3D/Scene3D/SceneStateManager';
import { IdoAction, IdoActionTypes, IdoMessage } from 'entities/Ido';

const Header: React.FC = () => {
  const { classes } = useStyles();

  const { getGreeting, getIdoAction, removeGreeting } = useIdoActions();
  const { idoActions } = useSelector(idoActionsSelector);

  const [messageIndex, setMessageIndex] = useState(0);

  const moreThanOneDayPassed = (action: IdoAction) =>
    moment().diff(moment(action.time), 'days') >= 1;

  useEffect(() => {
    getGreeting();
  }, [getGreeting]);

  useEffect(() => {
    const previousGreeting = idoActions.find((action) => action.type === IdoActionTypes.GREETING);
    if (previousGreeting && moreThanOneDayPassed(previousGreeting)) removeGreeting();
  }, [idoActions, removeGreeting]);

  useEffect(() => {
    getIdoAction({ type: IdoActionTypes.AFFIRMATION });
    getIdoAction({ type: IdoActionTypes.REMINDER });
  }, [getIdoAction]);

  function handleClickOnMsgField(numberOfMessages: number) {
    setMessageIndex(messageIndex + 1);
    if (numberOfMessages === messageIndex + 1) setMessageIndex(0);
  }

  const getReducedMessages = (): IdoMessage[] => {
    return idoActions?.reduce((acc: IdoMessage[], action) => {
      acc.push(...action.messages);
      return acc;
    }, []);
  };

  const renderMessages = () => {
    const messages = getReducedMessages();
    return (
      <Grid
        item
        onClick={() => handleClickOnMsgField(messages.length)}
        className={classes.greeting}
      >
        {messages[messageIndex] && (
          <div className={classes.title}>{messages[messageIndex].body}</div>
        )}
        {messages[messageIndex + 1] && (
          <div className={classes.stage}>
            <div className={classes.dotTyping}></div>
          </div>
        )}
      </Grid>
    );
  };

  return (
    <Grid container className={classes.root}>
      <Ido3D scene={idoScenes.DASHBOARD} />
      <Grid item className={classes.column}>
        <HamburgerMenu />
      </Grid>
      <Grid item>
        <Grid container className={classes.ido}>
          {renderMessages()}
          <Grid item style={{ marginLeft: 50 }}></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Header;
