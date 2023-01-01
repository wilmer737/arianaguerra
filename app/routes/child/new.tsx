import type {
  ActionArgs,
  ActionFunction,
  LoaderArgs,
  MetaFunction,
  LoaderFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

import InputField from "~/components/InputField";
import Layout from "~/components/Layout";
import { createChild } from "~/models/child.server";
import { getUserId, requireUserId } from "~/session.server";
import { isValidYYYYMM } from "~/utils/date";

export const meta: MetaFunction = () => {
  return {
    title: "Add Child",
  };
};

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  await requireUserId(request);
  return {};
};

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const userId = (await getUserId(request)) as string;
  const formData = await request.formData();
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const birthDate = formData.get("birthDate") as string;

  const errors: { [key: string]: string } = {};

  if (!firstName) {
    errors["firstName"] = "First name is required";
  }

  if (!lastName) {
    errors["lastName"] = "Last name is required";
  }

  if (!birthDate || !isValidYYYYMM(birthDate)) {
    errors["birthDate"] = "Birth date is invalid";
  }

  if (Object.entries(errors).length > 0) {
    return json({ errors }, { status: 400 });
  }

  await createChild(userId, {
    firstName,
    lastName,
    birthDate: new Date(birthDate),
  });

  return redirect("/");
};

/**
 * This route will allow users to create a new child
 * @returns {JSX.Element} - React Component
 */
function NewChildRoute() {
  const data = useActionData<typeof action>();
  return (
    <Layout title="Add Child" withFooter={false}>
      <Form method="post" className="space-y-6">
        <div className="flex gap-2">
          <InputField
            label="First Name"
            id="firstName"
            type="text"
            required
            placeholder="Ariana"
            errorMessage={data?.errors?.firstName}
          />

          <InputField
            label="Last Name"
            id="lastName"
            type="text"
            required
            placeholder="Guerra"
            errorMessage={data?.errors?.lastName}
          />
        </div>

        <InputField
          label="Last Name"
          id="birthDate"
          type="date"
          errorMessage={data?.errors?.birthDate}
        />

        <button
          type="submit"
          className="w-full rounded bg-emerald-500  py-2 px-4 text-white hover:bg-emerald-600 focus:bg-emerald-400"
        >
          Add
        </button>
      </Form>
    </Layout>
  );
}

export default NewChildRoute;
