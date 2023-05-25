import { compile } from 'path-to-regexp';

export const createLink = (path = '/', params = {}) => {
  try {
    const link = compile(path)(params);

    return link;
  } catch (e) {
    return '#';
  }
};
