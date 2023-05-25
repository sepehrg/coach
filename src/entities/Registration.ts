export interface RegistrationRequest {
  email: string;
  firstName: string;
  phone?: string;
  lastName: string;
  password: string;
  birthDate: Date;
  school: string;
  grade: string;
  subjects?: { id: string }[];
}
