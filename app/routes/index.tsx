import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { format, add, sub, parseISO } from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";

import Layout from "~/components/Layout";
import ActivityList from "~/components/ActivityList";

import { getActivityByChildId } from "~/models/activity.server";
import { requireUser } from "~/session.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const user = await requireUser(request);
  if (!user.children || user.children.length === 0) {
    return redirect("/child/new");
  }

  // todo: make this dynamic, probably based on the route
  const child = user.children[0];

  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const date = searchParams.get("date");

  if (!date) {
    const dateFilter = utcToZonedTime(new Date(), "America/Los_Angeles");
    return redirect(`/?date=${format(dateFilter, "y-MM-dd")}`);
  }

  const dateFilter = zonedTimeToUtc(parseISO(date), "America/Los_Angeles");

  const activities = await getActivityByChildId(child.id, {
    gte: dateFilter,
    lt: add(dateFilter, { days: 1 }),
  });

  return json({
    child,
    activities,
    date: dateFilter,
  });
};

function Home() {
  const { child, activities, date } = useLoaderData<typeof loader>();

  const fullName = `${child.firstName} ${child.lastName}`;
  const d = utcToZonedTime(date, "America/Los_Angeles");

  const title = (
    <div className="text-md flex items-center gap-2">
      <Link
        to={`/?date=${format(sub(d, { days: 1 }), "y-MM-dd")}`}
        className="bg-teal-500"
      >
        <BsFillArrowLeftSquareFill />
      </Link>
      <span>{format(d, "MM-dd-y")}</span>

      <Link
        to={`/?date=${format(add(d, { days: 1 }), "y-MM-dd")}`}
        className="bg-teal-500"
      >
        <BsFillArrowRightSquareFill />
      </Link>
    </div>
  );

  return (
    <Layout title={title}>
      <div className="flex flex-1 flex-col items-center">
        <img
          src={child.imgUrl || "ariana.jpg"}
          className="h-52 w-52 rounded-full border-4 object-cover"
          alt={fullName}
        />
        <div className="p-2 font-['Arial_Black'] text-3xl text-white">
          {child.firstName}
        </div>
        <div className="flex h-12 w-full items-center rounded-md border-2 border-teal-700 bg-teal-500 py-1 px-2 text-white">
          <h2 className="text-l">Latest Activity</h2>
        </div>

        <ActivityList activities={activities} />
      </div>
    </Layout>
  );
}

export default Home;
