import CategoryCard from "../CategoryCard/CategoryCard";

export default function CategoriesList({ categories }) {
  return (
    <div className="grid grid-cols-1 gap-8 my-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {categories.map((category) => (
        <CategoryCard key={category.slug} category={category} />
      ))}
    </div>
  );
}
