import CategoriesSkeleton from "../CategoriesSkeleton/CategoriesSkeleton";
import CategoriesList from "../CategoriesList/CategoriesList";
import { useCategories } from "../../Hooks/useCategories";

export default function Categories() {
  const { data: categories, isLoading } = useCategories();

  return (
    <div className="my-16">
      <h2 className="mb-10 text-3xl font-bold uppercase font-secondary">
        Categories
      </h2>
      {isLoading ? (
        <CategoriesSkeleton />
      ) : (
        <CategoriesList categories={categories} />
      )}
    </div>
  );
}
