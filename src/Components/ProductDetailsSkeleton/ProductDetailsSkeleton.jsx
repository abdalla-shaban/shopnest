import { FaHeart, FaStar } from "react-icons/fa6";

export default function ProductDetailsSkeleton() {
  return (
    <>
      <div className="flex flex-col items-center gap-20 md:flex-row md:gap-5 animate-pulse">
        <div className="w-full max-w-full md:max-w-1/3 md:w-1/3">
          <div className="w-full bg-gray-300 rounded-md h-60"></div>
        </div>
        <div className="w-full max-w-full md:flex-1">
          <div className="flex flex-col gap-4">
            <h4 className="w-1/2 h-4 bg-gray-300 rounded"></h4>
            <p className="h-4 bg-gray-300 rounded"></p>
            <div className="flex items-center">
              <FaStar className="text-gray-300" size={20} />
              <span className="bg-gray-300 rounded size-4"></span>
            </div>
            <div className="w-40 h-4 bg-gray-300 rounded"></div>
            <div>
              <span className="w-1/2 h-4 bg-gray-300 rounded"></span>
            </div>
            <div className="flex items-center w-full gap-3">
              <button className="flex-1 h-12 bg-gray-300 rounded-md"></button>
              <button className="flex items-center justify-center bg-gray-300 rounded-full size-12">
                <FaHeart size={26} className="text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
