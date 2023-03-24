import * as React from "react";
import { Link, Form } from "@remix-run/react";

type LayoutProps = {
  children: React.ReactNode;
  title?: string | React.ReactNode;
  withFooter?: boolean;
};

function ProfileButton() {
  return (
    <Form method="post" action="/logout">
      <button
        className="absolute top-2 right-2 rounded bg-emerald-600 py-1 px-2 text-sm text-white hover:bg-emerald-700"
        type="submit"
      >
        Logout
      </button>
    </Form>
  );
}

function Footer() {
  return (
    <footer className="fixed bottom-0 right-0 left-0 bg-emerald-600 py-2 text-center text-sm font-bold text-white">
      <nav className="flex items-center justify-evenly">
        <Link to="/">Home</Link>

        <Link to="/">Stats</Link>

        <Link to="/activity">
          <button
            type="button"
            className="h-12 w-12 rounded-full border-none bg-emerald-400 text-white"
          >
            +
          </button>
        </Link>
        <Link to="/">Children</Link>
        <Link to="/profile">User</Link>
      </nav>
    </footer>
  );
}

const Layout: React.FC<LayoutProps> = ({
  children,
  withFooter = true,
  title = "Ariana Guerra",
}) => {
  return (
    <div className="relative flex h-full flex-col">
      <ProfileButton />

      <header className="m-8 rounded-md">
        <h1 className="text-center text-2xl">{title}</h1>
      </header>

      <div className="ml-8 mr-8 flex-grow">{children}</div>

      {withFooter && <Footer />}
    </div>
  );
};

export default Layout;
