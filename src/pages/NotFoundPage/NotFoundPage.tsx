import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { primaryColor } from '../../App';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const navigateToMain = () => {
    navigate('/');
  };

  return (
    <Box className="view__wrapper">
      <Typography variant="h1" style={{ color: primaryColor }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: primaryColor }}>
        The page you&apos;re looking for doesn&apos;t exist.
      </Typography>
      <Button variant="contained" onClick={navigateToMain}>
        Back Home
      </Button>
    </Box>
  );
}
