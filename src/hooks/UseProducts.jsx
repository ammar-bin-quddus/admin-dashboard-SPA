import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "./useAuth";

const useProducts = () => {
  const { user } = useAuth();
  const { data: products, error, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          "https://api.restful-api.dev/objects"
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
  return {products, error, refetch};
};

export default useProducts;
