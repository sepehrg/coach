import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import 'react-datepicker/dist/react-datepicker.css';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { Field } from 'formik';
import FormSelectField from 'components/ui/FormSelectField';
import MenuItem from '@mui/material/MenuItem';
import { schoolsSelector } from 'store/schools/schools.selectors';
import { School } from 'entities';
import { gradesSelector } from 'store/grade/grade.selectors';
import { Grade } from 'entities/Grade';
import { withTranslation, WithTranslation } from 'react-i18next';
import GoBackArrow from 'components/ui/GoBackArrow';

interface PasswordStepProps {
  changeStepIndex: (value: number) => void;
  redirectAction: () => void;
  errorSchool: string | undefined;
  errorGrade: string | undefined;
  setGrade: (grade: number) => void;
  setSchool: (school: string) => void;
}

const SchoolStep: React.FC<PasswordStepProps & WithTranslation> = ({
  changeStepIndex,
  redirectAction,
  errorSchool,
  errorGrade,
  setGrade,
  setSchool,
  t,
}) => {
  const schools = useSelector(schoolsSelector);
  const grades = useSelector(gradesSelector);

  useEffect(() => {
    changeStepIndex(4);
  }, [changeStepIndex]);

  return (
    <Box style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
      <Box style={{ marginBottom: '35px' }}>
        <Typography variant={'body1'} style={{ marginBottom: '12px' }}>
          {t('Register.School Step.What is your school name')}
        </Typography>
        <Field component={FormSelectField} name={'school'}>
          {schools.data.map((item: School) => (
            <MenuItem key={item.id} value={item.id} onClick={() => setSchool(item.name)}>
              {item.name}
            </MenuItem>
          ))}
        </Field>
      </Box>
      <Box>
        <Typography variant={'body1'} style={{ marginBottom: '12px' }}>
          {t('Register.School Step.Choose your class')}
        </Typography>
        <Field component={FormSelectField} name={'grade'}>
          {grades.data.map((item: Grade) => (
            <MenuItem key={item.id} value={item.id} onClick={() => setGrade(item.year)}>
              {item.year}
            </MenuItem>
          ))}
        </Field>
      </Box>
      <br />
      <Button
        variant="contained"
        color={'primary'}
        disableElevation
        onClick={redirectAction}
        disabled={!!errorSchool || !!errorGrade}
        style={{
          alignSelf: 'center',
          marginTop: '25px',
        }}
      >
        {t('Register.Next')}
      </Button>
      <Box style={{ position: 'absolute', top: '40%', left: -100 }}>
        <GoBackArrow />
      </Box>
    </Box>
  );
};

export default withTranslation()(SchoolStep);
