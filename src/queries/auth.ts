import { type MutationOptions } from '@tanstack/react-query';

import { signIn, signUp } from '@/lib/auth-client';
import { SignInBody, SignUpBody } from '@/types/auth';

const signUpUser = async (body: SignUpBody) => {
  const response = await signUp.email({
    ...body,
    callbackURL: '/dashboard',
  });

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
};

export const signUpUserOptions = (): MutationOptions<unknown, Error, SignUpBody> => ({
  mutationFn: (body) => signUpUser(body),
});

const signInUser = async (body: SignInBody) => {
  const response = await signIn.email({
    ...body,
    callbackURL: '/dashboard',
    rememberMe: false,
  });

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
};

export const signInUserOptions = (): MutationOptions<unknown, Error, SignInBody> => ({
  mutationFn: (body) => signInUser(body),
});
