export interface StudyCard {
  question: string;
  answer: string;
  id: string;
  isFavorite?: boolean;
  level: number;
  order: number;
  studyCardId: string;
  questionIsDrawing: boolean;
  answerIsDrawing: boolean;
}

export interface ReportSetPayload {
  id: string;
  category: string;
  comments?: string;
}

export interface CopySetPayload {
  id: string;
  studyCards: StudyCard[];
}

export interface UnsortedStudyCard {
  id: string;
  question: string;
  answer: string;
}
