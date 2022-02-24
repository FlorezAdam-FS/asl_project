import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn }) => {
  // Has a Logo and Two Links
  return (
    <nav className="p-3 bg-zinc-200 flex items-center justify-between">
      <Link to="/">ASL Project</Link>
      <ul className="flex items-center justify-end">
        <li className="mr-4">
          <Link to="/">Home</Link>
        </li>
        {isLoggedIn && (
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
