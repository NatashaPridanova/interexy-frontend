const baseUrl = 'http://localhost:5000';
import axios, { AxiosError } from 'axios';
import { AppError, User, UserSignIn, UserSignUp } from '../../models/User';
import { AuthUser } from '../../models/User';
import { getTokenFromStorage } from '../../utils/utils';

export const signIn = async (
  user: UserSignIn
): Promise<AuthUser | undefined | AxiosError<AppError>> => {
  try {
    const url = `${baseUrl}/auth/signin`;
    const res = await axios.post(url, user);
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) return err;
    throw err;
  }
};

export const signUp = async (
  user: UserSignUp
): Promise<User | undefined | AxiosError<AppError>> => {
  try {
    const url = `${baseUrl}/auth/signup`;
    const res = await axios.post(url, user);
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) return err;
    throw err;
  }
};

export const getUser = async (id: string): Promise<User | undefined | AxiosError<AppError>> => {
  try {
    const token = getTokenFromStorage();
    const url = `${baseUrl}/users/${id}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) return err;
    throw err;
  }
};
