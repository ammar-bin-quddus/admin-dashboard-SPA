import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const UseUsers = () => {
  const { user } = useContext(AuthContext);
  const { data: users, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        return res?.data;
      } catch (err) {
        throw new Error(
          err.response?.data?.message || "Failed to fetch users data"
        );
      }
    },
    enabled: !!user?.email,
  });
  return [users, error];
};

export default UseUsers;
