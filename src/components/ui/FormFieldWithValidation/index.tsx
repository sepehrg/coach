import _ from 'lodash-es';
import React, { useCallback } from 'react';
import MuiTextField from '@mui/material/TextField';
import { fieldToTextField, TextFieldProps } from 'formik-mui';

interface FormTextFieldWithValidationCustomProps {
  validationRequest: (
    value: string,
    onValidated: () => void,
    setError: (errorMessage: string) => void,
  ) => void;
  setValidated: (value: boolean) => void;
}

const FormTextFieldWithValidation: React.FC<
  TextFieldProps & FormTextFieldWithValidationCustomProps
> = (props) => {
  const {
    form: { setFieldValue, setFieldTouched, validateField, setFieldError },
    field: { name },
    multiline,
    rows,
    onFocus,
    onBlur,
    validationRequest,
    setValidated,
  } = props;

  const debounceValidation = useCallback(
    (value: any) =>
      _.debounce(value)((value: string) => {
        validationRequest(
          value,
          () => setValidated(true),
          (errorMessage: string) => {
            setFieldError(name, errorMessage);
          },
        );
      }, 1000),
    [name, setFieldError, setValidated, validationRequest],
  );

  const onChange = useCallback(
    (event: any) => {
      const { value } = event.target;
      setFieldValue(name, value);
      setFieldTouched(name, true);
      validateField(name);
      setValidated(false);
      debounceValidation(value);
    },
    [debounceValidation, setFieldTouched, setFieldValue, validateField, setValidated, name],
  );
  return (
    <MuiTextField
      {...fieldToTextField({
        ...props,
        InputProps: {
          fullWidth: true,
          multiline,
          rows,
          onFocus,
          onBlur,
        },
      })}
      onChange={onChange}
    />
  );
};

export default FormTextFieldWithValidation;
