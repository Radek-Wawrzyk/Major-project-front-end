import request from '@/api/index';
import type { AuthLogin, AuthRegister } from '@/types/Auth';

export default {
  login(payload: AuthLogin) {
    return request.post('/auth/login', {
      email: payload.email,
      password: payload.password,
    });
  },

  register(payload : AuthRegister) {
    return request.post('/auth/register', {
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
      password: payload.password,
      phone: payload.phone,
    });
  },

  forgotPassword(email: string) {
    return request.post('/auth/forgot-password', {
      email,
    });
  },

  resetPassword(payload: any) {
    return request.post('/auth/reset-password', {
      password: payload.password,
    });
  },
}