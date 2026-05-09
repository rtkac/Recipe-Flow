import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { signInUserOptions } from '@/queries/auth';

export const Route = createFileRoute('/(auth)/sign-in')({
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
const formSchema = z.object({
  email: z.email('Invalid email address.'),
  password: z.string().nonempty('Password is required.'),
});

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      await mutateAsync(value);
    },
  });

  const { mutateAsync, isError } = useMutation(signInUserOptions());

  return (
    <div className="flex flex-col gap-8 w-full max-w-md">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">Welcome back</h1>
        <p>Enter your credentials to access your digital kitchen.</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <FieldSet>
            <FieldGroup>
              <form.Field name="email">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>EMAIL ADDRESS</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      type="email"
                      placeholder="you@example.com"
                    />
                    {field.state.meta.isTouched && !field.state.meta.isValid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )}
              </form.Field>
              <form.Field name="password">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>PASSWORD</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      type="password"
                      placeholder="••••••••"
                    />
                    {field.state.meta.isTouched && !field.state.meta.isValid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )}
              </form.Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <form.Subscribe selector={(state) => state.isSubmitting}>
              {(isSubmitting) => (
                <Button type="submit" disabled={isSubmitting} size="lg" className="w-full">
                  Login {isSubmitting && <Spinner data-icon="inline-start" />}
                </Button>
              )}
            </form.Subscribe>
          </Field>
          {isError && <FieldError>Failed to sign in. Invalid email or password.</FieldError>}
        </FieldGroup>
      </form>
      <p>
        New to the flow? <Link to="/">Register</Link>
      </p>
    </div>
  );
}
