import './CharacterPage.css';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCharacter } from '../../api/CharacterApi/CharacterApi';
import { AxiosError } from 'axios';
import { Character } from '../../models/Character';
import ErrorBar from '../../components/ErrorBar/ErrorBar';

export default function CharacterPage() {
  const { characterId } = useParams();
  const [character, setCharacter] = useState<Character | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadCharacter = async () => {
    setIsLoading(true);
    if (characterId) {
      getCharacter(characterId).then((data) => {
        if (data) {
          if (data instanceof AxiosError) {
            setErrorMessage(data.message);
          } else {
            setCharacter(data);
          }
        }
        setIsLoading(false);
      });
    }
  };

  useEffect(() => {
    loadCharacter();
  }, []);

  return (
    <Box className="character-page__wrapper">
      {!isLoading &&
        (character ? (
          <Box className="character__wrapper">
            <img className="character__image" alt="User" src={character.image} />
            <Box className="character__info">
              <Typography variant="h6">Name: {character.name}</Typography>
              <Typography variant="body1">Status: {character.status}</Typography>
              <Typography variant="body1">Species: {character.species}</Typography>
              <Typography variant="body1">Gender: {character.gender}</Typography>
              <Typography variant="body1">Origin: {character.origin.name}</Typography>
              <Typography variant="body1">Location: {character.location.name}</Typography>
            </Box>
          </Box>
        ) : (
          <p>No character was found</p>
        ))}
      {!isLoading && (
        <Link className="character-card__link" to="/">
          Back to Characters
        </Link>
      )}
      {!isLoading && errorMessage && <ErrorBar message={errorMessage} open={true} />}
      {isLoading && <CircularProgress />}
    </Box>
  );
}
