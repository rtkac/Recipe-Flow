import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { m } from '@/paraglide/messages';
import { signInUserOptions } from '@/queries/auth';

export const Route = createFileRoute('/(auth)/sign-in')({
  component: RouteComponent,
});

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
        <h1 className="text-4xl font-bold">{m.sign_in_title()}</h1>
        <p>{m.sign_in_desc()}</p>
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
                    <FieldLabel htmlFor={field.name}>{m.sign_in_email_label()}</FieldLabel>
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
                    <FieldLabel htmlFor={field.name}>{m.sign_in_password_label()}</FieldLabel>
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
          {isError && <FieldError>{m.sign_in_error_message()}</FieldError>}
        </FieldGroup>
      </form>
      <p>
        {m.sign_in_register_desc()} <Link to="/sign-up">{m.sign_in_button_register()}</Link>
      </p>
    </div>
  );
}
