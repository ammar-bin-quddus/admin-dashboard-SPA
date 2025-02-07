import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "./useAuth";


const useUsers = () => {
  const { user } = useAuth();
  // console.log(user)
  const { data: users, error, refetch } = useQuery({
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
  return {users, error, refetch};
};

export default useUsers;
