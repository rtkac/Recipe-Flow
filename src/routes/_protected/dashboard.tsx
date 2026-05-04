import { createFileRoute } from '@tanstack/react-router';

import { signOut } from '@/lib/auth-client';

export const Route = createFileRoute('/_protected/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext();

  const navigate = Route.useNavigate();

  const handleOnSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate({ to: '/login' });
        },
      },
    });
  };

  return (
    <div>
      Welcome, {user.name}!<br />
      <button onClick={handleOnSignOut}>Sign Out</button>
    </div>
  );
}
