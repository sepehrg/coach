import React, { useState, useCallback, useEffect } from 'react';
import useStyles from './SubjectsStep.styles';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { subjectsDataSelector } from 'store/subjects/subjects.selectors';
import { Subject } from 'entities/Subject';
import Box from '@mui/material/Box';
import _ from 'lodash-es';
import Button from '@mui/material/Button';
import GoBackArrow from 'components/ui/GoBackArrow';
import SuggestedSubjectModal from 'pages/register/SubjectStep/components/SuggestedSubjectModal';
import { useSubjectsActions } from 'store/subjects';
import SubjectList from 'components/ui/SubjectsList';
import { WithTranslation, withTranslation } from 'react-i18next';
import DataPrivacyBox from 'pages/register/SubjectStep/components/DataPrivacyBox';

interface SubjectsStepProps {
  setSubjectField: (subjects: { id: string }[]) => void;
  submit: () => void;
}

const SubjectsStep: React.FC<SubjectsStepProps & WithTranslation> = ({
  setSubjectField,
  submit,
  t,
}) => {
  const { classes } = useStyles();
  const subjects = useSelector(subjectsDataSelector);
  const { createSuggested } = useSubjectsActions();

  const [selected, setSelected] = useState<Subject[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [agreed, setAgreed] = useState<boolean>(false);

  const handleChangeAgreed = useCallback(
    (e: any, val: boolean) => {
      setAgreed(val);
    },
    [setAgreed],
  );

  const handleToggleModal = useCallback(() => {
    setModal((prevState) => !prevState);
  }, [setModal]);

  const handleSubmitSuggested = (name: string, file: File) => {
    const data = new FormData();
    data.append('name', name);
    data.append('icon', file);
    createSuggested(data, () => handleToggleModal());
  };

  useEffect(() => {
    setSubjectField(selected.map((subject) => ({ id: subject.id })));
  }, [selected, setSubjectField]);

  const handleToggleSelect = (subject: Subject) => {
    if (_.some(selected, subject)) {
      setSelected((prevState) => prevState.filter((item) => subject.id !== item.id));
    } else {
      setSelected((prevState) => [...prevState, subject]);
    }
  };

  return (
    <Box style={{ width: 575, position: 'relative' }}>
      <Grid container direction={'column'} alignItems={'center'} className={classes.root}>
        <Grid item lg={12} justifyContent={'center'} style={{ marginBottom: '12px' }}>
          <Typography variant={'body1'}>
            {t('Register.Subject Step.Which subjects do you have')}
          </Typography>
        </Grid>
        <Grid item container>
          <SubjectList
            subjects={subjects}
            selected={selected}
            toggleSelect={handleToggleSelect}
            toggleModal={handleToggleModal}
          />
        </Grid>
        <Grid item lg={12}>
          <DataPrivacyBox checked={agreed} onCheck={handleChangeAgreed} />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color={'primary'}
            disableElevation
            style={{
              alignSelf: 'center',
              marginTop: '25px',
            }}
            disabled={selected.length === 0 || !agreed}
            onClick={submit}
          >
            {t('Register.Subject Step.Create Account')}
          </Button>
        </Grid>
      </Grid>
      <Box style={{ position: 'absolute', top: '40%', left: -100 }}>
        <GoBackArrow />
      </Box>
      <SuggestedSubjectModal
        isOpen={modal}
        onClose={handleToggleModal}
        onSubmit={handleSubmitSuggested}
      />
    </Box>
  );
};

export default withTranslation()(SubjectsStep);
