import { Form } from "@remix-run/react";

import Field from "~/components/forms/fields/InputField";
import Button from "~/components/Button";
import type { User } from "~/models/user.server";

interface ProfileViewProps {
  user: User;
}

export function ProfileForm({ user }: ProfileViewProps) {
  return (
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
  );
}
