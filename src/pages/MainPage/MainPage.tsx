import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { getCharacters } from '../../api/CharacterApi/CharacterApi';
import { CharactersResponse, Character } from '../../models/Character';
import CharacterCard from '../../components/CharacterCard/CharacterCard';
import { AxiosError } from 'axios';
import ErrorBar from '../../components/ErrorBar/ErrorBar';

function MainPage() {
  const [characters, setCharacters] = useState<CharactersResponse>({
    info: {
      count: 0,
      pages: 0,
      next: '',
      prev: '',
    },
    results: [],
  });
  const [errorMessage, setErrorMessage] = useState('');
  console.log('characters state is', characters);
  const loadCharacters = async () => {
    try {
      getCharacters().then((data) => {
        console.log('data', data);
        if (data) {
          if (data instanceof AxiosError) {
            setErrorMessage(data.message);
          } else {
            setCharacters(data);
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    loadCharacters();
  }, []);

  return (
    <div className="character-card__wrapper">
      {characters.results.length ? (
        characters.results.map((character: Character) => {
          return <CharacterCard key={character.id} data={character} />;
        })
      ) : (
        <p>No character was found :(</p>
      )}
      {errorMessage && <ErrorBar message={errorMessage} open={true} />}
    </div>
  );
}

export default MainPage;
