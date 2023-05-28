import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData, useSearchParams } from "@remix-run/react";

import { createUserSession, getUserId } from "~/session.server";
import { verifyLogin } from "~/models/user.server";
import { safeRedirect } from "~/utils";
import LoginView from "~/components/Views/LoginView";
import { validator } from "~/components/forms/login/validator";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");
  const rememberMe = formData.get("remember");

  const validatedData = validator.safeParse({
    email,
    password,
    rememberMe,
  });

  if (!validatedData.success) {
    const tidyErrors = validatedData.error.errors.reduce(
      (acc, error) => ({ ...acc, [error.path[0]]: error.message }),
      {}
    );
    return json({ errors: tidyErrors }, { status: 400 });
  }

  const { email: vEmail, password: vPassword } = validatedData.data;

  const user = await verifyLogin(vEmail, vPassword);

  if (!user) {
    return json(
      { errors: { email: "Invalid email or password", password: null } },
      { status: 400 }
    );
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: rememberMe === "on" ? true : false,
    redirectTo,
  });
}

export const meta: MetaFunction = () => {
  return {
    title: "Login",
  };
};

export default function LoginRoute() {
  const actionData = useActionData<typeof action>();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";

  return <LoginView formErrors={actionData?.errors} redirectTo={redirectTo} />;
}
