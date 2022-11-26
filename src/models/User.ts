export interface UserSignIn {
  email: string;
  password: string;
  isToRemember?: boolean;
}

export interface UserSignUp {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
}

export interface AuthUser {
  token: string;
  userId: string;
  name: string;
}

export class AppError {
  errorMessage!: string;
  errorCode!: number;
  errorType!: string;
}
