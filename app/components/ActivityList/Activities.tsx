import { Form } from "@remix-run/react";
import { DateTime } from "luxon";

import type { Activity } from "~/models/activity.server";
import humanizeConstant from "~/utils/humanizeConstant";

type ActivityWithStringDates = Omit<
  Activity,
  "createdAt" | "updatedAt" | "timestamp"
> & {
  createdAt: string;
  updatedAt: string;
  timestamp: string;
};

interface ActivitiesProps {
  activities: ActivityWithStringDates[];
}

const formatter = Intl.DateTimeFormat([], {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  timeZone: "America/Los_Angeles",
});

function Activities(props: ActivitiesProps) {
  if (props.activities.length === 0) {
    return <div className="mt-4">no activities</div>;
  }

  return (
    <ul className="mt-4 mb-16 h-72 w-full overflow-y-scroll">
      {props.activities.map((activity) => {
        return (
          <li
            key={activity.id}
            className="mb-2 rounded-sm border-2  border-gray-400 py-2 px-4"
          >
            <p className="font-bold">{humanizeConstant(activity.type)}</p>
            <p>
              {formatter.format(
                DateTime.fromISO(activity.timestamp).toJSDate()
              )}
            </p>
            <p>{activity.notes}</p>

            <Form method="delete" action={`/activity/${activity.id}`}>
              <button type="submit" className="bg-red-400 px-4 py-2 text-white">
                Delete
              </button>
            </Form>
          </li>
        );
      })}
    </ul>
  );
}

export default Activities;
