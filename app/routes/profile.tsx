import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";

import { requireUser, setGlobalMessage } from "~/session.server";
import { updateUser } from "~/models/user.server";
import { ProfileView } from "~/components/Views/ProfileView";

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

  return redirect("/profile", {
    headers: {
      "Set-Cookie": await setGlobalMessage(
        request,
        "success",
        "Profile updated!"
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
