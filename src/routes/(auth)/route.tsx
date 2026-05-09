import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex w-full justify-center p-6">
      <Outlet />
    </div>
  );
}
