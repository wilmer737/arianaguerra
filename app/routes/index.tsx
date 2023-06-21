import type { LoaderArgs, ActionArgs, UploadHandler } from "@remix-run/node";
import {
  json,
  redirect,
  unstable_parseMultipartFormData as parseMultipartFormData,
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  writeAsyncIterableToWritable,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { format, add, sub, parseISO } from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

import { updateChild } from "~/models/child.server";
import { getActivityByChildId } from "~/models/activity.server";
import { requireUser, setGlobalMessage } from "~/session.server";
import HomeView from "~/components/Views/HomeView";
import { cloudinary } from "~/integrations/cloudinary.server";
import type { UploadApiResponse } from "cloudinary";

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

function uploadToCloudinary(
  data: AsyncIterable<Uint8Array>
): Promise<UploadApiResponse | undefined> {
  const prom: Promise<UploadApiResponse | undefined> = new Promise(
    async (res, rej) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "babyguerra/uploads/",
          type: "private",
        },
        (error, result) => {
          if (error) {
            rej(error);
          } else {
            res(result);
          }
        }
      );
      await writeAsyncIterableToWritable(data, uploadStream);
    }
  );

  return prom;
}

export const action = async ({ request }: ActionArgs) => {
  const user = await requireUser(request);

  const cloudUploadHandler: UploadHandler = async ({ data, name }) => {
    if (name !== "photo") {
      return undefined;
    }

    try {
      const uploadedImg = await uploadToCloudinary(data);
      return uploadedImg?.secure_url;
    } catch {
      return undefined;
    }
  };

  const uploadHandler = composeUploadHandlers(
    cloudUploadHandler,
    createMemoryUploadHandler()
  );

  const formData = await parseMultipartFormData(request, uploadHandler);

  const photo = formData.get("photo");

  // todo: make this dynamic, probably based on the route
  const child = user.children[0];

  // todo: do zod validation
  if (!photo || typeof photo !== "string") {
    return redirect("/", {
      headers: {
        "Set-Cookie": await setGlobalMessage(request, "error", "Invalid photo"),
      },
    });
  }

  await updateChild(child.id, { imgUrl: photo });

  return redirect("/", {
    headers: {
      "Set-Cookie": await setGlobalMessage(request, "success", "Photo updated"),
    },
  });
};

function Home() {
  const { child, activities, date } = useLoaderData<typeof loader>();

  return <HomeView child={child} date={date} activities={activities} />;
}

export default Home;
