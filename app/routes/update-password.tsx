import { Form } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";

import Layout from "~/components/Layout";
import Field from "~/components/forms/fields/InputField";
import Button from "~/components/Button";
import { verifyLogin } from "~/models/user.server";
import { requireUser } from "~/session.server";
import { updatePassword } from "~/models/password.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUser(request);
  return {};
};

export const action: ActionFunction = async ({ request }) => {
  const user = await requireUser(request);
  const formData = await request.formData();
  const currentPassword = formData.get("currentPassword");
  const password = formData.get("password");
  const passwordConfirmation = formData.get("passwordConfirmation");

  if (
    !currentPassword ||
    typeof currentPassword !== "string" ||
    currentPassword.length === 0
  ) {
    return json(
      { errors: { currentPassword: "Current Password is required" } },
      { status: 400 }
    );
  }

  if (!(await verifyLogin(user.email, currentPassword))) {
    return json(
      { errors: { currentPassword: "Current Password is incorrect" } },
      { status: 400 }
    );
  }

  if (!password || typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { password: "Password is required" } },
      { status: 400 }
    );
  }

  if (
    !passwordConfirmation ||
    typeof passwordConfirmation !== "string" ||
    passwordConfirmation.length === 0
  ) {
    return json(
      { errors: { passwordConfirmation: "Password Confirmation is required" } },
      { status: 400 }
    );
  }

  if (password !== passwordConfirmation) {
    return json(
      {
        errors: {
          passwordConfirmation: "Password Confirmation does not match Password",
        },
      },
      { status: 400 }
    );
  }

  await updatePassword(user.id, password);

  return redirect("/profile");
};

function UpdatePasswordRoute() {
  return (
    <Layout>
      <h2 className="text-lg font-bold">Update Password</h2>
      <Form method="post">
        <Field
          id="currentPassword"
          name="currentPassword"
          label="Current Password"
          type="password"
          required
        />
        <Field
          id="password"
          name="password"
          label="Password"
          type="password"
          required
        />
        <Field
          id="passwordConfirmation"
          name="passwordConfirmation"
          label="Password Confirmation"
          type="password"
          required
        />
        <Button type="submit">Update Password</Button>
      </Form>
    </Layout>
  );
}

export default UpdatePasswordRoute;
