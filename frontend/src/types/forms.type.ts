export type LoginForm = {
  email: string;
  password: string;
  shallRemember: boolean;
};

export type RegisterForm = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};