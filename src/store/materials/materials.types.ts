import {
  Material,
  MaterialHistory,
  MaterialHistoryResponse,
  MaterialLearningTypes,
  MaterialLink,
  MaterialResponse,
  MaterialsHistoryPayload,
  MaterialsLinksPayload,
  MaterialsTopicsPayload,
  MaterialTopic,
  NewLinkRequest,
  RelatedTag,
  SelectedMaterial,
} from 'entities/Material';

export const GET_MATERIALS_REQUEST = 'GET_MATERIALS_REQUEST';
export const GET_MATERIALS_SUCCESS = 'GET_MATERIALS_SUCCESS';
export const SELECT_MATERIAL = 'SELECT_MATERIAL';
export const CLEAR_SELECTED_MATERIAL = 'CLEAR_SELECTED_MATERIAL';
export const RESET_MATERIAL = 'RESET_MATERIAL';
export const GET_MATERIALS_BY_SUBJECT_REQUEST = 'GET_MATERIALS_BY_SUBJECT_REQUEST';
export const CREATE_MATERIAL_FEEDBACK_REQUEST = 'CREATE_MATERIAL_FEEDBACK_REQUEST';
export const CREATE_MATERIAL_HISTORY_REQUEST = 'CREATE_MATERIAL_HISTORY_REQUEST';
export const CREATE_NEW_LINK_REQUEST = 'CREATE_NEW_LINK_REQUEST';
export const GET_MATERIALS_TOPICS_REQUEST = 'GET_MATERIALS_TOPICS_REQUEST';
export const GET_MATERIALS_TOPICS_SUCCESS = 'GET_MATERIALS_TOPICS_SUCCESS';
export const GET_MATERIALS_LINKS_REQUEST = 'GET_MATERIALS_LINKS_REQUEST';
export const GET_MATERIALS_LINKS_SUCCESS = 'GET_MATERIALS_LINKS_SUCCESS';
export const GET_MATERIALS_HISTORY_REQUEST = 'GET_MATERIALS_HISTORY_REQUEST';
export const GET_MATERIALS_HISTORY_SUCCESS = 'GET_MATERIALS_HISTORY_SUCCESS';
export const CHANGE_PAGE = 'MATERIALS_CHANGE_PAGE';
export const FILTER_MATERIALS = 'FILTER_MATERIALS';
export const RESET_FILTER_MATERIALS = 'RESET_FILTER_MATERIALS';

export interface MaterialsState {
  data: Material[];
  selectedItem: SelectedMaterial | null;
  topics: MaterialTopic[];
  allMaterialsLinks: MaterialLink[];
  materialsHistory: MaterialHistory[];
  relatedTags: RelatedTag[];
  page: number;
  historyPageCount: number;
  filteredMaterialType: MaterialLearningTypes | null;
}

export interface GetMaterialsRequest {
  type: typeof GET_MATERIALS_REQUEST;
}

export interface GetMaterialBySubjectRequest {
  type: typeof GET_MATERIALS_BY_SUBJECT_REQUEST;
  payload: string;
}

export interface CreateNewLinkRequest {
  type: typeof CREATE_NEW_LINK_REQUEST;
  payload: NewLinkRequest;
  onSuccess: () => void;
}

export interface GetMaterialsSuccess {
  type: typeof GET_MATERIALS_SUCCESS;
  payload: Material[];
}

export interface CreateMaterialFeedbackRequest {
  type: typeof CREATE_MATERIAL_FEEDBACK_REQUEST;
  payload: { materialId: string; isLiked: boolean };
}

export interface CreateMaterialHistoryRequest {
  type: typeof CREATE_MATERIAL_HISTORY_REQUEST;
  payload: { materialId: string };
}

export interface SelectMaterial {
  type: typeof SELECT_MATERIAL;
  payload: SelectedMaterial;
}

export interface ClearSelectedMaterial {
  type: typeof CLEAR_SELECTED_MATERIAL;
}

export interface ResetMaterial {
  type: typeof RESET_MATERIAL;
}

export interface GetMaterialsTopicsRequest {
  type: typeof GET_MATERIALS_TOPICS_REQUEST;
  payload: MaterialsTopicsPayload;
}

export interface GetMaterialsTopicsSuccess {
  type: typeof GET_MATERIALS_TOPICS_SUCCESS;
  payload: MaterialTopic[];
}

export interface GetMaterialsLinksRequest {
  type: typeof GET_MATERIALS_LINKS_REQUEST;
  payload: MaterialsLinksPayload;
}

export interface GetMaterialsLinksSuccess {
  type: typeof GET_MATERIALS_LINKS_SUCCESS;
  payload: MaterialResponse;
}

export interface ChangePage {
  type: typeof CHANGE_PAGE;
  payload: number;
}

export interface GetMaterialsHistoryRequest {
  type: typeof GET_MATERIALS_HISTORY_REQUEST;
  payload: MaterialsHistoryPayload;
}

export interface GetMaterialsHistorySuccess {
  type: typeof GET_MATERIALS_HISTORY_SUCCESS;
  payload: MaterialHistoryResponse;
}

export interface FilterMaterials {
  type: typeof FILTER_MATERIALS;
  learningType: MaterialLearningTypes | null;
}

export type MaterialsActionTypes =
  | GetMaterialsRequest
  | GetMaterialsSuccess
  | SelectMaterial
  | ClearSelectedMaterial
  | ResetMaterial
  | GetMaterialBySubjectRequest
  | CreateMaterialFeedbackRequest
  | CreateMaterialHistoryRequest
  | CreateNewLinkRequest
  | GetMaterialsTopicsRequest
  | GetMaterialsTopicsSuccess
  | GetMaterialsLinksRequest
  | GetMaterialsLinksSuccess
  | GetMaterialsHistoryRequest
  | GetMaterialsHistorySuccess
  | ChangePage
  | FilterMaterials;
