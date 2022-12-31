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
  console.log({ user, children: user.children });

  if (!user.children || user.children.length === 0) {
    return redirect("/child/new");
  }

  return json({
    // todo:later find a way to select and save the child
    child: user.children[0],
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
          className="rounded-full border-4 border-emerald-600 object-cover h-32 w-32"
          alt={fullName}
        />
        <div className="p-2 text-lg">{fullName}</div>
      </div>
    </Layout>
  );
}

export default Home;
