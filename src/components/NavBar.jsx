import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { LiaSignOutAltSolid } from "react-icons/lia";

const NavBar = () => {
  const { user, handleLogOut } = useContext(AuthContext);

  return (
    <div className="w-full px-3 py-4 bg-[#EAE2C6] flex justify-end">
      {user ? (
        // after login
        <>
          <div className="flex items-center gap-3">
            <img src={user?.photoURL} className="w-12 h-12 rounded-full" alt="avatar" />
            <button onClick={handleLogOut} className="text-red-500 text-3xl bg-white hover:bg-white/60 cursor-pointer active:scale-95 transition-transform p-2 rounded-full"><LiaSignOutAltSolid /></button>
          </div>
        </>
      ) : (
        // before login
        <>
          <div className="space-x-6">
            <Link to="/login">
              <button className="px-3 py-1 bg-gray-800 text-white rounded-sm text-md cursor-pointer hover:bg-gray-800 active:scale-95 transition-transform">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="px-3 py-1 bg-gray-800 text-white rounded-sm text-md cursor-pointer hover:bg-gray-800 active:scale-95 transition-transform">
                Register
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default NavBar;
