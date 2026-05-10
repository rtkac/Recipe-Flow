import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { z } from 'zod';

import { errorMessages } from './-constants';
import { signUpUserOptions } from './-queries/auth';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { m } from '@/paraglide/messages';

export const Route = createFileRoute('/(auth)/sign-up')({
  component: RouteComponent,
});

const formSchema = z
  .object({
    name: z.string().nonempty(m.sign_up_name_validation_error_message()),
    email: z.email(m.sign_up_email_validation_error_message()),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters.')
      .max(100, 'Password must be at most 100 characters.')
      .regex(/\p{Lu}/u, 'Password must contain at least one uppercase letter.')
      .regex(
        /[\p{N}\p{P}\p{S}]/u,
        'Password must contain at least one number or special character.',
      ),
    confirm_password: z.string().nonempty(m.sign_up_password_confirm_validation_error_message()),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) =>
      mutateAsync({
        name: value.name,
        email: value.email,
        password: value.password,
      }),
  });

  const { mutateAsync, isError, error } = useMutation(signUpUserOptions());

  return (
    <div className="flex flex-col gap-8 w-full max-w-md">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">{m.sign_up_title()}</h1>
        <p>{m.sign_up_desc()}</p>
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
              <form.Field name="name">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>{m.sign_up_name_label()}</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      type="text"
                      placeholder={m.sign_up_name_placeholder()}
                    />
                    {field.state.meta.isTouched && !field.state.meta.isValid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )}
              </form.Field>
              <form.Field name="email">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>{m.sign_up_email_label()}</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      type="email"
                      placeholder={m.sign_up_email_placeholder()}
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
                    <FieldLabel htmlFor={field.name}>{m.sign_up_password_label()}</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      type="password"
                      placeholder={m.sign_up_password_placeholder()}
                    />
                    {field.state.meta.isTouched && !field.state.meta.isValid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )}
              </form.Field>
              <form.Field name="confirm_password">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>
                      {m.sign_up_password_confirm_label()}
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      type="password"
                      placeholder={m.sign_up_password_confirm_placeholder()}
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
                  {m.sign_up_button_register()}{' '}
                  {isSubmitting && <Spinner data-icon="inline-start" />}
                </Button>
              )}
            </form.Subscribe>
          </Field>
          {isError && (
            <FieldError>
              {(error.code && errorMessages[error.code]) ?? m.sign_up_error_message()}
            </FieldError>
          )}
        </FieldGroup>
      </form>
      <p>
        {m.sign_up_login_desc()} <Link to="/sign-in">{m.sign_up_login_button()}</Link>
      </p>
    </div>
  );
}
