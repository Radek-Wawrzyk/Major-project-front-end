interface AuthLogin {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface AuthRegister {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: number;
}

export {
  AuthLogin,
  AuthRegister,
};
