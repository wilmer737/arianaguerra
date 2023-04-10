import { useLoaderData, Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";

import Icon from "~/components/Icon";
import Layout from "~/components/Layout";
import { activityTypes } from "~/models/activity.server";
import { requireUser } from "~/session.server";
import { colorTextStyles } from "~/tailwind/utils";
import humanizeConstant from "~/utils/humanizeConstant";

import type { ActivityType } from "~/types/activity.types";

export const meta = () => {
  return {
    title: "Add New Activity",
  };
};

type LoaderData = {
  activities: ActivityType[];
};

export const loader: LoaderFunction = async ({ request }) => {
  await requireUser(request);

  const activities: ActivityType[] = [
    {
      type: activityTypes.DIAPER_CHANGE,
      icon: "MdBabyChangingStation",
      color: "emerald",
    },
    {
      type: activityTypes.FEEDING,
      icon: "GiBabyBottle",
      color: "violet",
    },
    {
      type: activityTypes.SLEEP,
      icon: "GiNightSleep",
      color: "orange",
    },
    {
      type: activityTypes.MEDICATION,
      icon: "TbMedicineSyrup",
      color: "red",
    },
    {
      type: activityTypes.TUMMY_TIME,
      icon: "GiFloorHatch",
      color: "fuchsia",
    },
    {
      type: activityTypes.BATH,
      icon: "GiBathtub",
      color: "indigo",
    },
    {
      type: activityTypes.OTHER,
      icon: "GiBabyFace",
      color: "blue",
    },
  ];

  const data: LoaderData = {
    activities,
  };

  return json(data);
};

function ActivityRoute() {
  const data = useLoaderData<LoaderData>();

  return (
    <Layout>
      <div className="grid grid-cols-2">
        {data.activities.map((activity) => {
          const color = colorTextStyles[activity.color];
          const label = humanizeConstant(activity.type);

          return (
            <div key={activity.type} className="flex flex-col items-center">
              <Link
                to={`/activity/new?type=${activity.type}`}
                className={`flex h-16 w-16 items-center justify-center rounded-full py-2 px-4 text-3xl text-white ${color}}`}
              >
                <Icon name={activity.icon} label={label} />
              </Link>

              <div className="mt-2 text-sm text-white">{label}</div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export default ActivityRoute;
