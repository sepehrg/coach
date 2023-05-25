import React, { useCallback, useEffect, useState } from 'react';
import { Button, Grid, InputBase, MenuItem, Select } from '@mui/material';
import { withTranslation, WithTranslation } from 'react-i18next';
import useStyles from './StudyNotes.styles';
import HamburgerMenu from 'components/layout/Header/components/HamburgerMenu';
import moment from 'moment';
import { FavoriteGrey, FavoriteYellow } from 'assets/images/icons';
import NotesButtons from './components/notesButtons';
import Editor from './components/editor';
import { CardsDial } from 'assets/images';
import StudyCardsModal from './components/studyCardsModal';
import { useStudyNotesActions } from 'store/studyNotes';
import { StudyNote } from 'entities/StudyNote';
import { useSubjectsActions } from 'store/subjects';
import { useSelector } from 'react-redux';
import { subjectsSelector } from 'store/subjects/subjects.selectors';
import { BaseSubject, Subject } from 'entities/Subject';
import _ from 'lodash-es';
import { profileSelector } from 'store/auth/auth.selectors';

const emptyEditor =
  '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

const StudyNotes: React.FC<WithTranslation> = ({ t }) => {
  const defaultTitle = t('Study Notes.Headline');
  const { classes } = useStyles();
  const { getStudyNote, createStudyNote, updateStudyNote } = useStudyNotesActions();
  const { get: getSubjects } = useSubjectsActions();
  const profile = useSelector(profileSelector);
  const { data: subjects } = useSelector(subjectsSelector);

  const [studyCardsOpen, setStudyCardsOpen] = useState<boolean>(false);
  const [reloadEditor, setReloadEditor] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [focused, setFocused] = useState<boolean>(false);
  const [subjectId, setSubjectId] = useState<string>('');
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
  const [studyNote, setStudyNote] = useState<StudyNote>({
    title: defaultTitle,
    body: emptyEditor,
  } as StudyNote);

  const getDateString = (date: Date) => {
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - offset * 60 * 1000);
    return date.toISOString().split('T')[0];
  };

  const onStudyNoteCreate = (note: StudyNote) => {
    setStudyNote(note);
  };

  const createNewStudyNote = useCallback(() => {
    if (studyNote.title !== defaultTitle || studyNote.body !== emptyEditor)
      createStudyNote({
        title: studyNote.title,
        body: studyNote.body,
        subjectId,
        date: getDateString(date),
        onSuccess: onStudyNoteCreate,
      });
  }, [createStudyNote, studyNote, date, subjectId, defaultTitle]);

  const getStudyNoteSuccessHandler = useCallback(
    (savedStudyNote: StudyNote[]): void => {
      if (savedStudyNote.length > 0) setStudyNote(savedStudyNote[0]);
      else
        setStudyNote({
          id: '0',
          title: defaultTitle,
          body: emptyEditor,
          isFavorite: false,
          date,
        });
      toggleEditor();
    },
    [defaultTitle, date],
  );

  useEffect(() => {
    getSubjects();
  }, [getSubjects]);

  useEffect(() => {
    if (!_.isEmpty(subjects))
      setFilteredSubjects(
        subjects
          .filter((subject) => (profile?.native ? subject.native : subject.nonnative))
          .map((subject) => ({ ...subject, name: t(`Study.Subjects.${subject.name}`) })),
      );
  }, [subjects, profile, t]);

  useEffect(() => {
    if (filteredSubjects.length > 0) setSubjectId(filteredSubjects[0].id);
  }, [filteredSubjects]);

  const toggleEditor = () => {
    setReloadEditor(true);
    setTimeout(() => {
      setReloadEditor(false);
    }, 100);
  };

  useEffect(() => {
    if (subjectId)
      getStudyNote({
        date: getDateString(date),
        subjectId,
        onSuccess: getStudyNoteSuccessHandler,
      });
  }, [getStudyNote, getStudyNoteSuccessHandler, date, subjectId]);

  useEffect(() => {
    toggleEditor();
  }, [date]);

  const createOrUpdateStudyNote = useCallback(() => {
    if (studyNote.id === '0') createNewStudyNote();
    else if (studyNote.id) updateStudyNote(studyNote);
  }, [createNewStudyNote, updateStudyNote, studyNote]);

  useEffect(() => {
    const timeoutId = setTimeout(() => createOrUpdateStudyNote(), 500);
    return () => clearTimeout(timeoutId);
  }, [studyNote, createOrUpdateStudyNote]);

  const studyNoteChangeHandler = (field: string, value: string | boolean) => {
    setStudyNote({ ...studyNote, [field]: value });
  };

  const getTitle = () => {
    if (studyNote.title)
      return focused || studyNote.title.length < 36
        ? studyNote.title
        : studyNote.title.substring(0, 35) + '...';
  };

  return (
    <>
      <Grid container className={classes.container} id="note-container">
        <Grid item container className={classes.header}>
          <HamburgerMenu small={true} />
          <NotesButtons date={date} onDateChange={setDate} />
        </Grid>
        <Grid item container className={classes.content}>
          <Grid item container className={classes.notebook}>
            <Grid item container className={classes.pageHeader}>
              <Grid item className={classes.subject}>
                <Select
                  className={classes.selectWrapper}
                  value={subjectId}
                  onChange={(e) => {
                    if (typeof e.target.value === 'string') setSubjectId(e.target.value);
                  }}
                >
                  {filteredSubjects?.map((item: BaseSubject) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item className={classes.titleItem}>
                <InputBase
                  className={classes.title}
                  value={getTitle()}
                  onChange={(event) => studyNoteChangeHandler('title', event.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                />
              </Grid>
              <Grid item container className={classes.dateItem}>
                <Grid item container className={classes.date}>
                  {moment(date).format('DD.MM.YYYY')}
                  <img
                    src={studyNote.isFavorite ? FavoriteYellow : FavoriteGrey}
                    alt={'favorite'}
                    onClick={() => studyNoteChangeHandler('isFavorite', !studyNote.isFavorite)}
                    className={classes.favorite}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Editor
              reload={reloadEditor}
              value={studyNote.body || ''}
              onChange={(body) => studyNoteChangeHandler('body', body)}
            />
            <Grid item className={classes.studyCardItem}>
              <Button
                disableElevation
                disableRipple
                className={classes.studyCardButton}
                onClick={() => setStudyCardsOpen(true)}
              >
                <img src={CardsDial} alt="" />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <StudyCardsModal isOpen={studyCardsOpen} closeAction={() => setStudyCardsOpen(false)} />
    </>
  );
};

export default withTranslation()(StudyNotes);
