import type { LoaderFunction, ActionFunction } from "@remix-run/node";

import Layout from "~/components/Layout";
import { requireUserId } from "~/session.server";
// const supportedMethods = ["DELETE"] as const;

type Methods = "DELETE" | "POST";

const handlers: Record<Methods, (request: Request) => void> = {
  DELETE: async (request) => {},
  POST: async (request) => {},
};

export const loader: LoaderFunction = async () => {};

export const action: ActionFunction = async ({ request }) => {
  await requireUserId(request);

  const handler = handlers[request.method as Methods];
  if (!handler) {
    return new Response("Method not allowed", { status: 405 });
  }

  return handler(request);
};

function Activity() {
  return <Layout>Activity</Layout>;
}

export default Activity;
