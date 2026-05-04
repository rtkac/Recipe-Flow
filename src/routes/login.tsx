import { createFileRoute } from '@tanstack/react-router';

import { signIn, signUp } from '@/lib/auth-client'; //import the auth client

export const Route = createFileRoute('/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const handleOnSignIn = async () => {
    await signIn.email({
      email: 'test@example.com',
      password: '12345678',
      callbackURL: '/dashboard',
      rememberMe: false,
    });
  };

  const handleOnSignUp = async () => {
    await signUp.email(
      {
        email: 'test@example.com',
        password: '12345678', // min 8 characters by default
        name: '',
        callbackURL: '/dashboard',
      },
      {
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      },
    );
  };

  return (
    <div>
      <div>Hello "/login"!</div>
      <button onClick={handleOnSignIn}>Sign In</button>
      <br />
      <button onClick={handleOnSignUp}>Sign Up</button>
      <br />
    </div>
  );
}
