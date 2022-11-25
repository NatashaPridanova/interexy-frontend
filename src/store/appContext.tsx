import { createContext } from 'react';
import { AppState } from '../models/State';
import { CharactersResponse } from '../models/Character';

const defaultCharactersState: CharactersResponse = {
  info: {
    count: 0,
    pages: 0,
    next: '',
    prev: '',
  },
  results: [],
};

const state = { isLoggedIn: false, characters: defaultCharactersState, currentPage: 1 };

const appContext = createContext<AppState>({
  state,
  setState: (state) => {},
});

export { appContext, defaultCharactersState };
