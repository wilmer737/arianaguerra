import { useParams } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";

import { activityTypes } from "~/models/activity.server";
import Layout from "~/components/Layout";
import ActivityForm from "~/components/forms/activity/form";
import {
  validator,
  ValidatorError,
} from "~/components/forms/activity/validator";

export const loader = async ({ params }: LoaderArgs) => {
  if (!params.type || !Object.values(activityTypes).includes(params.type)) {
    throw new Response("Not Found", { status: 404 });
  }

  return {};
};

export const action = async ({ request, params }: ActionArgs) => {
  const formData = await request.formData();
  const timestamp = formData.get("timestamp") as string;
  const notes = formData.get("notes");

  const [hours, minutes] = timestamp.split(":").map((n) => parseInt(n, 10));
  const timestampAsDate = new Date();
  timestampAsDate.setHours(hours);
  timestampAsDate.setMinutes(minutes);

  const data = {
    type: params.type,
    timestamp: timestampAsDate,
    notes,
  };

  let validatedData;
  try {
    validatedData = validator.parse(data);
  } catch (error) {
    if (error instanceof ValidatorError) {
      return json({ errors: error.errors }, { status: 422 });
    }
    return json({ errors: ["Something went wrong"] }, { status: 500 });
  }

  return validatedData;
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
