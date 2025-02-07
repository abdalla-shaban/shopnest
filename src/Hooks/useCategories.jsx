import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getCategories = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/categories`
  );
  return data;
};

export const useCategories = () => {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    select: (data) => data?.data,
  });
  return query;
};
