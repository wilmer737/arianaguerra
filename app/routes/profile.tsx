import { json, redirect } from "@remix-run/node";
import { Link, Form, useLoaderData } from "@remix-run/react";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";

import Layout from "~/components/Layout/Layout";
import Button from "~/components/Button";
import { requireUser } from "~/session.server";
import Field from "~/components/forms/fields/InputField";
import { updateUser } from "~/models/user.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request);
  return {
    user,
  };
};

export const action: ActionFunction = async ({ request }) => {
  const user = await requireUser(request);

  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");

  if (!name || typeof name !== "string" || name.length === 0) {
    return json({ errors: { name: "Name is required" } }, { status: 400 });
  }

  if (!email || typeof email !== "string" || email.length === 0) {
    return json({ errors: { email: "Email is required" } }, { status: 400 });
  }

  await updateUser(user.id, { name, email });

  return redirect("/profile");
};

function ProfileRoute() {
  const data = useLoaderData<typeof loader>();
  const { user } = data;
  return (
    <Layout>
      <div className="w-full">
        <h2 className="text-lg font-bold text-white">Profile</h2>
        <Form method="post">
          <Field
            id="name"
            name="name"
            label="Name"
            defaultValue={user.name ?? ""}
            required
          />

          <Field
            id="email"
            name="email"
            label="Email"
            defaultValue={user.email}
            required
          />

          <Button type="submit">Update Profile</Button>
        </Form>

        <hr />

        <h2 className="text-lg font-bold text-white">Password</h2>
        <Link to="/update-password">
          <Button type="button">Update Password</Button>
        </Link>

        <hr />

        <h2 className="text-lg font-bold text-white">Invite User</h2>
        <Link to="/invite">
          <Button type="button">Invite User</Button>
        </Link>
      </div>
    </Layout>
  );
}

export default ProfileRoute;
