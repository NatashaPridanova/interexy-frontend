import { SignInUser } from '../../models/User';
import AuthForm from '../../components/AuthForm/AuthForm';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const requiredMessage = 'You should provide a value';

function SignInPage() {
  return (
    <Box className="signin-page__wrapper">
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
        formData={{ name: '', surname: '', password: '', email: '' }}
        submitBtnText="Sign in"
        additionalText={{
          mainText: `Don't have account? `,
          linkText: 'Sign up',
          linkHref: '/signup',
        }}
      />
    </Box>
  );
}

export default SignInPage;
