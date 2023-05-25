export interface ChangeProfileRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  birthDate?: Date;
  grade?: string;
  school: string;
  icon?: File;
  native?: string;
}
