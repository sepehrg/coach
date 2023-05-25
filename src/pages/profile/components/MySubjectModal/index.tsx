import React, { useState, useCallback, useEffect } from 'react';
import { DialogContent, Dialog } from '@mui/material';
import SubjectList from 'components/ui/SubjectsList';
import { useSelector } from 'react-redux';
import { profileSelector } from 'store/auth/auth.selectors';
import { Subject } from 'entities/Subject';
import { subjectsDataSelector } from 'store/subjects/subjects.selectors';
import _ from 'lodash-es';
import SuggestedSubjectModal from 'pages/register/SubjectStep/components/SuggestedSubjectModal';
import { useSubjectsActions } from 'store/subjects';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Student } from 'entities/Student';
import { WithTranslation, withTranslation } from 'react-i18next';

interface MySubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (subjects: { id: string }[]) => void;
}

const MySubjectModal: React.FC<MySubjectModalProps & WithTranslation> = ({
  isOpen,
  onClose,
  onSubmit,
  t,
}) => {
  const profile = useSelector(profileSelector);
  const subjects = useSelector(subjectsDataSelector);
  const { createSuggested } = useSubjectsActions();

  useEffect(() => {
    if (!_.isEmpty(subjects)) {
      subjects.forEach((subject: Subject) => {
        subject.students.forEach((student: Student) => {
          if (student.id === profile?.id) {
            setSelected((prevState) => [...prevState, subject]);
          }
        });
      });
    }
  }, [subjects, profile]);

  const [selected, setSelected] = useState<Subject[]>([]);
  const [modal, setModal] = useState<boolean>(false);

  const handleToggleSelect = async (subject: Subject) => {
    if (_.some(selected, subject)) {
      await setSelected((prevState) => prevState.filter((item) => subject.id !== item.id));
    } else {
      await setSelected((prevState) => [...prevState, subject]);
    }
  };

  const handleToggleModal = useCallback(() => {
    setModal((prevState) => !prevState);
  }, [setModal]);

  const handleSubmitSuggested = (name: string, file: File) => {
    const data = new FormData();
    data.append('name', name);
    data.append('icon', file);
    createSuggested(data, () => handleToggleModal());
  };

  const handleSubmit = useCallback(() => {
    onSubmit(selected.map((subject) => ({ id: subject.id })));
  }, [selected, onSubmit]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent style={{ width: 350 }}>
        <SubjectList
          subjects={subjects}
          selected={selected}
          toggleSelect={handleToggleSelect}
          toggleModal={handleToggleModal}
        />
        <Box style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Button
            variant={'contained'}
            disableElevation
            color={'primary'}
            style={{ margin: '15px 0' }}
            onClick={handleSubmit}
            disabled={selected.length === 0}
          >
            {t('Profile.Save Changes')}
          </Button>
        </Box>
      </DialogContent>
      <SuggestedSubjectModal
        isOpen={modal}
        onClose={handleToggleModal}
        onSubmit={handleSubmitSuggested}
      />
    </Dialog>
  );
};

export default withTranslation()(MySubjectModal);
