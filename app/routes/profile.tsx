import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";

import { requireUser, setGlobalMessage } from "~/session.server";
import { updateUser } from "~/models/user.server";
import { ProfileView } from "~/components/Views/ProfileView";
import { profileValidator } from "~/components/forms/profile/validator";

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

  const validatedData = profileValidator.safeParse({
    name,
    email,
  });

  if (!validatedData.success) {
    const tidyErrors = validatedData.error.errors.reduce(
      (acc, error) => ({ ...acc, [error.path[0]]: error.message }),
      {}
    );
    return json({ errors: tidyErrors }, { status: 400 });
  }

  await updateUser(user.id, {
    name: validatedData.data.name,
    email: validatedData.data.email,
  });

  return redirect("/profile", {
    headers: {
      "Set-Cookie": await setGlobalMessage(
        request,
        "success",
        `Profile updated, ${name}!`
      ),
    },
  });
};

function ProfileRoute() {
  const data = useLoaderData<typeof loader>();
  const { user } = data;
  return <ProfileView user={user} />;
}

export default ProfileRoute;
