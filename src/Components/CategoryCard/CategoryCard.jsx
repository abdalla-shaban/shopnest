export default function CategoryCard({ category }) {
  return (
    <div className="flex flex-col gap-5 p-4 bg-gray-200 rounded-xl">
      <img
        src={category.image}
        alt={category.name}
        className="object-contain mx-auto size-40 "
      />
      <h4 className="text-lg text-center uppercase font-secondary">
        {category.name}
      </h4>
    </div>
  );
}
