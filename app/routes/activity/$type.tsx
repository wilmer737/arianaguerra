import { useParams } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { z } from "zod";
import { parseISO } from "date-fns";

import { activityTypes, createActivity } from "~/models/activity.server";
import Layout from "~/components/Layout";
import ActivityForm from "~/components/forms/activity/form";
import { validator } from "~/components/forms/activity/validator";
import { getUser } from "~/session.server";

export const loader = async ({ params }: LoaderArgs) => {
  if (!params.type || !Object.values(activityTypes).includes(params.type)) {
    throw new Response("Not Found", { status: 404 });
  }

  return {};
};

export const action = async ({ request, params }: ActionArgs) => {
  const user = await getUser(request);
  if (!user) {
    return json({ errors: ["Not authorized"] }, { status: 401 });
  }

  const formData = await request.formData();
  const timestamp = formData.get("timestamp") as string;
  const notes = formData.get("notes");

  const metadata: Record<any, any> = {};
  let hasMetaData = false;
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("meta")) {
      metadata[key.replace("meta.", "")] = value;
      hasMetaData = true;
    }
  }

  // eslint-disable-next-line no-console
  console.log(parseISO(timestamp));

  const data = {
    type: params.type,
    timestamp: parseISO(timestamp),
    notes: notes,
    metadata: hasMetaData ? JSON.stringify(metadata) : undefined,
  };

  let validatedData;
  try {
    validatedData = validator.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return json({ errors: error.errors }, { status: 422 });
    }
    return json({ errors: ["Something went wrong"] }, { status: 500 });
  }

  await createActivity(user.children[0].id, validatedData);

  return redirect("/");
};

function ActivityTypeRoute() {
  const params = useParams();
  const type = params.type as string;

  return (
    <Layout>
      <ActivityForm type={type} />
    </Layout>
  );
}

export default ActivityTypeRoute;
