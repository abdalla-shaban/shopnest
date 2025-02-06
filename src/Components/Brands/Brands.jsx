import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BrandsSkeleton from "../BrandsSkeleton/BrandsSkeleton";
const getBrands = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/brands`);
  return data;
};
export default function Brands() {
  const { data: brands, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
    select: (data) => data?.data,
  });

  return (
    <>
      {isLoading ? (
        <BrandsSkeleton />
      ) : (
        <div className="grid grid-cols-1 gap-8 my-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {brands?.map((brand) => (
            <div key={brand.slug} className="p-4 bg-gray-200 rounded-xl">
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full rounded-xl"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
