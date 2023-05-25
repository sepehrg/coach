import HttpService from './http.service';
import {
  Material,
  MaterialLink,
  MaterialsHistoryPayload,
  MaterialsLinksPayload,
  MaterialsTopicsPayload,
  MaterialTopic,
} from '../entities/Material';

class MaterialsApi extends HttpService {
  MATERIAL_API = 'materials';

  getMaterials = async (): Promise<Material[]> => {
    return this.get(`${this.MATERIAL_API}`);
  };

  getTopics = async (payload: MaterialsTopicsPayload): Promise<MaterialTopic[]> => {
    return this.get(
      `${this.MATERIAL_API}/topics?tagId=${payload.tagId}&subjectId=${payload.subjectId}&gradeId=${payload.gradeId}`,
    );
  };

  getLinks = async (payload: MaterialsLinksPayload): Promise<MaterialLink[]> => {
    return this.get(
      `${this.MATERIAL_API}/links?tagName=${payload.tagName}&subjectId=${
        payload.subjectId
      }&gradeId=${payload.gradeId}${payload.filterTag ? `&filterTag=${payload.filterTag}` : ''}${
        payload.relatedTags ? `&relatedTags=${payload.relatedTags}` : ''
      }`,
    );
  };

  getMaterialsBySubjectId = async (subjectId: string): Promise<Material[]> => {
    return this.get(`${this.MATERIAL_API}?s={"subject.id":{"$eq":"${subjectId}"}}`);
  };

  createMaterialFeedback = (materialId: string, isLiked: boolean) => {
    return this.post(`${this.MATERIAL_API}/${materialId}/${isLiked ? 'like' : 'dislike'}`);
  };

  createMaterialHistory = (materialId: string) => {
    return this.post(`${this.MATERIAL_API}/${materialId}/visit`);
  };

  getMaterialHistory = (payload: MaterialsHistoryPayload) => {
    return this.get(`${this.MATERIAL_API}/history?&subjectId=${payload.subjectId}&page=1&limit=30`);
  };

  createNewLink = (link: string, description: string, subject: string) => {
    return this.post('suggested-materials', { link, subject, description });
  };
}

export default new MaterialsApi({});
