import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EduDatePicker from 'components/ui/DatePicker';
import { withTranslation, WithTranslation } from 'react-i18next';
import GoBackArrow from 'components/ui/GoBackArrow';

interface PasswordStepProps {
  handler: (value: Date) => void;
  changeStepIndex: (value: number) => void;
  redirectAction: () => void;
  value: Date;
}

const BirthdayStep: React.FC<PasswordStepProps & WithTranslation> = ({
  changeStepIndex,
  handler,
  redirectAction,
  value,
  t,
}) => {
  useEffect(() => {
    changeStepIndex(3);
  }, [changeStepIndex]);

  const [buttonDisable, setButtonDisable] = useState<boolean>(true);

  return (
    <Box style={{ position: 'relative', display: 'flex', flexDirection: 'column', width: 360 }}>
      <Typography variant={'body1'} style={{ marginBottom: '12px' }}>
        {t('Register.Birthday Step.When is your birthday')}
      </Typography>
      <EduDatePicker
        handler={(date) => {
          setButtonDisable(false);
          if (date !== null) {
            handler(date);
          }
        }}
        value={value}
      />
      <br />
      <Button
        variant="contained"
        color={'primary'}
        disableElevation
        onClick={redirectAction}
        disabled={buttonDisable}
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

export default withTranslation()(BirthdayStep);
