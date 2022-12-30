import * as React from "react";
import { Link } from "@remix-run/react";

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

function ProfileButton() {
  return (
    <button className="absolute top-1 right-1">
      <img
        src="ariana_sono.jpg"
        className="h-7 w-7 rounded-full border-2"
        alt="Profile"
      />
    </button>
  );
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = "Ariana Guerra",
}) => {
  return (
    <div className="relative flex h-full flex-col">
      <ProfileButton />

      <header className="m-8 rounded-md">
        <h1 className="text-center text-2xl">{title}</h1>
      </header>

      <div className="ml-8 mr-8 flex-grow">{children}</div>

      <footer className="m-8 rounded-xl bg-emerald-200 py-2 text-center text-sm">
        <nav className="flex justify-evenly">
          <button>Home</button>
          <Link to="/activity">
            <button
              type="button"
              className="h-12 w-12 rounded-full border-none bg-emerald-700 text-white"
            >
              +
            </button>
          </Link>
          <button>Stats</button>
        </nav>
      </footer>
    </div>
  );
};

export default Layout;
