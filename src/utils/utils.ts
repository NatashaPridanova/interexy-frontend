import { AxiosError } from 'axios';
import jwt_decode from 'jwt-decode';
import { AppError } from '../models/User';

interface Claims {
  id: string;
  iat: number;
  exp: number;
}

export const getTokenFromStorage = (): string => {
  return localStorage.getItem('token') || sessionStorage.getItem('token') || '';
};

export const removeTokenFromStorage = () => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
};

export const getEmailFromLocalStorage = (): string => {
  return localStorage.getItem('email') || '';
};

export const extractUserIdFromToken = (token: string): string | null => {
  if (!token) return null;
  try {
    const { id }: Claims = jwt_decode<Claims>(token);
    if (!id) return null;
    return id;
  } catch (err) {
    return null;
  }
};

export const handleRememberMe = (isToRemember: boolean, email: string, token: string) => {
  if (isToRemember) {
    localStorage.setItem('email', email);
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('email');
    sessionStorage.setItem('token', token);
  }
};

export const getErrorMessage = (data: AxiosError<AppError>) => {
  if (data?.response?.data.errorMessage) {
    return data.response.data.errorMessage;
  } else {
    return data.message;
  }
};
