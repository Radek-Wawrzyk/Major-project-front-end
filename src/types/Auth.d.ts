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

export {
  AuthLogin,
  AuthRegister,
};
