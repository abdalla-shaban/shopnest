export default function AllOrdersSkeleton() {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg animate-pulse">
      <div className="flex items-center justify-between h-10 gap-5 p-5 pt-8 bg-gray-200">
        <div className="flex-1 h-6 bg-gray-300 rounded"></div>
        <div className="flex-1 h-6 bg-gray-300 rounded"></div>
        <div className="flex-1 h-6 bg-gray-300 rounded"></div>
        <div className="flex-1 h-6 bg-gray-300 rounded"></div>
        <div className="flex-1 h-6 bg-gray-300 rounded"></div>
      </div>
      <div className="flex items-center justify-between h-20 gap-5 p-5 bg-gray-200">
        <div className="flex flex-wrap flex-1 h-10 gap-5 ">
          <div className="bg-gray-300 size-10"></div>
          <div className="bg-gray-300 size-10"></div>
          <div className="bg-gray-300 size-10"></div>
        </div>
        <div className="flex flex-col flex-1 h-10 gap-3">
          <div className="w-40 h-5 bg-gray-300 rounded"></div>
          <div className="w-32 h-5 bg-gray-300 rounded"></div>
        </div>
        <div className="flex flex-col flex-1 h-12 gap-3">
          <div className="w-40 h-4 bg-gray-300 rounded"></div>
          <div className="w-40 h-4 bg-gray-300 rounded"></div>
          <div className="w-32 h-4 bg-gray-300 rounded"></div>
        </div>
        <div className="flex-1 h-10 bg-gray-300 rounded"></div>
        <div className="flex-1 h-10 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}
