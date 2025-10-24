export default function TodosLoadingSkeleton() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Page heading */}
      <div className="animate-pulse">
        <div className="h-7 w-40 bg-gray-300 rounded mb-6"></div>

        {/* Todo cards */}
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="h-5 w-2/3 bg-gray-300 rounded"></div>
                <div className="h-5 w-14 bg-gray-200 rounded-full"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
              <div className="border-t border-gray-100 mt-4 pt-3 flex justify-between text-sm">
                <div className="h-3 w-32 bg-gray-200 rounded"></div>
                <div className="h-3 w-28 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
