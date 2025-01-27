import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useProducts() {
  const response = useQuery({
    queryKey: ["Products"],
    queryFn: () => axios.get(`${import.meta.env.VITE_BASE_URL}/products`),
    refetchOnMount: false,
    select: (data) => data?.data,
  });
  return response;
}
