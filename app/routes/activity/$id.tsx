import type {
  LoaderFunction,
  ActionFunction,
  ActionArgs,
} from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { useLoaderData, useCatch } from "@remix-run/react";
import invariant from "tiny-invariant";
import { format } from "date-fns";

import Layout from "~/components/Layout";
import { deleteActivity, getActivityById } from "~/models/activity.server";
import humanizeConstant from "~/utils/humanizeConstant";
import { requireUser, requireUserId } from "~/session.server";

type Methods = "DELETE";

const deleteHandler = async ({ params }: ActionArgs) => {
  const id = params.id;
  invariant(id, "id is required");

  await deleteActivity(id);
  return redirect("/");
};

const handlers = {
  DELETE: deleteHandler,
};

export const action: ActionFunction = async (ctx) => {
  await requireUserId(ctx.request);

  const handler = handlers[ctx.request.method as Methods];
  if (!handler) {
    return new Response("Method not allowed", { status: 405 });
  }

  return handler(ctx);
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const id = params.id;
  invariant(id, "id is required");

  const user = await requireUser(request);

  const activity = await getActivityById(id);
  if (!activity) {
    throw new Response("Not found", { status: 404 });
  }

  if (activity.childId !== user.children[0]?.id) {
    throw new Response("Forbidden", { status: 403 });
  }

  return json({
    activity,
  });
};

function MetadataDisplay({ metadata }: { metadata: Record<string, string> }) {
  return (
    <>
      <h2 className="text-xl">Additional Info</h2>
      {Object.entries(metadata).map(([key, value]) => {
        return (
          <div key={key}>
            <h3 className="text-sm font-bold">{key}</h3>
            <p>{value}</p>
          </div>
        );
      })}
    </>
  );
}

function ActivityRoute() {
  const data = useLoaderData<typeof loader>();
  const activity = data.activity;

  return (
    <Layout>
      <div className="w-full rounded-sm bg-white p-2">
        <h1 className="text-3xl">{humanizeConstant(data.activity.type)}</h1>
        <p className="text-sm text-slate-500">
          {format(new Date(data.activity.timestamp), "MMM do yyyy hh:mm aaa")}
        </p>
        <hr />

        <div className="p-2">
          <h2 className="text-xl">Notes</h2>
          <p>{data.activity.notes}</p>

          {activity.metadata && (
            <MetadataDisplay metadata={JSON.parse(activity.metadata)} />
          )}
        </div>
      </div>
    </Layout>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return (
      <Layout>
        <h1>Not Found</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1>whoops</h1>
    </Layout>
  );
}

export default ActivityRoute;
