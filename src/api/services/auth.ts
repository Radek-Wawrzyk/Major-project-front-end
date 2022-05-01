import request from '@/api/index';
import type { AuthForgetPassword, AuthLogin, AuthRegister, AuthResetPassword } from '@/types/Auth';

export default {
  login(loginDetails: AuthLogin) {
    return request.post('/auth/login', {
      email: loginDetails.email,
      password: loginDetails.password,
    });
  },

  register(registerDetails : AuthRegister) {
    return request.post('/auth/register', {
      first_name: registerDetails.firstName,
      last_name: registerDetails.lastName,
      email: registerDetails.email,
      password: registerDetails.password,
      phone: registerDetails.phone
    });
  },

  forgotPassword(forgetPasswordDetails: AuthForgetPassword) {
    return request.post('/auth/forgot-password', {
      email: forgetPasswordDetails.email,
      password: forgetPasswordDetails.password,
    });
  },

  resetPassword(resetPasswordDetails: AuthResetPassword) {
    return request.post('/auth/reset-password', {
      password: resetPasswordDetails.password,
      token: resetPasswordDetails.token,
    });
  },
}