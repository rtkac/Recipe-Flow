import { authErrorCodes } from './-constants';

export type AuthErrorCode = (typeof authErrorCodes)[number];

export type SignInBody = {
  email: string;
  password: string;
};

export type SignUpBody = {
  name: string;
  email: string;
  password: string;
};
