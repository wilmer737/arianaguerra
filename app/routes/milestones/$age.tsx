import { redirect, json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { milestones } from "~/components/Views/MilestonesView/milestones.server";
import type { Milestone } from "~/components/Views/MilestonesView/milestones.server";

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.age) {
    return redirect("/milestones");
  }

  const age = params.age.replace("_", " ");

  if (!(age in milestones)) {
    return redirect("/milestones");
  }

  const milestone = milestones[age];
  return json({ milestone, age });
};

function MilestoneAgeRoute() {
  const data = useLoaderData<{ milestone: Milestone; age: string }>();
  const { milestone, age } = data;

  return (
    <div>
      <h2 className="text-2xl font-bold text-white">{age} milestones</h2>
      {Object.entries(milestone).map(([key, value]) => {
        return (
          <div key={key}>
            <h3 className="font-bold text-white">{key}</h3>
            {value.map((val) => {
              return (
                <div key={val}>
                  <input type="checkbox" id={val} name={val} value={val} />
                  <label htmlFor={val}>{val}</label>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default MilestoneAgeRoute;
