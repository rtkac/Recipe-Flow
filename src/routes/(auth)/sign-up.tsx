import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)/sign-up')({
  component: RouteComponent,
});

// const formSchema = z.object({
//   email: z.email('Invalid email address.'),
//   password: z
//     .string()
//     .min(8, 'Password must be at least 8 characters.')
//     .max(100, 'Password must be at most 100 characters.')
//     .regex(/\p{Lu}/u, 'Password must contain at least one uppercase letter.')
//     .regex(/[\p{N}\p{P}\p{S}]/u, 'Password must contain at least one number or special character.')
//     .refine((v) => !/\s/.test(v), 'Password must not contain whitespace.'),
// });

function RouteComponent() {
  return <div>Hello "/(auth)/sign-up"!</div>;
}
