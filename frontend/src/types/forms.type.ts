type LoginForm = {
  email: string;
  password: string;
  shallRemember: boolean;
};

type RegisterForm = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type { LoginForm, RegisterForm };
