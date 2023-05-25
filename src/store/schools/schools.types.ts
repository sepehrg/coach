import { School } from 'entities';

export const GET_SCHOOLS_REQUEST = 'GET_SCHOOLS_REQUEST';
export const GET_SCHOOLS_SUCCESS = 'GET_SCHOOLS_SUCCESS';

export interface SchoolsState {
  data: School[];
}

export interface GetSchoolsRequest {
  type: typeof GET_SCHOOLS_REQUEST;
}

export interface GetSchoolsSuccess {
  type: typeof GET_SCHOOLS_SUCCESS;
  payload: School[];
}

export type SchoolsActionsType = GetSchoolsRequest | GetSchoolsSuccess;
