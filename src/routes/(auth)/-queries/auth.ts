import { type MutationOptions } from '@tanstack/react-query';

import { AuthErrorCode } from '../-types';
import { SignInBody, SignUpBody } from '../-types';

import { signIn, signUp } from '@/lib/auth/auth-client';

type ApiError = Error & {
  code: AuthErrorCode | undefined;
};

const signUpUser = async (body: SignUpBody) => {
  const response = await signUp.email({
    ...body,
    callbackURL: '/dashboard',
  });

  if (response.error) {
    throw response.error;
  }

  return response.data;
};

export const signUpUserOptions = (): MutationOptions<unknown, ApiError, SignUpBody> => ({
  mutationFn: (body) => signUpUser(body),
});

const signInUser = async (body: SignInBody) => {
  const response = await signIn.email({
    ...body,
    callbackURL: '/dashboard',
    rememberMe: false,
  });

  if (response.error) {
    throw response.error;
  }

  return response.data;
};

export const signInUserOptions = (): MutationOptions<unknown, ApiError, SignInBody> => ({
  mutationFn: (body) => signInUser(body),
});
