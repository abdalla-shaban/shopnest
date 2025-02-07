import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getProductDetails = async (productId) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/products/${productId}`
  );
  return data;
};

export const useProductsDetails = (id) => {
  const query = useQuery({
    queryKey: ["productDetails"],
    queryFn: () => getProductDetails(id),
  });
  return query;
};
