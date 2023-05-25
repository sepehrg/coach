export interface Tag {
  id: string;
  name: string;
}

export type PlaceholderTagRequest = {
  gradeId: string;
  subjectId: string;
};

export type GetTagsByQueryRequest = {
  name: string;
  gradeId: string;
  subjectId: string;
};
