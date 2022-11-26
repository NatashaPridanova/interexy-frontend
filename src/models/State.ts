import { CharactersResponse } from './Character';

interface StateValues {
  isLoggedIn: boolean;
  characters: CharactersResponse;
  currentPage: number;
}

export interface AppState {
  state: StateValues;
  setState: (state: StateValues) => void;
}
