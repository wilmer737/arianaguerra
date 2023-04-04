import * as React from "react";
import { Link, Form } from "@remix-run/react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaHome, FaChartBar, FaBaby, FaUserNinja } from "react-icons/fa";

type LayoutProps = {
  children: React.ReactNode;
  title?: string | React.ReactNode;
  withFooter?: boolean;
};

function ProfileButton() {
  return (
    <Form method="post" action="/logout">
      <button
        className="rounded bg-white py-1 px-2 text-sm text-teal-500 hover:bg-teal-100"
        type="submit"
      >
        Logout
      </button>
    </Form>
  );
}

function Footer() {
  return (
    <footer className="fixed bottom-0 right-0 left-0 border-t-2 bg-white py-2 text-center text-sm font-bold text-teal-500">
      <nav className="flex items-center justify-evenly">
        <Link to="/" className="flex flex-col items-center justify-center">
          <FaHome className="text-xl" />
          Home
        </Link>

        <Link to="/stats" className="flex flex-col items-center justify-center">
          <FaChartBar className="text-xl" />
          Stats
        </Link>

        <Link to="/activity">
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full border-none bg-teal-500 text-2xl"
          >
            <AiOutlinePlus color="white" />
          </button>
        </Link>
        <Link to="/" className="flex flex-col items-center justify-center">
          <FaBaby className="text-xl" />
          Children
        </Link>

        <Link
          to="/profile"
          className="flex flex-col items-center justify-center"
        >
          <FaUserNinja className="text-xl" />
          User
        </Link>
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
    <div className="relative flex h-full flex-col text-white">
      <header className="flex h-16 justify-center rounded-md p-4">
        <h1 className="text-2xl text-white">{title}</h1>
        <div className="absolute right-2 top-4">
          <ProfileButton />
        </div>
      </header>

      <div className="ml-8 mr-8 flex-grow">{children}</div>

      {withFooter && <Footer />}
    </div>
  );
};

export default Layout;
