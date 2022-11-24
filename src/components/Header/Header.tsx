import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Container from '@mui/material/Container';
import { cyan } from '@mui/material/colors';
import HomeIcon from '@mui/icons-material/Home';
import Stack from '@mui/material/Stack';
import LinkButton from '../../components/buttons/LinkButton/LinkButton';

const primaryColor = cyan[500];

export default function Header() {
  const isLoggedIn = false;

  return (
    <AppBar sx={{ backgroundColor: primaryColor, marginBottom: 2, position: 'sticky' }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
            <LinkButton path="/" text="Characters">
              <HomeIcon />
            </LinkButton>
            <Stack direction="row">
              {isLoggedIn ? (
                <>
                  <LinkButton path="/profile" text="My profile">
                    <AccountCircle />
                  </LinkButton>
                  <LinkButton path="/" text="Log out">
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
