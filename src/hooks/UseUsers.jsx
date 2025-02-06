import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import UseAuth from "./UseAuth";

const UseUsers = () => {
  const { user } = UseAuth();
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
