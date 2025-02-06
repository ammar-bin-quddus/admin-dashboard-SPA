import React from "react";
import { AiFillProduct } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-72 bg-gray-800 fixed h-full">
      {/* title */}
      <div className="p-3 my-3">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
      </div>
      <hr />

      {/* users and products */}
      <ul className="mt-5 font-bold">
        <li className="mb-2">
          <NavLink
            to="/allUsers"
            className={`flex items-center gap-2 text-white hover:shadow 
                      hover:bg-gray-300 hover:text-black p-3 rounded-sm 
              ${({ isActive }) =>
              isActive ? "active" : "" 
            }`}
          >
            <FaUser /> Users
          </NavLink>
        </li>
        <li className="mb-2">
          <NavLink
            to="/products"
            className={`flex items-center gap-2 text-white hover:shadow 
                      hover:bg-gray-300 hover:text-black p-3 rounded-sm 
              ${({ isActive }) =>
              isActive ? "active" : "" 
            }`}
          >
            <AiFillProduct /> Products
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
