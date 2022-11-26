import { UserSignIn } from '../../models/User';
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
  const [errorMessage, setErrorMessage] = useState('');
  const { state, setState } = useContext(appContext);

  const email = getEmailFromLocalStorage();

  const getUserFromForm = (userData: UserSignIn) => {
    signIn(userData).then((data) => {
      if (data instanceof AxiosError) {
        setErrorMessage(getErrorMessage(data));
      } else if (data) {
        setState({ ...state, isLoggedIn: true });
        if (userData.isToRemember !== undefined) {
          handleRememberMe(userData.isToRemember, userData.email, data.token);
        }
        navigate('/');
      }
    });
  };

  const navigate = useNavigate();

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
