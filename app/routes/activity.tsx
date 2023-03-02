import * as React from "react";
import { useLoaderData, Form } from "@remix-run/react";
import { redirect, json } from "@remix-run/node";
import type {
  LoaderFunction,
  ActionFunction,
  ActionArgs,
} from "@remix-run/node";

import Icon from "~/components/Icon";
import Layout from "~/components/Layout";
import { activityTypes, createActivity } from "~/models/activity.server";
import type { ActivityFormType } from "~/models/activity.server";
import { requireUser } from "~/session.server";
import humanizeConstant from "~/utils/humanizeConstant";
import TextArea from "~/components/TextArea";
import { colorTextStyles } from "~/tailwind/utils";

export const meta = () => {
  return {
    title: "Add New Activity",
  };
};

type LoaderData = {
  activityTypes: ActivityFormType[];
};

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  return {
    activityTypes,
  };
};

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const user = await requireUser(request);
  const childId = user.children[0].id;

  const formData = await request.formData();
  const type = formData.get("type") as string;
  const notes = formData.get("notes") as string;

  await createActivity(childId, { notes, type, timestamp: new Date() });

  return redirect("/");
};

function RadioInput() {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        name="type"
        value="GiBabyBottle"
        className="h-4 w-4 border-gray-300 text-emerald-600 focus:ring-emerald-500"
      />
    </div>
  );
}

function ActivityRoute() {
  const data = useLoaderData<LoaderData>();
  const [activity, setActivity] = React.useState<ActivityFormType | null>(null);

  return (
    <Layout>
      {activity && (
        <div className="flex flex-col">
          <button
            className="self-end rounded bg-emerald-500 py-1 px-2 text-sm text-white"
            type="button"
            onClick={() => setActivity(null)}
          >
            Back
          </button>
          <Form className="space-y-6" method="post">
            <div className="mt-8 w-full rounded px-2 py-1 text-lg">
              {activity.label}
            </div>

            <input hidden name="activity" value={activity.value} />

            <RadioInput />

            <TextArea
              label="Notes"
              id="notes"
              name="notes"
              rows={5}
              cols={33}
            />

            <button
              type="submit"
              className="bg-$ w-full rounded  py-2 px-4 text-white hover:bg-emerald-600 focus:bg-emerald-400"
            >
              Add
            </button>
          </Form>
        </div>
      )}

      <div className="start flex flex-wrap gap-4 text-2xl ">
        {!activity &&
          data.activityTypes.map((activityType) => {
            const color = colorTextStyles[activityType.color];

            return (
              <button
                key={activityType.value}
                type="button"
                className={`flex h-16 w-16 items-center justify-center rounded-full py-2 px-4 text-white ${color}}`}
                onClick={() => setActivity(activityType)}
              >
                <Icon name={activityType.icon} label={activityType.label} />
              </button>
            );
          })}
      </div>
    </Layout>
  );
}

export default ActivityRoute;
