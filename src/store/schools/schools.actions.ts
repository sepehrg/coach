import { School } from 'entities';
import { GET_SCHOOLS_REQUEST, GET_SCHOOLS_SUCCESS, SchoolsActionsType } from './schools.types';

export const getSchoolsRequest = (): SchoolsActionsType => ({
  type: GET_SCHOOLS_REQUEST,
});

export const getSchoolsSuccess = (payload: School[]): SchoolsActionsType => ({
  type: GET_SCHOOLS_SUCCESS,
  payload,
});
