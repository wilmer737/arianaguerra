import type { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData, Outlet } from "@remix-run/react";

import Layout from "~/components/Layout";
import { activityTypes } from "~/models/activity.server";

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  return {
    activityTypes,
  };
};

function ActivityRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <Layout>
      <h1>Actvity</h1>
      <Outlet />
      {data.activityTypes.map((activityType: string) => (
        <div key={activityType}>
          <Link to={`/activity/new?name=${activityType}`}>{activityType}</Link>
        </div>
      ))}
    </Layout>
  );
}

export default ActivityRoute;
