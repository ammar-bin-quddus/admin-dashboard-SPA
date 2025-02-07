import React from "react";
import useUsers from "../hooks/UseUsers";

const AllUsers = () => {
  const { users, error } = useUsers();

  console.log(users, error);

  return (
    <div>
      <div className="mt-5 border-b-2 pb-2 mx-10">
        <h1 className="text-center text-xl md:text-2xl font-bold">
          Total Users: {users?.length}
        </h1>
      </div>
      <div className="overflow-x-auto overflow-y-scroll h-[400px] mx-10 my-3">
        <table className="w-full border-collapse border border-gray-300">
          {/* table head */}
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3 border border-gray-300">SN</th>
              <th className="p-3 border border-gray-300">Name</th>
              <th className="p-3 border border-gray-300">Email</th>
              <th className="p-3 border border-gray-300">City Name</th>
              <th className="p-3 border border-gray-300">Action</th>
            </tr>
          </thead>
          {/* table body */}
          <tbody>
            {users?.map((user, idx) => {
              return (
                <tr
                  key={idx}
                  className="odd:bg-gray-300 even:bg-gray-100 text-gray-900 font-bold"
                >
                  <td className="p-3 border border-gray-300">{idx + 1}</td>
                  <td className="p-2 border border-gray-300">{user?.name}</td>
                  <td className="p-2 border border-gray-300">{user?.email}</td>
                  <td className="p-2 border border-gray-300">
                    {user?.address?.city}
                  </td>
                  <td className="p-2 border border-gray-300">
                    <button className="px-3 py-1 text-sm font-medium bg-gray-800 text-white rounded-md hover:bg-gray-900 transition">
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
