import { Box, Typography } from '@mui/material';
import { Character } from '../../models/Character';
import { Link } from 'react-router-dom';
import './character-card.css';

export default function CharacterCard({ data }: { data: Character }) {
  return (
    <Box className="character-card" sx={{ backgroundColor: 'white' }}>
      <Box className="character-card__info">
        <img className="character-card__img" alt="Character" src={data.image} />
        <Typography variant="body1">Name: {data.name}</Typography>
        <Typography variant="body1">Species: {data.species}</Typography>
        <Typography variant="body1">Gender: {data.gender}</Typography>
        <Typography variant="body1">Location: {data.location.name}</Typography>
      </Box>
      <Link to={data.id.toString()} className="nav__link">
        learn more
      </Link>
    </Box>
  );
}
