import _ from 'lodash-es';
import React, { useState } from 'react';
import useStyles from './SearchField.styles';
import Box from '@mui/material/Box';
import * as Assets from './assets';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Formik, Form, Field } from 'formik';
import FormTextField from '../../../components/ui/FormTextField';
import * as Yup from 'yup';
import { t } from 'i18next';

const SearchSchema = Yup.object().shape({
  query: Yup.string().min(2, 'Min 2 symbols').required(t('Validation.Common.Required').toString()),
});

interface SearchFieldProps {
  placeholder: string;
  action: (value: string) => void;
  searchHistory: string[];
  deleteHistoryItem: (value: string) => void;
}

const SearchField: React.FC<SearchFieldProps> = ({
  placeholder,
  action,
  searchHistory,
  deleteHistoryItem,
}) => {
  const { classes } = useStyles();
  const [complete, setComplete] = useState<boolean>(false);

  return (
    <Formik
      initialValues={{ query: '' }}
      validationSchema={SearchSchema}
      initialErrors={{ query: 'Not filled' }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        setComplete(false);
        action(values.query);
      }}
    >
      {({ submitForm, touched, errors, setFieldValue, validateField }) => (
        <Box style={{ width: 634 }}>
          <Form autoComplete={'off'}>
            <Box className={classes.root}>
              <Field
                component={FormTextField}
                name={'query'}
                type={'text'}
                style={{
                  width: '100%',
                }}
                onFocus={() => setComplete(true)}
                onBlur={() => {
                  _.delay(() => setComplete(false), 100);
                }}
                InputProps={{
                  style: {
                    marginLeft: '25px',
                    border: errors.query && touched.query ? '1px solid red' : '',
                  },
                }}
                onSubmit={submitForm}
                placeholder={placeholder}
              />
            </Box>
            <Box
              className={`${classes.autocompleteBox} ${
                complete ? classes.autoCompleteBoxActive : ''
              }`}
            >
              {searchHistory.map((label: string) => (
                <Box
                  key={label}
                  className={classes.recentItemBox}
                  onClick={async () => {
                    await setFieldValue('query', label);
                    validateField('query');
                    setComplete(false);
                    submitForm();
                  }}
                >
                  <Box className={classes.recentIconTitleBox}>
                    <img src={Assets.Recent} alt="Recent Result" className={classes.recentIcon} />
                    <Typography variant={'body1'}>{label}</Typography>
                  </Box>
                  <Button
                    onClick={(e: React.SyntheticEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      deleteHistoryItem(label);
                    }}
                  >
                    <Typography variant={'body1'}>Delete</Typography>
                  </Button>
                </Box>
              ))}
            </Box>
          </Form>
        </Box>
      )}
    </Formik>
  );
};

export default SearchField;
