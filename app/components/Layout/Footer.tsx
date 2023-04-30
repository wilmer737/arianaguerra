import { Link } from "@remix-run/react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaHome, FaChartBar, FaUserNinja, FaTrophy } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="border-t-2 bg-white py-2 text-center text-sm font-bold text-teal-500">
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
        <Link
          to="/milestones"
          className="flex flex-col items-center justify-center"
        >
          <FaTrophy className="text-xl" />
          Milestones
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
