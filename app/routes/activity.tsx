import * as React from "react";
import { useLoaderData, Form } from "@remix-run/react";
import { redirect, json } from "@remix-run/node";
import type {
  LoaderFunction,
  ActionFunction,
  ActionArgs,
} from "@remix-run/node";

import Layout from "~/components/Layout";
import { activityTypes } from "~/models/activity.server";
import humanizeConstant from "~/utils/humanizeConstant";
import TextArea from "~/components/TextArea";

export const meta = () => {
  return {
    title: "Add New Activity",
  };
};

export const loader: LoaderFunction = async () => {
  return {
    activityTypes,
  };
};

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const type = formData.get("type") as string;
  const notes = formData.get("notes") as string;

  return redirect("/");
};

function ActivityRoute() {
  const [activity, setActivity] = React.useState<string>("");
  const data = useLoaderData<typeof loader>();

  return (
    <Layout>
      {activity && (
        <div className="flex flex-col">
          <button
            className="self-end rounded bg-emerald-500 py-1 px-2 text-sm text-white"
            type="button"
            onClick={() => setActivity("")}
          >
            Back
          </button>
          <Form className="space-y-6" method="post">
            <div className="mt-8 w-full rounded px-2 py-1 text-lg">
              {humanizeConstant(activity)}
            </div>

            <input hidden name="activity" value={activity} />

            <TextArea
              label="Notes"
              id="notes"
              name="notes"
              rows={5}
              cols={33}
            />

            <button
              type="submit"
              className="w-full rounded bg-emerald-500  py-2 px-4 text-white hover:bg-emerald-600 focus:bg-emerald-400"
            >
              Add
            </button>
          </Form>
        </div>
      )}

      {!activity &&
        data.activityTypes.map((activityType: string) => (
          <div key={activityType}>
            <button type="button" onClick={() => setActivity(activityType)}>
              Add {activityType}
            </button>
          </div>
        ))}
    </Layout>
  );
}

export default ActivityRoute;
