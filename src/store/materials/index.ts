import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import {
  changePage,
  clearSelectedMaterial,
  createMaterialFeedbackRequest,
  createMaterialHistoryRequest,
  createNewLinkRequest,
  filterMaterials,
  getMaterialsBySubjctRequest,
  getMaterialsHistoryRequest,
  getMaterialsLinksRequest,
  getMaterialsTopicsRequest,
  resetMaterial,
  selectMaterial,
} from './materials.actions';
import { LikedMaterial, MaterialLearningTypes, MaterialsLinksPayload } from 'entities/Material';

export const useMaterialActions = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => ({
      getBySubject: (subjectId: string) => {
        dispatch(getMaterialsBySubjctRequest(subjectId));
      },
      createFeedback: (materialId: string, isLiked: boolean) => {
        dispatch(createMaterialFeedbackRequest({ materialId, isLiked }));
      },
      createHistory: (materialId: string) => {
        dispatch(createMaterialHistoryRequest({ materialId }));
      },
      getHistory: (subjectId: string, page: number, limit: number) => {
        dispatch(getMaterialsHistoryRequest({ subjectId, page, limit }));
      },
      createNewLink: (
        link: string,
        description: string,
        subject: string,
        onSuccess: () => void,
      ) => {
        dispatch(createNewLinkRequest({ link, description, subject }, onSuccess));
      },
      getMaterialsTopics: (tagId: string, gradeId: string, subjectId: string) => {
        dispatch(getMaterialsTopicsRequest({ tagId, gradeId, subjectId }));
      },
      getMaterialsLinks: (payload: MaterialsLinksPayload) => {
        dispatch(getMaterialsLinksRequest(payload));
      },
      dispatchSelectMaterial: (material: LikedMaterial, index: number) => {
        dispatch(selectMaterial({ material, index }));
      },
      resetMaterials: () => {
        dispatch(resetMaterial());
      },
      dispatchClearSelectedMaterial: () => {
        dispatch(clearSelectedMaterial());
      },
      changePage: (newPage: number) => {
        dispatch(changePage(newPage));
      },
      filterMaterials: (learningType: MaterialLearningTypes | null) => {
        dispatch(filterMaterials(learningType));
      },
    }),
    [dispatch],
  );
};
