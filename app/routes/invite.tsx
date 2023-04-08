import { json, redirect } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";

import Button from "~/components/Button";
import Layout from "~/components/Layout/Layout";
import { requireUser } from "~/session.server";
import type { Child } from "~/models/child.server";
import Field from "~/components/forms/fields/InputField";
import { createUserAndConnectToChild } from "~/models/user.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request);
  return json({
    children: user.children,
  });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const childId = formData.get("child");
  const name = formData.get("name");
  const email = formData.get("email");

  if (!name || typeof name !== "string" || name.length === 0) {
    return json({ errors: { name: "Name is required" } }, { status: 400 });
  }

  if (!email || typeof email !== "string" || email.length === 0) {
    return json({ errors: { email: "Email is required" } }, { status: 400 });
  }

  if (!childId || typeof childId !== "string" || childId.length === 0) {
    return json({ errors: { child: "Child is required" } }, { status: 400 });
  }

  await createUserAndConnectToChild({ email, name }, "Invite737", childId);

  return redirect("/profile");
};

function InviteRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <Layout>
      <h2>Invite User</h2>

      <Form method="post">
        <div className="flex flex-col">
          <label htmlFor="child">Give Access To</label>
          <select name="child" id="child">
            <option value="">Select a child</option>
            {data.children.map((child: Child) => {
              return (
                <option key={child.id} value={child.id}>
                  {child.firstName} {child.lastName}
                </option>
              );
            })}
          </select>
        </div>

        <Field id="name" name="name" label="Name" required />
        <Field id="email" name="email" label="Email" type="email" required />

        <Button type="submit">Invite</Button>
      </Form>
    </Layout>
  );
}

export default InviteRoute;
