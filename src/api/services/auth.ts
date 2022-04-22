import request from '@/api/index';
import type { AuthLogin, AuthRegister } from '@/types/Auth';

export default {
  login(loginDetails: AuthLogin) {
    return request.post('/auth/login', {
      email: loginDetails.email,
      password: loginDetails.password,
    });
  },

  register(registerDetails : AuthRegister) {
    // Necessary because despite input type number, the value is type string
    // Therefore to not to mess with TS interfaces, there is a simply "hack" below
    const stringPhone = registerDetails.phone.toString();
    const numberPhone = parseInt(stringPhone);

    return request.post('/auth/register', {
      first_name: registerDetails.firstName,
      last_name: registerDetails.lastName,
      email: registerDetails.email,
      password: registerDetails.password,
      phone: numberPhone,
    });
  },

  forgotPassword(email: string) {
    return request.post('/auth/forgot-password', {
      email,
    });
  },

  resetPassword(password: string) {
    return request.post('/auth/reset-password', {
      password,
    });
  },
}