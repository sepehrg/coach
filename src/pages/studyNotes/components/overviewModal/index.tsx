import React, { useCallback, useEffect, useState } from 'react';
import useStyles from './OverviewModal.style';
import {
  Dialog,
  DialogContent,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { withTranslation, WithTranslation } from 'react-i18next';
import NotesList from '../notesList';
import { useSelector } from 'react-redux';
import { subjectsSelector } from 'store/subjects/subjects.selectors';
import FormSelectField from 'components/ui/FormSelectField';
import { BaseSubject, Subject } from 'entities/Subject';
import { Field, Form, Formik } from 'formik';
import { profileSelector } from 'store/auth/auth.selectors';
import _ from 'lodash-es';
import moment from 'moment';
import { useStudyNotesActions } from 'store/studyNotes';
import { overviewStudyNotesSelector } from 'store/studyNotes/studyNotes.selectors';

interface OverviewModalProps {
  isOpen: boolean;
  closeAction: () => void;
  submitAction: (id: Date) => void;
}

export interface Note {
  id: number;
  title: string;
  date: number;
}

interface Month {
  id: number;
  name: string;
}

const OverviewModal: React.FC<OverviewModalProps & WithTranslation> = ({
  isOpen,
  closeAction,
  submitAction,
  t,
}) => {
  const { classes } = useStyles();
  const { data: subjects } = useSelector(subjectsSelector);
  const overviewStudyNotes = useSelector(overviewStudyNotesSelector);
  const profile = useSelector(profileSelector);
  const { getStudyNoteOverview } = useStudyNotesActions();

  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date(moment().year(), moment().month()));
  const [endDate, setEndDate] = useState<Date>(new Date(moment().year(), moment().month() + 1));
  const [month, setMonth] = useState<number>(moment().month() + 1);
  const [year, setYear] = useState<number>(moment().year());
  const [subjectId, setSubjectId] = useState<string>('');

  useEffect(() => {
    if (!_.isEmpty(subjects))
      setFilteredSubjects(
        subjects
          .filter((subject) => (profile?.native ? subject.native : subject.nonnative))
          .map((subject) => ({ ...subject, name: t(`Study.Subjects.${subject.name}`) })),
      );
  }, [subjects, profile, t]);

  const toDateString = (date: Date) => moment(date).format('YYYY-MM-DD');

  const getOverview = useCallback(
    (startDate: Date, endDate: Date) =>
      getStudyNoteOverview({
        startDate: toDateString(startDate),
        endDate: toDateString(endDate),
        ...(subjectId && { subjectId }),
      }),
    [getStudyNoteOverview, subjectId],
  );

  useEffect(() => {
    getOverview(startDate, endDate); // eslint-disable-next-line
  }, [getOverview, startDate, subjectId]);

  const months: Month[] = [
    { id: 1, name: t('Study Notes.Month.January') },
    { id: 2, name: t('Study Notes.Month.February') },
    { id: 3, name: t('Study Notes.Month.March') },
    { id: 4, name: t('Study Notes.Month.April') },
    { id: 5, name: t('Study Notes.Month.May') },
    { id: 6, name: t('Study Notes.Month.June') },
    { id: 7, name: t('Study Notes.Month.July') },
    { id: 8, name: t('Study Notes.Month.August') },
    { id: 9, name: t('Study Notes.Month.September') },
    { id: 10, name: t('Study Notes.Month.October') },
    { id: 11, name: t('Study Notes.Month.November') },
    { id: 12, name: t('Study Notes.Month.December') },
  ];

  const years = Array(10)
    .fill(0)
    .map((v, i) => 2022 + i);

  useEffect(() => {
    setStartDate(new Date(year, month - 1));
    setEndDate(new Date(year, month, 0));
  }, [year, month]);

  return (
    <Dialog
      PaperProps={{ className: classes.dialog }}
      BackdropProps={{
        className: classes.backdrop,
      }}
      open={isOpen}
      onClose={closeAction}
    >
      <DialogContent className={classes.root}>
        <Grid container className={classes.container}>
          <Grid item className={classes.row}>
            <Typography className={classes.title}>
              {t('Study Notes.Overview of your notes')}
            </Typography>
          </Grid>
          <Grid item className={classes.row}>
            <Formik
              initialValues={{
                subjectId: '',
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1,
              }}
              onSubmit={() => {
                return;
              }}
            >
              {() => (
                <Form>
                  <Grid container direction="column" className={classes.search}>
                    <Grid item>
                      <Grid container className={classes.date}>
                        <Grid item className={classes.dateItem}>
                          <Select
                            className={classes.subjects}
                            value={year}
                            onChange={(e: SelectChangeEvent<number>) =>
                              setYear(e.target.value as number)
                            }
                          >
                            {years.map((year: number) => (
                              <MenuItem key={year} value={year}>
                                {year}
                              </MenuItem>
                            ))}
                          </Select>
                        </Grid>
                        <Grid item className={classes.dateItem}>
                          <Select
                            className={classes.subjects}
                            value={month}
                            onChange={(e: SelectChangeEvent<number>) =>
                              setMonth(e.target.value as number)
                            }
                          >
                            {months.map((month: Month) => (
                              <MenuItem key={month.id} value={month.id}>
                                {month.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Field
                        component={FormSelectField}
                        className={classes.subjects}
                        name={'subject'}
                        displayEmpty={true}
                        value={subjectId}
                        onChange={(e: any) => setSubjectId(e.target.value)}
                        renderValue={(value: string) =>
                          value?.length ? (
                            filteredSubjects.find((subject) => subject.id === value)?.name
                          ) : (
                            <em style={{ opacity: 0.6 }}>{t('Study Notes.Select subject')}</em>
                          )
                        }
                      >
                        {filteredSubjects?.map((item: BaseSubject) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Field>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
          <Grid item className={classes.row}>
            <NotesList notes={overviewStudyNotes} onNoteSelect={submitAction} height={238} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default withTranslation()(OverviewModal);
