import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import MilestonesView from "~/components/Views/MilestonesView";
import { milestones } from "~/components/Views/MilestonesView/milestones.server";

export const loader = async () => {
  return json({
    milestonesAges: Object.keys(milestones),
  });
};

function MilestonesRoute() {
  const data = useLoaderData<typeof loader>();
  return <MilestonesView ages={data.milestonesAges} />;
}

export default MilestonesRoute;
