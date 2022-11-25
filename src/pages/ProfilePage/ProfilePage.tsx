import { Box, Typography, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { primaryColor } from '../../App';
import { extractUserIdFromToken, getTokenFromLocalStorage } from '../../utils/utils';
import ErrorBar from '../../components/ErrorBar/ErrorBar';
import { AxiosError } from 'axios';
import { getUser } from '../../api/UserApi/UserApi';
import { DBUser } from '../../models/User';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const [user, setUser] = useState<DBUser | null>(null);
  const token = getTokenFromLocalStorage();
  const id = extractUserIdFromToken(token);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getUser(id).then((data) => {
        setIsLoading(true);
        if (data instanceof AxiosError) {
          if (data?.response?.data.errorMessage) {
            setErrorMessage(data?.response?.data.errorMessage);
          } else {
            setErrorMessage(data.message);
          }
        } else if (data) {
          setUser(data);
        }
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
      navigate('/');
    }
  }, [id, navigate]);

  return (
    <Box className="view__wrapper" sx={{ minHeight: 'auto' }}>
      <Typography variant="h2" style={{ color: primaryColor }}>
        My profile
      </Typography>
      {isLoading && <CircularProgress />}
      {!isLoading && user && (
        <Box className="view__wrapper" sx={{ minHeight: 'auto' }}>
          <Typography variant="h6" style={{ color: primaryColor }}>
            Name: {user.name}
          </Typography>
          <Typography variant="h6" style={{ color: primaryColor }}>
            Surname: {user.surname}
          </Typography>
          <Typography variant="h6" style={{ color: primaryColor }}>
            E-mail: {user.email}
          </Typography>
        </Box>
      )}
      {errorMessage && <ErrorBar message={errorMessage} open={true} />}
    </Box>
  );
}

export default ProfilePage;
