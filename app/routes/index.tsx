import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { DateTime } from "luxon";
import { format, add, sub } from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";
import { parseISO } from "date-fns";

import Layout from "~/components/Layout";
import ActivityList from "~/components/ActivityList";

import { getActivityByChildId } from "~/models/activity.server";
import { requireUser } from "~/session.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const user = await requireUser(request);
  if (!user.children || user.children.length === 0) {
    return redirect("/child/new");
  }

  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const date = searchParams.get("date");
  if (!date) {
    return redirect(`/?date=${DateTime.local().toISODate()}`);
  }

  const dateFilter = zonedTimeToUtc(parseISO(date), "America/Los_Angeles");
  const activities = await getActivityByChildId(
    user.children[0].id,
    dateFilter
  );

  return json({
    // todo:later find a way to select and save the child
    child: user.children[0],
    activities,
    date: dateFilter,
  });
};

function Home() {
  const { child, activities, date } = useLoaderData<typeof loader>();

  const fullName = `${child.firstName} ${child.lastName}`;
  const d = utcToZonedTime(date, "America/Los_Angeles");

  const title = (
    <div className="flex items-center justify-center gap-2">
      <Link to={`/?date=${format(sub(d, { days: 1 }), "y-MM-dd")}`}>
        <BsFillArrowLeftSquareFill color="green" />
      </Link>
      <span>{format(d, "MM-dd-y")}</span>

      <Link to={`/?date=${format(add(d, { days: 1 }), "y-MM-dd")}`}>
        <BsFillArrowRightSquareFill color="green" />
      </Link>
    </div>
  );

  return (
    <Layout title={title}>
      <div className="flex flex-col items-center justify-center">
        <img
          src={child.imgUrl || "ariana_sono.jpg"}
          className="h-32 w-32 rounded-full border-4 border-emerald-600 object-cover"
          alt={fullName}
        />
        <div className="p-2 text-lg">{fullName}</div>
        <div className="h-12 w-full rounded-md border-2 border-blue-500 bg-blue-400 py-1 px-2 text-white">
          <h2 className="text-l">Latest Activity</h2>
        </div>

        <ActivityList activities={activities} />
      </div>
    </Layout>
  );
}

export default Home;
