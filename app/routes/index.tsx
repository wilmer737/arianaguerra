import * as React from "react";
import type { LoaderArgs, ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, Link, Form } from "@remix-run/react";
import { format, add, sub, parseISO } from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
  BsFillPencilFill,
} from "react-icons/bs";

import Button from "~/components/Button";
import Layout from "~/components/Layout";
import ActivityList, {
  type ActivityWithStringDates,
} from "~/components/ActivityList";

import { updateChild } from "~/models/child.server";
import { getActivityByChildId } from "~/models/activity.server";
import { requireUser, setGlobalMessage } from "~/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  const user = await requireUser(request);
  if (!user.children || user.children.length === 0) {
    return redirect("/child/new");
  }

  // todo: make this dynamic, probably based on the route
  const child = user.children[0];

  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const date = searchParams.get("date");

  if (!date) {
    const dateFilter = utcToZonedTime(new Date(), "America/Los_Angeles");
    return redirect(`/?date=${format(dateFilter, "y-MM-dd")}`);
  }

  const dateFilter = zonedTimeToUtc(parseISO(date), "America/Los_Angeles");

  const activities = await getActivityByChildId(child.id, {
    gte: dateFilter,
    lt: add(dateFilter, { days: 1 }),
  });

  return json({
    child,
    activities,
    date: dateFilter,
  });
};

export const action = async ({ request }: ActionArgs) => {
  const user = await requireUser(request);

  const formData = await request.formData();
  const photo = formData.get("photo");

  // todo: make this dynamic, probably based on the route
  const child = user.children[0];

  // todo: do zod validation
  if (!photo || typeof photo !== "string") {
    return redirect("/");
  }

  await updateChild(child.id, { imgUrl: photo });

  return redirect("/", {
    headers: {
      "Set-Cookie": await setGlobalMessage(request, "success", "Photo updated"),
    },
  });
};

function Summary({ activities }: { activities: ActivityWithStringDates[] }) {
  const getOunces = () => {
    return activities
      .filter((a) => a.type === "FEEDING")
      .reduce((acc, curr) => {
        if (!curr.metadata) return acc;
        const meta = JSON.parse(curr.metadata);

        const amount = Number(meta.amount);
        if (Number.isNaN(amount)) return acc;

        return acc + amount;
      }, 0);
  };

  return (
    <div className="w-full rounded-md bg-white p-4">
      <h2 className="text-lg">Today's Activity</h2>
      <p>Feeding: {getOunces()} ounces</p>
    </div>
  );
}

interface BabyAvatarProps {
  imgUrl?: string | null;
  firstName: string;
  lastName: string;
}

const availablePhotos = ["ariana.jpg", "mamas.jpg"];

function BabyAvatar({ imgUrl, firstName, lastName }: BabyAvatarProps) {
  const [editPhoto, setEditPhoto] = React.useState(false);
  const [selectedPhoto, setSelectedPhoto] = React.useState(imgUrl ?? "");

  return (
    <>
      <div className="relative">
        <img
          src={imgUrl || "ariana.jpg"}
          className="h-52 w-52 rounded-full border-4 object-cover"
          alt={`${firstName} ${lastName}`}
        />
        <button
          type="button"
          className="absolute right-6 bottom-1 rounded-full border-2 border-teal-500 bg-white p-2"
          onClick={() => setEditPhoto(true)}
        >
          <BsFillPencilFill />
        </button>
      </div>

      {editPhoto && (
        <Form method="post" reloadDocument>
          <input type="hidden" name="photo" value={selectedPhoto} />
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="mx-4 w-full rounded-md bg-white p-4">
              <h2 className="text-lg">Edit Photo</h2>

              <div className="flex flex-col items-center justify-center">
                {availablePhotos.map((photo) => {
                  return (
                    <button
                      key={photo}
                      type="button"
                      onClick={() => setSelectedPhoto(photo)}
                      className={`rounded-full p-2
                      ${
                        photo === selectedPhoto
                          ? "border-2 border-teal-500"
                          : ""
                      }
                    `}
                    >
                      <img
                        src={photo}
                        className={"h-32 w-32 rounded-full"}
                        alt={`${photo} ariana`}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="flex">
                <Button
                  purpose="tertiary"
                  type="button"
                  onClick={() => setEditPhoto(false)}
                  size="small"
                >
                  Close
                </Button>

                <Button purpose="primary" type="submit" size="small">
                  Save
                </Button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </>
  );
}

function Home() {
  const { child, activities, date } = useLoaderData<typeof loader>();
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

export default Home;
