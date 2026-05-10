import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { tanstackStartCookies } from 'better-auth/tanstack-start';

import { sendSignUpVerificationEmailFn } from './sign-up.functions';

import { db } from '@/db';
import * as schema from '@/db/schema/auth-schema';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
    onExistingUserSignUp: () => {
      throw new Error();
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendSignUpVerificationEmailFn({
        data: {
          to: user.email,
          subject: 'Verify your email address',
          text: `Click the link to verify your email: ${url}`,
        },
      });
    },
  },
  plugins: [tanstackStartCookies()],
});
