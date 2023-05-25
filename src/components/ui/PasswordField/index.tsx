import React, { useState } from 'react';
import { Input } from '@mui/material';
import * as Assets from './assets';
import useStyles from './PasswordField.styles';

interface PasswordFieldProps {
  placeholder: string;
  handler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ placeholder, handler }) => {
  const [type, setType] = useState<'password' | 'text'>('password');
  const { classes } = useStyles();

  const handleChangeHidden = () => {
    setType((prev) => {
      switch (prev) {
        case 'text':
          return 'password';
        case 'password':
          return 'text';
      }
    });
  };

  return (
    <span className={classes.root}>
      <Input type={type} placeholder={placeholder} style={{ width: '100%' }} onChange={handler} />
      <img
        className={classes.icon}
        onClick={handleChangeHidden}
        src={type === 'password' ? Assets.EyeClose : Assets.EyeOpen}
        alt="Eye for password"
      />
    </span>
  );
};

export default PasswordField;
