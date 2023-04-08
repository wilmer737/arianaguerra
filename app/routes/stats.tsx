import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { zonedTimeToUtc } from "date-fns-tz";
import { startOfDay, endOfDay } from "date-fns";

import { requireUser } from "~/session.server";
import { prisma } from "~/db.server";
import StatsView from "~/components/Views/StatsView/StatsView";

export const meta = {
  title: "Stats",
  description: "Stats",
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request);

  const dateFilter = zonedTimeToUtc(new Date(), "America/Los_Angeles");

  const data = await prisma.activity.groupBy({
    by: ["type"],
    where: {
      childId: user.children[0].id,
      timestamp: {
        gte: startOfDay(dateFilter),
        lt: endOfDay(dateFilter),
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
