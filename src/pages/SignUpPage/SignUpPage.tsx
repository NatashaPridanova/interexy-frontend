import { UserSignUp } from '../../models/User';
import AuthForm from '../../components/AuthForm/AuthForm';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { requiredMessage } from '../SignInPage/SignInPage';
import { useContext, useState } from 'react';
import { signUp, signIn } from '../../api/UserApi/UserApi';
import ErrorBar from '../../components/ErrorBar/ErrorBar';
import { AxiosError } from 'axios';
import { appContext } from '../../store/appContext';
import { getErrorMessage } from '../../utils/utils';

function SignUpPage() {
  const [errorMessage, setErrorMessage] = useState('');
  const { state, setState } = useContext(appContext);
  const navigate = useNavigate();

  const getUserFromForm = (userData: UserSignUp) => {
    signUp(userData).then((data) => {
      if (data instanceof AxiosError) {
        setErrorMessage(getErrorMessage(data));
      } else if (data) {
        signIn(userData).then((data) => {
          if (data instanceof AxiosError) {
            setErrorMessage(getErrorMessage(data));
          } else if (data) {
            localStorage.setItem('token', data.token);
            setState({ ...state, isLoggedIn: true });
            navigate('/');
          }
        });
      }
    });
  };

  return (
    <Box className="signup-page__wrapper">
      <AuthForm
        inputAttributes={[
          {
            name: 'name',
            label: 'Your name',
            rules: {
              required: requiredMessage,
            },
          },
          {
            name: 'surname',
            label: 'Surname',
            rules: {
              required: requiredMessage,
            },
          },
          {
            name: 'email',
            label: 'Email',
            type: 'email',
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
        className="signup-form"
        formData={{ name: '', surname: '', password: '', email: '', isToRemember: false }}
        submitBtnText="Sign up"
        additionalText={{
          mainText: `Already have an account? `,
          linkText: 'Sign in',
          linkHref: '/signin',
        }}
        getUserFromForm={getUserFromForm}
      />
      {errorMessage && <ErrorBar message={errorMessage} open={true} />}
    </Box>
  );
}

export default SignUpPage;
