import { Link } from "react-router-dom";

export default function Sidebar() {

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-5">

      <ul className="space-y-4">

        <li>
          <Link to="/dashboard" className="block hover:text-gray-300">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/students" className="block hover:text-gray-300">
            Students
          </Link>
        </li>

        <li>
          <Link to="/students/add" className="block hover:text-gray-300">
            Add Student
          </Link>
        </li>

      </ul>

    </div>
  );
}