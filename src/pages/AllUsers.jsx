import React from "react";
import UseUsers from "../hooks/UseUsers";

const AllUsers = () => {
  const [users, error] = UseUsers();

  console.log(users, error);

  return <div>AllUsers</div>;
};

export default AllUsers;
