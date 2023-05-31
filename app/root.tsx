import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useCatch,
} from "@remix-run/react";

import { Toast } from "~/components/Toast";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import { sessionStorage, getSession } from "./session.server";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Ariana Guerra",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request);
  const message = session.get("successMessage");

  return json(
    {
      message,
    },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    }
  );
}

export default function App() {
  const data = useLoaderData();

  return (
    <html
      lang="en"
      className="h-full bg-gradient-to-br from-teal-400 to-teal-700"
    >
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Toast message={data.message} />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div>
      <h1>{error.name}</h1>
      <pre>{error.message}</pre>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>
          {caught.status} {caught.statusText}
        </h1>
        <Scripts />
      </body>
    </html>
  );
}
