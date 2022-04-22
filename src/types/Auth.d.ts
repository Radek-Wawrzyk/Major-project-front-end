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

export {
  AuthLogin,
  AuthRegister,
  AuthForgetPassword,
  AuthResetPassword,
};
