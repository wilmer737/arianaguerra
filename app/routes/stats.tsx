import { json, redirect } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { zonedTimeToUtc, utcToZonedTime } from "date-fns-tz";
import { add, format, parseISO } from "date-fns";

import { requireUser } from "~/session.server";
import { prisma } from "~/db.server";
import StatsView from "~/components/Views/StatsView/StatsView";

export const meta = {
  title: "Stats",
  description: "Stats",
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request);

  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const date = searchParams.get("date");

  if (!date) {
    const dateFilter = utcToZonedTime(new Date(), "America/Los_Angeles");
    return redirect(`/stats?date=${format(dateFilter, "y-MM-dd")}`);
  }

  const dateFilter = zonedTimeToUtc(parseISO(date), "America/Los_Angeles");

  const data = await prisma.activity.groupBy({
    by: ["type"],
    where: {
      childId: user.children[0].id,
      timestamp: {
        gte: dateFilter,
        lt: add(dateFilter, { days: 1 }),
      },
    },
    _count: {
      type: true,
    },
    orderBy: {
      _count: {
        type: "desc",
      },
    },
  });

  const counts = data.map((d) => {
    return {
      type: d.type,
      count: d._count.type,
    };
  });

  return json({ counts });
};

function StatsRoute() {
  const data = useLoaderData<typeof loader>();
  return <StatsView counts={data.counts} />;
}

export default StatsRoute;
