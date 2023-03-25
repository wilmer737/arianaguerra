import { Form } from "@remix-run/react";
import { DateTime } from "luxon";
import { BsFillPencilFill, BsFillTrashFill, BsEyeFill } from "react-icons/bs";

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
    <ul className="mt-4 mb-16 h-72 w-full overflow-y-scroll px-2">
      {props.activities.map((activity) => {
        return (
          <li
            key={activity.id}
            className="mb-2 flex rounded-sm border-2 border-teal-500 bg-white py-2 px-4"
          >
            <div className="grow">
              <p className="font-bold">{humanizeConstant(activity.type)}</p>
              <p className="text-xs text-gray-600">
                {formatter.format(
                  DateTime.fromISO(activity.timestamp).toJSDate()
                )}
              </p>
              <p>{activity.notes}</p>
            </div>

            <div className="flex items-center gap-1">
              <BsEyeFill color="rgb(20 184 166)" />
              <BsFillPencilFill color="rgb(14 165 233)" />
              <Form
                method="delete"
                action={`/activity/${activity.id}`}
                className="flex items-center"
              >
                <button type="submit">
                  <BsFillTrashFill color="rgb(244 63 94)" />
                </button>
              </Form>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default Activities;
