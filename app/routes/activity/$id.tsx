import type {
  LoaderFunction,
  ActionFunction,
  ActionArgs,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

import { deleteActivity } from "~/models/activity.server";

import { requireUserId } from "~/session.server";

type Methods = "DELETE" | "POST";

const deleteHandler = async ({ params }: ActionArgs) => {
  const id = params.id;
  invariant(id, "id is required");

  await deleteActivity(id);
  return redirect("/");
};

const postHandler = async ({ params }: ActionArgs) => {};

const handlers = {
  DELETE: deleteHandler,
  POST: postHandler,
};

export const action: ActionFunction = async (ctx) => {
  await requireUserId(ctx.request);

  const handler = handlers[ctx.request.method as Methods];
  if (!handler) {
    return new Response("Method not allowed", { status: 405 });
  }

  return handler(ctx);
};

export const loader: LoaderFunction = async ({ request }) => {
  return {};
};
