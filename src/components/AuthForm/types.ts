import { UserSignIn, UserSignUp } from '../../models/User';

export interface FormData {
  name: string;
  surname: string;
  email: string;
  password: string;
  isToRemember: boolean;
}

export interface InputAttributes {
  name: 'name' | 'surname' | 'email' | 'password';
  label: string;
  rules: {
    required?: boolean | string;
    minLength?: { value: number; message: string };
    maxLength?: { value: number; message: string };
  };
  type?: string;
}

export interface FormProps {
  inputAttributes: InputAttributes[];
  className: string;
  formData: FormData;
  submitBtnText: string;
  additionalText: { mainText: string; linkText: string; linkHref: string };
  getUserFromForm: ((user: UserSignIn) => void) | ((user: UserSignUp) => void);
  checkboxInput?: boolean;
}
