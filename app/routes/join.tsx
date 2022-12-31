import * as React from "react";
import type {
  ActionArgs,
  LoaderArgs,
  MetaFunction,
  ActionFunction,
  LoaderFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

import { createUserSession, getUserId } from "~/session.server";
import { getUserByEmail, createUser } from "~/models/user.server";
import { validateEmail } from "~/utils";
import InputField from "~/components/InputField";

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const inviteCode = formData.get("invite") as string;

  const errors: { [name: string]: null | string } = {};

  let status: number | undefined;

  console.log("wilmer", process.env.INVITE_SECRET);
  if (inviteCode !== process.env.INVITE_SECRET) {
    errors.invite = "Invalid invite code";
    status = 403;
  }

  if (!validateEmail(email)) {
    errors.email = "Email is invalid";
    status = 400;
  }

  if (typeof password !== "string" || password.length === 0) {
    errors.password = "Password is required";
    status = 400;
  }

  if (!password || password.length < 8) {
    errors.password = "Password must be at least 8 characters";
    status = 400;
  }

  if (Object.entries(errors).length > 0) {
    return json({ errors }, { status });
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json(
      {
        errors: {
          email: "A user already exists with this email",
          password: null,
        },
      },
      { status: 400 }
    );
  }

  const user = await createUser(email, password);

  return createUserSession({
    request,
    userId: user.id,
    remember: false,
    redirectTo: "/",
  });
};

export const meta: MetaFunction = () => {
  return {
    title: "Sign Up",
  };
};

function JoinRoute() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="flex min-h-full flex-col justify-center">
      <div className="mx-auto w-full max-w-md px-8">
        <Form method="post" className="space-y-6">
          <InputField
            label="Email address"
            id="email"
            type="email"
            required
            placeholder="ariana@iscool.com"
            errorMessage={actionData?.errors?.email}
          />
          <InputField
            label="Password"
            id="password"
            type="password"
            required
            placeholder="super secret password"
            errorMessage={actionData?.errors?.password}
          />
          <InputField
            label="Invite Code"
            id="invite"
            type="text"
            required
            placeholder="nal@klsafjkl"
            errorMessage={actionData?.errors?.invite}
          />
          <button
            type="submit"
            className="w-full rounded bg-emerald-500  py-2 px-4 text-white hover:bg-emerald-600 focus:bg-emerald-400"
          >
            Sign Up
          </button>
        </Form>
      </div>
    </div>
  );
}

export default JoinRoute;
