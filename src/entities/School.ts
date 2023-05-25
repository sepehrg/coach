export interface School {
  id: string;
  name: string;
  location: string;
}

export interface CreateSchoolRequest {
  name: string;
  location: string;
}
