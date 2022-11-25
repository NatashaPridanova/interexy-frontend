import { useContext, useEffect, useState } from 'react';
import { getCharacters } from '../../api/CharacterApi/CharacterApi';
import { Character } from '../../models/Character';
import CharacterCard from '../../components/CharacterCard/CharacterCard';
import { AxiosError } from 'axios';
import ErrorBar from '../../components/ErrorBar/ErrorBar';
import { appContext } from '../../store/appContext';
import { Box, CircularProgress } from '@mui/material';
import PaginationBar from '../../components/PaginationBar/Pagination';
import './MainPage.css';

function MainPage() {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const { state, setState } = useContext(appContext);

  const loadCharacters = async (value: number) => {
    setIsLoading(true);
    getCharacters(value).then((data) => {
      if (data) {
        if (data instanceof AxiosError) {
          setErrorMessage(data.message);
        } else {
          setState({ ...state, characters: data, currentPage: value });
        }
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    loadCharacters(state.currentPage);
  }, []);

  return (
    <Box className="view__wrapper">
      {isLoading && <CircularProgress />}
      <Box className="character-card__wrapper">
        {!isLoading &&
          state.characters.results.length &&
          state.characters.results.map((character: Character) => {
            return <CharacterCard key={character.id} data={character} />;
          })}
      </Box>
      {!isLoading && state.characters.results.length && (
        <PaginationBar
          count={state.characters.info.pages}
          page={state.currentPage}
          loadCharacters={loadCharacters}
        />
      )}
      {!isLoading && errorMessage && <ErrorBar message={errorMessage} open={true} />}
    </Box>
  );
}

export default MainPage;
