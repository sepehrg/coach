import HttpService from './http.service';
import { StudyCardsSubject } from 'entities/Subject';
import {
  GetTagsRequestPayload,
  LearningSetOverview,
  LibraryOverviewSuccessPayload,
  SetsBySubjectIdRequestPayload,
  SetsBySubjectRequestPayload,
  StudyCardSet,
} from 'entities/StudyCardSet';
import { Tag } from 'entities/Tag';
import { CopySetPayload, ReportSetPayload, UnsortedStudyCard } from 'entities/StudyCard';
import { Grade } from 'entities/Grade';

class StudyCardSetsApi extends HttpService {
  STUDY_CARD_SETS_API = 'study-card-sets';

  getLibrarySets = (): Promise<LibraryOverviewSuccessPayload> => {
    return this.get(`${this.STUDY_CARD_SETS_API}/library/overview`);
  };

  getLibrarySetsBySubject = (payload: SetsBySubjectRequestPayload): Promise<StudyCardSet[]> => {
    return this.get(
      `${this.STUDY_CARD_SETS_API}/library/by-subject?subjectId=${payload.subject.id}${
        payload.searchTerm ? `&searchTerm=${payload.searchTerm}` : ''
      }${payload.page ? `&page=${payload.page}` : ''}${
        payload.limit ? `&limit=${payload.limit}` : ''
      }`,
    );
  };

  getLibrarySetsBySubjectId = (payload: SetsBySubjectIdRequestPayload): Promise<StudyCardSet[]> => {
    return this.get(
      `${this.STUDY_CARD_SETS_API}/library/by-subject?subjectId=${payload.subjectId}${
        payload.searchTerm ? `&searchTerm=${payload.searchTerm}` : ''
      }${payload.page ? `&page=${payload.page}` : ''}${
        payload.limit ? `&limit=${payload.limit}` : ''
      }`,
    );
  };

  createSet = (formData: any): Promise<StudyCardSet> => {
    return this.post(`${this.STUDY_CARD_SETS_API}/create`, formData);
  };

  updateSet = (set: StudyCardSet): Promise<StudyCardSet> => {
    return this.patch(`${this.STUDY_CARD_SETS_API}/update/${set.id}`, set);
  };

  getTagsByName = (payload: GetTagsRequestPayload): Promise<Tag[]> => {
    return this.get(
      `study-card-tags/search?name=${payload.name}${
        payload.subjectId ? `&subjectId=${payload.subjectId}` : ''
      }`,
    );
  };

  getDiscoverSets = (): Promise<StudyCardsSubject[]> => {
    return this.get(`${this.STUDY_CARD_SETS_API}/discover/overview`);
  };

  getDiscoverSetsBySubject = (payload: SetsBySubjectRequestPayload): Promise<StudyCardSet[]> => {
    return this.get(
      `${this.STUDY_CARD_SETS_API}/discover/by-subject?subjectId=${payload.subject.id}${
        payload.searchTerm ? `&searchTerm=${payload.searchTerm}` : ''
      }${payload.page ? `&page=${payload.page}` : ''}${
        payload.limit ? `&limit=${payload.limit}` : ''
      }`,
    );
  };

  getGeneralKnowledgeSets = (payload: { grades: Grade[] }): Promise<StudyCardsSubject[]> => {
    const composeString = payload.grades.reduce(
      (acc, current) => acc.concat(`gradeId=${current.id}&`),
      '',
    );
    return this.get(`${this.STUDY_CARD_SETS_API}/general-knowledge/overview?${composeString}`);
  };

  getSet = (payload: { id: string }): Promise<StudyCardSet> => {
    return this.get(`${this.STUDY_CARD_SETS_API}/${payload.id}`);
  };

  reportSet = ({ id, category, comments }: ReportSetPayload) => {
    const requestData = { category };
    comments && Object.assign(requestData, { comments: comments });
    return this.post(`${this.STUDY_CARD_SETS_API}/report/${id}`, requestData);
  };

  copySet = (payload: CopySetPayload) => {
    return this.post(`${this.STUDY_CARD_SETS_API}/copy/${payload.id}`, {
      studyCards: payload.studyCards,
    });
  };

  deleteSet = (payload: { id: string }) => {
    return this.delete(`${this.STUDY_CARD_SETS_API}/delete/${payload.id}`);
  };

  followSet = (payload: { id: string }) => {
    return this.post(`${this.STUDY_CARD_SETS_API}/follow/${payload.id}`);
  };

  unfollowSet = (payload: { id: string }) => {
    return this.delete(`${this.STUDY_CARD_SETS_API}/unfollow/${payload.id}`);
  };

  shareSet = (payload: { id: string }) => {
    return this.post(`${this.STUDY_CARD_SETS_API}/share/${payload.id}`);
  };

  getStudySetOverview = (payload: { id: string }) => {
    return this.get(`${this.STUDY_CARD_SETS_API}/study-set/${payload.id}/overview`);
  };

  getSessionCardsAll = (payload: { id: string; maxCards?: number }) => {
    return this.get(
      `${this.STUDY_CARD_SETS_API}/study-set/${payload.id}/all?maxCards=${payload.maxCards}`,
    );
  };

  getSessionCardsByLevel = (payload: {
    id: string;
    level: keyof LearningSetOverview;
    maxCards?: number;
  }) => {
    return this.get(
      `${this.STUDY_CARD_SETS_API}/study-set/${payload.id}/${payload.level}?maxCards=${payload.maxCards}`,
    );
  };

  favorite = (payload: { id: string }) => {
    return this.post(`study-cards/${payload.id}/favorite`);
  };

  unfavorite = (payload: { id: string }) => {
    return this.delete(`study-cards/${payload.id}/unfavorite`);
  };

  correct = (payload: { cardId: string }) => {
    return this.post(`study-cards/${payload.cardId}/correct`);
  };

  wrong = (payload: { cardId: string }) => {
    return this.delete(`study-cards/${payload.cardId}/wrong`);
  };

  getGeneralKnowledgeSetsBySubject = (
    payload: SetsBySubjectRequestPayload,
  ): Promise<StudyCardSet[]> => {
    const composeString = payload.grades?.reduce(
      (acc, current) => acc.concat(`gradeId=${current.id}&`),
      '',
    );
    return this.get(
      `${this.STUDY_CARD_SETS_API}/general-knowledge/by-subject?${composeString}subjectId=${
        payload.subject.id
      }${payload.searchTerm ? `&searchTerm=${payload.searchTerm}` : ''}${
        payload.page ? `&page=${payload.page}` : ''
      }${payload.limit ? `&limit=${payload.limit}` : ''}`,
    );
  };

  like = (payload: { setId: string }) => {
    return this.post(`${this.STUDY_CARD_SETS_API}/${payload.setId}/like`);
  };

  unlike = (payload: { setId: string }) => {
    return this.delete(`${this.STUDY_CARD_SETS_API}/${payload.setId}/unlike`);
  };

  createUnsortedCard = (payload: { question: string; answer: string }) => {
    return this.post('study-cards/unsorted', payload);
  };

  getUnsorted = () => {
    return this.get('study-cards/unsorted');
  };

  linkUnsorted = (payload: { setId: string; studyCard: UnsortedStudyCard }) => {
    return this.post(`${this.STUDY_CARD_SETS_API}/${payload.setId}/linkUnsorted`, {
      studyCard: payload.studyCard,
    });
  };
}

export default new StudyCardSetsApi({});
