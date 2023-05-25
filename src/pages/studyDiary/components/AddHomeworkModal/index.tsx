import React, { useState, useCallback, useEffect } from 'react';
import useStyles from './AddHomeworkModal.styles';
import { Dialog, DialogContent, IconButton, MenuItem, TextField } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import Typography from '@mui/material/Typography';
import FormTextField from 'components/ui/FormTextField';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { TaskCreateRequest, TaskEditRequest, TaskType } from 'entities/Task';
import { tasksSelector } from 'store/tasks/tasks.selectors';
import Box from '@mui/material/Box';
import { useTasksActions } from 'store/tasks';
import * as Yup from 'yup';
import moment from 'moment';
import { withTranslation, WithTranslation } from 'react-i18next';

import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import FormSelectField from 'components/ui/FormSelectField';
import { DialogClose } from 'components/ui/PageInfo/assets';
import { subjectsDataSelector } from 'store/subjects/subjects.selectors';
import { Subject } from 'entities/Subject';
import { profileSelector } from 'store/auth/auth.selectors';
import { isEmpty } from 'lodash-es';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { TaskTypeData } from 'pages/studyDiary';

interface AddHomeworkModalProps {
  onClose: (openTaskType?: boolean) => void;
  onCreate: (data: TaskCreateRequest) => void;
  onEdit: (data: TaskEditRequest) => void;
  isOpen: boolean;
  type: TaskType;
  elementId: string;
  taskTypesDatas: TaskTypeData[];
}

interface Frequency {
  key: string;
  value: string;
}

const AddHomeworkModal: React.FC<AddHomeworkModalProps & WithTranslation> = ({
  onClose,
  isOpen,
  onCreate,
  onEdit,
  type,
  elementId,
  t,
  taskTypesDatas,
}) => {
  const { classes } = useStyles();
  const { selectedItem: selectedTask } = useSelector(tasksSelector);
  const { clear } = useTasksActions();
  const subjects = useSelector(subjectsDataSelector);
  const profile = useSelector(profileSelector);

  const HomeWorkSchema = Yup.object().shape({
    title: Yup.string()
      .min(1, t('Validation.Common.Too Short') as string)
      .max(30, t('Validation.Common.Too Long') as string)
      .required(t('Validation.Common.Required') as string),
    subject: Yup.string().required(t('Validation.Common.This field is required') as string),
    startDate: Yup.date(),
    details: Yup.string(),
    recurringType: Yup.string().required(t('Validation.Common.This field is required') as string),
  });

  const [picking, setPicking] = useState<boolean>(false);
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);

  const handleTogglePicking = useCallback(() => {
    setPicking((prevState) => !prevState);
  }, [setPicking]);

  useEffect(() => {
    return () => {
      clear();
    };
  }, [clear]);

  useEffect(() => {
    if (!isEmpty(subjects))
      setFilteredSubjects(
        subjects
          .filter((subject) => (profile?.native ? subject.native : subject.nonnative))
          .map((subject) => ({ ...subject, name: t(`Study.Subjects.${subject.name}`) })),
      );
  }, [subjects, profile, t]);

  const frequencies: Frequency[] = [
    { key: 'Once', value: t('Study.Frequencies.Once') },
    { key: 'Weekly', value: t('Study.Frequencies.Weekly') },
    // { key: 'Workdays', value: t('Study.Frequencies.Mo-Fr') },
    // { key: 'Weekends', value: t('Study.Frequencies.Only on weekends') },
    // { key: 'Monthly', value: t('Study.Frequencies.Monthly') },
  ];

  const getHeader = (taskType: TaskType) => {
    const task = taskTypesDatas.find((task) => task.taskType === taskType);
    return (
      <>
        <img src={task?.icon} alt={type} width={77} />
        {taskType !== TaskType.EXAM && (
          <Typography className={classes.header}>{t(`Study.${task?.title}`)}</Typography>
        )}
      </>
    );
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => onClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        className: classes.dialog,
      }}
      BackdropProps={{
        className: classes.backdrop,
      }}
    >
      <DialogContent className={classes.root}>
        <Box className={classes.close}>
          <IconButton onClick={() => onClose()} size="large">
            <img src={DialogClose} width={14} alt={'Close Button'} />
          </IconButton>
        </Box>
        <Formik
          // enableReinitialize
          initialValues={{
            title: selectedTask?.title || '',
            subject: selectedTask?.subjectId || filteredSubjects[0]?.id || '',
            startDate: selectedTask?.startDate || moment.utc().toDate(),
            details: selectedTask?.details || '',
            recurringType: selectedTask?.recurringType || 'Once',
          }}
          validationSchema={HomeWorkSchema}
          onSubmit={(values) => {
            if (selectedTask?.id) {
              onEdit({
                id: selectedTask.id,
                title: values.title,
                subjectId: values.subject,
                details: values.details,
                startDate: values.startDate,
              });
            } else {
              onCreate({
                title: values.title,
                subjectId: values.subject,
                details: values.details,
                startDate:
                  type === TaskType.EXAM ? values.startDate : moment.utc(elementId).toDate(),
                type,
                isFullDayEvent: type === TaskType.EXAM,
                recurringType: values.recurringType,
              });
            }
          }}
        >
          {({ submitForm, isValid, values, setFieldValue }) => (
            <Form autoComplete={'off'} style={{ width: '100%' }}>
              <Box className={classes.icon}>{getHeader(type)}</Box>
              <Typography className={classes.label}>
                {type === TaskType.EXAM
                  ? t('Study.Name of appointment')
                  : t('Study.What are you planning')}
              </Typography>
              <Field
                component={FormTextField}
                name={'title'}
                InputProps={{ className: classes.textField }}
                className={classes.fullWidth}
                multiline={true}
                rows={5}
              />
              {type === TaskType.EXAM && (
                <>
                  <Typography className={classes.label}>
                    {t('Study.Add Homework Modal.Subject')}
                  </Typography>
                  <Field
                    component={FormSelectField}
                    name={'subject'}
                    placeholder={t('Study.Add Homework Modal.Select subject')}
                    className={classes.fullWidth}
                  >
                    {filteredSubjects.map((item: Subject) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Field>
                  <Typography className={classes.label}>{t('Study.Date')}</Typography>

                  <TextField
                    type={'date'}
                    className={classes.fullWidth}
                    name={'startDate'}
                    InputProps={{
                      readOnly: true,
                      value: moment.utc(values.startDate).format('yyyy-MM-DD'), // moment(date).format('yyyy-MM-DD'),
                      className: classes.textField,
                    }}
                    // inputProps={{
                    //   min: moment().format('yyyy-MM-DD'),
                    // }}
                    onClick={handleTogglePicking}
                  />
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      value={values.startDate}
                      onChange={
                        (date: any) => {
                          setFieldValue('startDate', date);
                        } // handleChangeDate(date as Date)
                      }
                      animateYearScrolling
                      open={picking}
                      onClose={handleTogglePicking}
                      style={{ display: 'none' }}
                      minDate={new Date()}
                    />
                  </LocalizationProvider>
                </>
              )}
              <Field
                component={FormSelectField}
                className={classes.frequency}
                name={'recurringType'}
                disabled={!!selectedTask?.id}
              >
                {frequencies.map((item: Frequency) => (
                  <MenuItem key={item.key} value={item.key}>
                    {item.value}
                  </MenuItem>
                ))}
              </Field>
              <Box
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                }}
              >
                <Button
                  variant={'contained'}
                  disableElevation
                  color={'primary'}
                  onClick={submitForm}
                  disabled={!isValid}
                >
                  {t('Study.Add Homework Modal.Save')}
                </Button>
                {selectedTask?.id && (
                  <IconButton
                    className={classes.editBtn}
                    onClick={() => onClose(true)}
                    size="large"
                  >
                    <EditRoundedIcon />
                  </IconButton>
                )}
              </Box>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default withTranslation()(AddHomeworkModal);
