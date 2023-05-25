import HttpService from './http.service';
import { UserCredentials } from 'store/auth/auth.types';
import { RegistrationRequest } from 'entities/Registration';
import { ChangeProfileRequest } from 'entities/Profile';

class AuthAPI extends HttpService {
  login = (params: UserCredentials) => {
    return this.post('auth/login', {
      ...params,
    });
  };

  register = (params: RegistrationRequest) => {
    return this.post('auth/register', { ...params });
  };

  tokenRefresh = (fingerprint: string) => {
    return this.post('auth/refresh', { fingerprint });
  };

  logout = () => {
    return this.post('auth/logout');
  };

  resetPassword = (email: string) => {
    return this.post('auth/password/reset', { email });
  };

  setNewPassword = (password: string, tokenFromEmail?: string) => {
    return this.patch('auth/password', { password }, tokenFromEmail);
  };

  getProfile = () => {
    return this.get('profile');
  };

  changeProfile = (profile: ChangeProfileRequest) => {
    return this.patch('profile', profile);
  };

  changeProfileWithIcon = (formData: FormData) => {
    return this.patch('profile', formData);
  };

  changePassword = (oldPassword: string, newPassword: string, tokenFromEmail?: string) => {
    return this.patch('auth/password', { oldPassword, newPassword }, tokenFromEmail);
  };

  validateEmail = (email: string) => {
    return this.post('auth/register/validate/email', { email });
  };

  validateNickname = (nickname: string) => {
    return this.post('auth/register/validate/nickname', { nickname });
  };
}

export default new AuthAPI({});
