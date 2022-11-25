const baseUrl = 'https://rickandmortyapi.com/api/character/';
import axios, { AxiosError } from 'axios';
import { Character, CharactersResponse } from '../../models/Character';

export const getCharacters = async (
  page = 1
): Promise<CharactersResponse | undefined | AxiosError> => {
  try {
    const url = `${baseUrl}?page=${page}`;
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) return err;
    throw err;
  }
};

export const getCharacter = async (id: string): Promise<Character | undefined | AxiosError> => {
  try {
    const url = `${baseUrl}${id}`;
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) return err;
    throw err;
  }
};
