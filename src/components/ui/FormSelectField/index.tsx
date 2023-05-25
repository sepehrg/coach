import React, { useCallback } from 'react';
import Select from '@mui/material/Select';
import { fieldToSelect, SelectProps } from 'formik-mui';

const FormSelectField: React.FC<SelectProps> = ({ children, ...props }) => {
  const {
    form: { setFieldValue, validateField, errors, touched, setTouched },
    field: { name },
    classes,
    ...rest
  } = props;

  const onChange = useCallback(
    async (event: any) => {
      const { value } = event.target;
      setFieldValue(name, value);
      validateField(name);
      setTouched({ ...touched, [name]: true });
    },
    [setFieldValue, validateField, setTouched, touched, name],
  );

  return (
    <>
      <Select
        {...fieldToSelect({
          ...props,
          inputProps: { classes },
        })}
        IconComponent={() => <span />}
        onChange={onChange}
        {...rest}
      >
        {children}
      </Select>
      {errors[name] && touched[name] && (
        <p style={{ color: 'red', padding: 5 }}>{errors[name]?.toString()}</p>
      )}
    </>
  );
};

export default FormSelectField;
