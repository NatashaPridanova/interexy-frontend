import { SignInUser } from '../../models/User';
import AuthForm from '../../components/AuthForm/AuthForm';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { signIn } from '../../api/UserApi/UserApi';
import ErrorBar from '../../components/ErrorBar/ErrorBar';
import { AxiosError } from 'axios';
import { appContext } from '../../store/appContext';
import { getEmailFromLocalStorage, getErrorMessage, handleRememberMe } from '../../utils/utils';

export const requiredMessage = 'This field is required';

function SignInPage() {
  const [user, setUser] = useState<SignInUser | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { state, setState } = useContext(appContext);

  const email = getEmailFromLocalStorage();

  const getUserFromForm = (userData: SignInUser) => {
    setUser(userData);
  };

  const navigate = useNavigate();

  if (user) {
    signIn(user).then((data) => {
      if (data instanceof AxiosError) {
        setErrorMessage(getErrorMessage(data));
      } else if (data) {
        localStorage.setItem('token', data.token);
        setState({ ...state, isLoggedIn: true });
        if (user.isToRemember !== undefined) {
          handleRememberMe(user.isToRemember, user.email);
        }
        navigate('/');
      }
    });
  }

  return (
    <Box className="signin-page__wrapper">
      <AuthForm
        inputAttributes={[
          {
            name: 'email',
            label: 'Your email',
            rules: {
              required: requiredMessage,
            },
          },
          {
            name: 'password',
            label: 'Password',
            type: 'password',
            rules: {
              required: requiredMessage,
              minLength: {
                value: 6,
                message: 'Your password has to be more than 6 characters',
              },
            },
          },
        ]}
        className="login-form"
        formData={{ name: '', surname: '', password: '', email: email, isToRemember: false }}
        submitBtnText="Sign in"
        additionalText={{
          mainText: `Don't have account? `,
          linkText: 'Sign up',
          linkHref: '/signup',
        }}
        getUserFromForm={getUserFromForm}
        checkboxInput={true}
      />
      {errorMessage && <ErrorBar message={errorMessage} open={true} />}
    </Box>
  );
}

export default SignInPage;
