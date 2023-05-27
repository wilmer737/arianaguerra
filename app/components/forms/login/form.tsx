import { Form, useActionData } from "@remix-run/react";
import Field from "~/components/forms/fields/InputField";
import Button from "~/components/Button";

interface LoginFormProps {
  redirectTo?: string;
}

export function LoginForm(props: LoginFormProps) {
  const { redirectTo = "/" } = props;
  const data = useActionData();

  return (
    <Form method="post" className="space-y-6">
      <Field
        label="email"
        type="email"
        required
        id="email"
        name="email"
        placeholder="your@email.com"
        autoFocus
        autoComplete="email"
        errorMessage={data?.errors?.email}
      />

      <Field
        label="password"
        type="password"
        required
        id="password"
        name="password"
        placeholder="password"
        autoComplete="current-password"
        errorMessage={data?.errors?.password}
      />

      <input type="hidden" name="redirectTo" value={redirectTo} />

      <Button type="submit">Login</Button>

      <div className="flex justify-end">
        <input
          id="remember"
          name="remember"
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="remember" className="ml-2 block text-sm">
          Remember me
        </label>
      </div>
    </Form>
  );
}
