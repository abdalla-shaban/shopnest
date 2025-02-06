export default function BrandsSkeleton() {
  return (
    <div className="grid justify-center gap-8 my-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 animate-pulse">
      {Array.from({ length: 7 }, (_, i) => (
        <div key={i} className="bg-gray-200 size-52 rounded-xl"></div>
      ))}
    </div>
  );
}
