import {
  Material,
  MaterialHistoryResponse,
  MaterialLearningTypes,
  MaterialResponse,
  MaterialsHistoryPayload,
  MaterialsLinksPayload,
  MaterialsTopicsPayload,
  MaterialTopic,
  NewLinkRequest,
  SelectedMaterial,
} from 'entities/Material';
import {
  CHANGE_PAGE,
  CLEAR_SELECTED_MATERIAL,
  CREATE_MATERIAL_FEEDBACK_REQUEST,
  CREATE_MATERIAL_HISTORY_REQUEST,
  CREATE_NEW_LINK_REQUEST,
  FILTER_MATERIALS,
  GET_MATERIALS_BY_SUBJECT_REQUEST,
  GET_MATERIALS_HISTORY_REQUEST,
  GET_MATERIALS_HISTORY_SUCCESS,
  GET_MATERIALS_LINKS_REQUEST,
  GET_MATERIALS_LINKS_SUCCESS,
  GET_MATERIALS_REQUEST,
  GET_MATERIALS_SUCCESS,
  GET_MATERIALS_TOPICS_REQUEST,
  GET_MATERIALS_TOPICS_SUCCESS,
  MaterialsActionTypes,
  RESET_MATERIAL,
  SELECT_MATERIAL,
} from './materials.types';

export const getMaterialsRequest = (): MaterialsActionTypes => ({
  type: GET_MATERIALS_REQUEST,
});

export const getMaterialsBySubjctRequest = (payload: string): MaterialsActionTypes => ({
  type: GET_MATERIALS_BY_SUBJECT_REQUEST,
  payload,
});

export const getMaterialsSuccess = (payload: Material[]): MaterialsActionTypes => ({
  type: GET_MATERIALS_SUCCESS,
  payload,
});

export const getMaterialsTopicsRequest = (
  payload: MaterialsTopicsPayload,
): MaterialsActionTypes => ({
  type: GET_MATERIALS_TOPICS_REQUEST,
  payload,
});

export const getMaterialsTopicsSuccess = (payload: MaterialTopic[]): MaterialsActionTypes => ({
  type: GET_MATERIALS_TOPICS_SUCCESS,
  payload,
});

export const getMaterialsLinksRequest = (payload: MaterialsLinksPayload): MaterialsActionTypes => ({
  type: GET_MATERIALS_LINKS_REQUEST,
  payload,
});

export const getMaterialsLinksSuccess = (payload: MaterialResponse): MaterialsActionTypes => ({
  type: GET_MATERIALS_LINKS_SUCCESS,
  payload,
});

export const createNewLinkRequest = (
  payload: NewLinkRequest,
  onSuccess: () => void,
): MaterialsActionTypes => ({
  type: CREATE_NEW_LINK_REQUEST,
  payload,
  onSuccess,
});

export const selectMaterial = (payload: SelectedMaterial): MaterialsActionTypes => ({
  type: SELECT_MATERIAL,
  payload,
});

export const createMaterialFeedbackRequest = (payload: {
  materialId: string;
  isLiked: boolean;
}): MaterialsActionTypes => ({
  type: CREATE_MATERIAL_FEEDBACK_REQUEST,
  payload,
});

export const createMaterialHistoryRequest = (payload: {
  materialId: string;
}): MaterialsActionTypes => ({
  type: CREATE_MATERIAL_HISTORY_REQUEST,
  payload,
});

export const getMaterialsHistoryRequest = (
  payload: MaterialsHistoryPayload,
): MaterialsActionTypes => ({
  type: GET_MATERIALS_HISTORY_REQUEST,
  payload,
});

export const getMaterialsHistorySuccess = (
  payload: MaterialHistoryResponse,
): MaterialsActionTypes => ({
  type: GET_MATERIALS_HISTORY_SUCCESS,
  payload,
});

export const clearSelectedMaterial = (): MaterialsActionTypes => ({
  type: CLEAR_SELECTED_MATERIAL,
});

export const resetMaterial = (): MaterialsActionTypes => ({
  type: RESET_MATERIAL,
});

export const changePage = (payload: number): MaterialsActionTypes => ({
  type: CHANGE_PAGE,
  payload,
});

export const filterMaterials = (
  learningType: MaterialLearningTypes | null,
): MaterialsActionTypes => ({
  type: FILTER_MATERIALS,
  learningType,
});
