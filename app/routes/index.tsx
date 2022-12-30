import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import Layout from "~/components/Layout";
import { requireUserId } from "~/session.server";

const activityTypes = [
  "DIAPER_CHANGE",
  "FEEDING",
  "SLEEP",
  "BATH",
  "MEDICATION",
  "OTHER",
];

export const loader = async ({ request }: LoaderArgs) => {
  await requireUserId(request);
  return json({
    activityTypes,
  });
};

function Home() {
  const data = useLoaderData<typeof loader>();

  return (
    <Layout title="Today">
      <div className="flex flex-col items-center justify-center">
        <img
          src="ariana_sono.jpg"
          className="h-40 w-40 rounded-full border-8 border-emerald-600 object-cover"
          alt="Abel"
        />
        <div className="p-2 text-lg">Ariana Guerra</div>
      </div>
    </Layout>
  );
}

export default Home;
