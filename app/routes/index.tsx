import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import Layout from "~/components/Layout";
import { requireUser } from "~/session.server";

const activityTypes = [
  "DIAPER_CHANGE",
  "FEEDING",
  "SLEEP",
  "BATH",
  "MEDICATION",
  "OTHER",
];

export const loader = async ({ request }: LoaderArgs) => {
  const user = await requireUser(request);

  if (!user.children || user.children.length === 0) {
    return redirect("/child/new");
  }

  return json({
    // todo:later find a way to select and save the child
    child: user.children[0],
    activityTypes,
  });
};

function Home() {
  const { child } = useLoaderData<typeof loader>();
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
        <div className="w-full rounded-md border-2 border-red-500 bg-red-400 text-white h-12 py-1 px-2">
          <h2 className="text-l">Latest Activity</h2>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
