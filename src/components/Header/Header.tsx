import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Container from '@mui/material/Container';
import HomeIcon from '@mui/icons-material/Home';
import Stack from '@mui/material/Stack';
import LinkButton from '../../components/buttons/LinkButton/LinkButton';
import { primaryColor } from '../../App';
import { removeTokenFromStorage, getTokenFromStorage } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import { appContext } from '../../store/appContext';
import { useContext } from 'react';

export default function Header() {
  const token: string = getTokenFromStorage();
  const { state, setState } = useContext(appContext);
  const navigate = useNavigate();

  const logout = () => {
    removeTokenFromStorage();
    setState({ ...state, isLoggedIn: false });
    navigate('/');
  };

  return (
    <AppBar sx={{ backgroundColor: primaryColor, marginBottom: 2, position: 'sticky' }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
            <LinkButton path="/characters" text="Characters">
              <HomeIcon />
            </LinkButton>
            <Stack direction="row">
              {token ? (
                <>
                  <LinkButton path="/profile" text="My profile">
                    <AccountCircle />
                  </LinkButton>
                  <LinkButton path="/" text="Log out" onClickFunction={logout}>
                    <LogoutIcon />
                  </LinkButton>
                </>
              ) : (
                <>
                  <LinkButton path="/signup" text="Sign up">
                    <AccountCircle />
                  </LinkButton>
                  <LinkButton path="/signin" text="Sign in">
                    <LoginIcon />
                  </LinkButton>
                </>
              )}
            </Stack>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
