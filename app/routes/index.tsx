import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import Layout from "~/components/Layout";
import { getActivityByChildId } from "~/models/activity.server";
import { requireUser } from "~/session.server";
import humanizeConstant from "~/utils/humanizeConstant";

export const loader = async ({ request }: LoaderArgs) => {
  const user = await requireUser(request);

  if (!user.children || user.children.length === 0) {
    return redirect("/child/new");
  }

  return json({
    // todo:later find a way to select and save the child
    child: user.children[0],
    activities: await getActivityByChildId(user.children[0].id),
  });
};

function Home() {
  const { child, activities } = useLoaderData<typeof loader>();

  const fullName = `${child.firstName} ${child.lastName}`;
  return (
    <Layout title="Today">
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

        {activities.map((activity) => {
          // eslint-disable-next-line no-console
          console.log("activity", activity);

          const date = new Date(activity.timestamp);
          return (
            <div key={activity.id}>
              <p>{humanizeConstant(activity.type)}</p>
              <p>{`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}</p>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export default Home;
