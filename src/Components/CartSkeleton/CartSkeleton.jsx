export default function CartSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <div className="animate-pulse">
              <div className="flex items-center w-full gap-5 mt-2 ">
                <div className="w-1/5">
                  <div className="bg-gray-200  min-w-38 max-w-38 size-38" />
                </div>
                <div className="w-1/5 ">
                  <div className="w-1/2 h-3 my-2 bg-gray-200 rounded"></div>
                  <div className="w-1/3 h-3 my-2 bg-gray-200 rounded"></div>
                </div>
                <div className="w-1/5">
                  <div className="h-3 mx-auto my-2 bg-gray-200 rounded w-28"></div>
                </div>
                <div className="flex items-center justify-center w-1/5 gap-3 ">
                  <div className="my-2 bg-gray-200 rounded-lg size-6"></div>
                  <div className="my-2 bg-gray-200 rounded-lg size-10"></div>
                  <div className="my-2 bg-gray-200 rounded-lg size-6"></div>
                </div>
                <div className="flex items-center justify-center w-1/5 gap-3">
                  <div className="my-2 bg-gray-200 rounded-lg size-8"></div>
                  <div className="my-2 bg-gray-200 rounded-lg size-8"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
