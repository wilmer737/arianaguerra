import { Outlet } from "@remix-run/react";

import Layout from "~/components/Layout";
import AgeSelector from "~/components/Views/MilestonesView/AgeSelector";

interface MilestonesViewProps {
  ages: string[];
}

function MilestonesView({ ages }: MilestonesViewProps) {
  return (
    <Layout title="Milestones">
      <AgeSelector ages={ages} />
      <div className="mt-2 overflow-y-scroll">
        <Outlet />
      </div>
    </Layout>
  );
}

export default MilestonesView;
