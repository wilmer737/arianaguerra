import { useLoaderData, Link } from "@remix-run/react";

import { json, redirect } from "@remix-run/node";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { z } from "zod";
import { parseISO } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";

import { activityTypes, createActivity } from "~/models/activity.server";
import Layout from "~/components/Layout";
import ActivityForm from "~/components/forms/activity/form";
import { validator } from "~/components/forms/activity/validator";
import { getUser } from "~/session.server";
import ButtonComponent from "~/components/Button";
import { requireUser } from "~/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  await requireUser(request);

  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const type = searchParams.get("type");

  if (!type || !Object.values(activityTypes).includes(type)) {
    throw new Response("Not Found", { status: 404 });
  }

  return {
    type,
  };
};

export const action = async ({ request }: ActionArgs) => {
  const user = await getUser(request);
  if (!user) {
    return json({ errors: ["Not authorized"] }, { status: 401 });
  }

  const formData = await request.formData();
  const timestamp = formData.get("timestamp") as string;
  const notes = formData.get("notes");
  const type = formData.get("type");

  const metadata: Record<any, any> = {};
  let hasMetaData = false;
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("meta")) {
      metadata[key.replace("meta.", "")] = value;
      hasMetaData = true;
    }
  }

  const date = parseISO(timestamp);

  const data = {
    type,
    timestamp: zonedTimeToUtc(date, "America/Los_Angeles"),
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
  const data = useLoaderData<typeof loader>();
  const type = data.type;

  return (
    <Layout>
      <div>
        <Link to="/activity">
          <ButtonComponent width="auto" size="small" purpose="secondary">
            Back
          </ButtonComponent>
        </Link>
        <ActivityForm type={type} />
      </div>
    </Layout>
  );
}

export default ActivityTypeRoute;
