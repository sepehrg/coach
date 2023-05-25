import React, { useCallback } from 'react';
import MuiTextField from '@mui/material/TextField';
import { fieldToTextField, TextFieldProps } from 'formik-mui';

const FormTextField: React.FC<TextFieldProps> = (props) => {
  const {
    form: { setFieldValue, setFieldTouched, validateField },
    field: { name, value },
    multiline,
    rows,
    onFocus,
    onBlur,
    classes,
  } = props;
  const onChange = useCallback(
    (event: { target: any }) => {
      const { value } = event.target;
      setFieldValue(name, value);
      setFieldTouched(name, true);
      validateField(name);
    },
    [setFieldValue, setFieldTouched, validateField, name],
  );
  return (
    <MuiTextField
      {...fieldToTextField({
        ...props,
        InputProps: {
          fullWidth: true,
          value: value,
          multiline,
          rows,
          onFocus,
          onBlur,
          classes,
          ...props.InputProps,
        },
      })}
      onChange={onChange}
    />
  );
};

export default FormTextField;
