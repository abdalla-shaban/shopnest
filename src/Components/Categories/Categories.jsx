import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CategoriesSkeleton from "../CategoriesSkeleton/CategoriesSkeleton";

const getCategories = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/categories`
  );
  return data;
};

export default function Categories() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    select: (data) => data?.data,
  });

  return (
    <>
      {isLoading ? (
        <CategoriesSkeleton />
      ) : (
        <div className="grid grid-cols-1 gap-8 my-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {categories.map((category) => (
            <div
              key={category.slug}
              className="flex flex-col gap-5 p-4 bg-gray-200 rounded-xl"
            >
              <img
                src={category.image}
                alt={category.name}
                className="object-contain mx-auto size-40 "
              />
              <h4 className="text-lg text-center uppercase font-secondary">
                {category.name}
              </h4>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
