import React, { useCallback, useState } from 'react';
import MuiTextField from '@mui/material/TextField';
import { fieldToTextField, TextFieldProps } from 'formik-mui';
import { InputAdornment } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import * as Ass from '../PasswordField/assets';

const FormPasswordField: React.FC<TextFieldProps> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);

  const {
    form: { setFieldValue, validateField },
    field: { name },
  } = props;
  const onChange = useCallback(
    (event: any) => {
      const { value } = event.target;
      setFieldValue(name, value);
      validateField(name);
    },
    [setFieldValue, validateField, name],
  );
  return (
    <MuiTextField
      {...fieldToTextField({
        ...props,
        InputProps: {
          type: visible ? 'text' : 'password',
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                style={{ background: 'none' }}
                aria-label="toggle password visibility"
                onClick={() => setVisible((prev) => !prev)}
                size="large"
              >
                <img src={visible ? Ass.EyeOpen : Ass.EyeClose} alt="Eye" width={24} height={24} />
              </IconButton>
            </InputAdornment>
          ),
        },
      })}
      onChange={onChange}
    />
  );
};

export default FormPasswordField;
