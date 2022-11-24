import { SignUpUser } from '../../models/User';
import AuthForm from '../../components/AuthForm/AuthForm';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { requiredMessage } from '../SignInPage/SignInPage';

function SignUpPage() {
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
        formData={{ name: '', surname: '', password: '', email: '' }}
        submitBtnText="Sign up"
        additionalText={{
          mainText: `Already have an account? `,
          linkText: 'Sign in',
          linkHref: '/signin',
        }}
      />
    </Box>
  );
}

export default SignUpPage;
