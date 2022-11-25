import { AxiosError } from 'axios';
import jwt_decode from 'jwt-decode';
import { AppError } from '../models/User';

interface Claims {
  id: string;
  iat: number;
  exp: number;
}

export const getTokenFromLocalStorage = (): string => {
  return localStorage.getItem('token') || '';
};

export const getEmailFromLocalStorage = (): string => {
  return localStorage.getItem('email') || '';
};

export const extractUserIdFromToken = (token: string): string | null => {
  if (!token) return null;
  const { id }: Claims = jwt_decode<Claims>(token);
  return id;
};

export const handleRememberMe = (isToRemember: boolean, email: string) => {
  return isToRemember ? localStorage.setItem('email', email) : localStorage.removeItem('email');
};

export const getErrorMessage = (data: AxiosError<AppError>) => {
  if (data?.response?.data.errorMessage) {
    return data.response.data.errorMessage;
  } else {
    return data.message;
  }
};
