import _ from 'lodash-es';

export const phoneNumberRegex =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const serverSideValidateField = (
  validationRequest: (value: string, onSuccess: () => void, onError: () => void) => void,
) =>
  _.debounce((value: string, onSuccess: () => void, onError: () => void) => {
    validationRequest(value, onSuccess, onError);
  }, 2000);
