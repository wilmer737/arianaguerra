import { Link } from "@remix-run/react";
import { format, add, sub } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";

import { Summary } from "~/components/Views/HomeView/Summary";
import Layout from "~/components/Layout";
import ActivityList, {
  type ActivityWithStringDates,
} from "~/components/ActivityList";
import { BabyAvatar } from "~/components/Views/HomeView/BabyAvatar";
import type { Child } from "~/models/child.server";

interface HomeViewProps {
  child: Omit<Child, "birthDate" | "updatedAt" | "createdAt"> & {
    birthDate: string | null;
    updatedAt: string;
    createdAt: string;
  };
  date: string;
  activities: ActivityWithStringDates[];
}

export function HomeView({ child, date, activities }: HomeViewProps) {
  const d = utcToZonedTime(date, "America/Los_Angeles");
  const { imgUrl, firstName, lastName } = child;

  const title = (
    <div className="text-md flex items-center gap-2">
      <Link
        to={`/?date=${format(sub(d, { days: 1 }), "y-MM-dd")}`}
        className="bg-teal-500"
      >
        <BsFillArrowLeftSquareFill />
      </Link>
      <span>{format(d, "MM-dd-y")}</span>

      <Link
        to={`/?date=${format(add(d, { days: 1 }), "y-MM-dd")}`}
        className="bg-teal-500"
      >
        <BsFillArrowRightSquareFill />
      </Link>
    </div>
  );

  return (
    <Layout title={title}>
      <div className="flex flex-1 flex-col items-center">
        <BabyAvatar imgUrl={imgUrl} firstName={firstName} lastName={lastName} />
        <div className="p-2 font-['Arial_Black'] text-3xl text-white">
          {firstName}
        </div>
        <Summary activities={activities} />
        <ActivityList activities={activities} />
      </div>
    </Layout>
  );
}
