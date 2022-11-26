import Layout from './components/Layout/Layout';
import CharacterPage from './pages/CharacterPage/CharacterPage';
import MainPage from './pages/MainPage/MainPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { appContext, defaultCharactersState } from './store/appContext';
import { useState } from 'react';
import { cyan } from '@mui/material/colors';
import { getTokenFromStorage } from './utils/utils';
import './App.css';

export const primaryColor = cyan[500];

function App() {
  const token = getTokenFromStorage();
  const [appState, setAppState] = useState({
    isLoggedIn: token ? true : false,
    characters: defaultCharactersState,
    currentPage: 1,
  });

  return (
    <appContext.Provider value={{ state: appState, setState: setAppState }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="characters" index element={<MainPage />}></Route>
            <Route path="characters/:characterId" element={<CharacterPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="signin" element={<SignInPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </appContext.Provider>
  );
}

export default App;
