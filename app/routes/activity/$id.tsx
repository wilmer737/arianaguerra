import type {
  LoaderFunction,
  ActionFunction,
  ActionArgs,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import Layout from "~/components/Layout";
import { deleteActivity, getActivityById } from "~/models/activity.server";

import { requireUserId } from "~/session.server";

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

  await requireUserId(request);

  const activity = await getActivityById(id);
  return {
    activity,
  };
};

function Activity() {
  const data = useLoaderData<typeof loader>();

  return (
    <Layout>
      <h1>{data.activity.type}</h1>
      <p>{data.activity.timestamp}</p>
      <p>{data.activity.notes}</p>
    </Layout>
  );
}

export default Activity;
