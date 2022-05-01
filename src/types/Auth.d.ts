import { string } from 'yup';

interface AuthLogin {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface AuthRegister {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: number;
}

interface AuthForgetPassword {
  email: string;
  password: string;
}

interface AuthResetPassword {
  password: string;
  token: string;
}

interface AuthTokenizedUser {
  avatar_url: string | null;
  bio: string | null;
  created_at: Date;
  email: string;
  exp: number;
  first_name: string;
  iat: number;
  id: number;
  last_name: string;
  phone: number | string;
  updated_at: Date;
}

export {
  AuthLogin,
  AuthRegister,
  AuthForgetPassword,
  AuthResetPassword,
  AuthTokenizedUser,
};
