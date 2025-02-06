export default function CardSkeleton() {
  return (
    <>
      <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {Array.from({ length: 12 }, (_, i) => (
          <div className="flex flex-col animate-pulse" key={i}>
            <div className="w-full mt-2">
              <div className="h-64 bg-gray-200" />
              <div>
                <div className="w-1/2 h-4 my-2 bg-gray-200 rounded"></div>
              </div>
              <ul className="mt-3 space-y-2">
                <li className="w-full h-4 bg-gray-200 rounded-full " />
                <li className="w-full h-4 bg-gray-200 rounded-full " />
              </ul>
              <ul className="flex justify-between mt-3 space-y-2">
                <li className="w-16 h-4 bg-gray-200 rounded-full " />
                <li className="w-16 h-4 bg-gray-200 rounded-full " />
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
