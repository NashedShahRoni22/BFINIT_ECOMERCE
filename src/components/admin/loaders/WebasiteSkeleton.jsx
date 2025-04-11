const WebsiteSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Top Navbar */}
      <div className="flex h-16 w-full items-center bg-gray-200 px-4">
        <div className="flex w-full items-center">
          {/* Brand Logo */}
          <div className="h-8 w-24 rounded bg-gray-300"></div>

          {/* Search Bar */}
          <div className="ml-8 h-10 max-w-xl flex-grow rounded bg-gray-300"></div>

          {/* Navigation Icons */}
          <div className="ml-auto flex space-x-4">
            <div className="h-8 w-8 rounded-full bg-gray-300"></div>
            <div className="h-8 w-8 rounded-full bg-gray-300"></div>
            <div className="h-8 w-8 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="flex">
        {/* Left Sidebar (~1/3 width) */}
        <div className="hidden w-1/6 bg-gray-100 p-4 md:block">
          {/* Sidebar Categories */}
          <div className="mb-6">
            <div className="mb-4 h-6 w-32 rounded bg-gray-300"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center py-2">
                <div className="mr-2 h-4 w-4 rounded bg-gray-300"></div>
                <div className="h-4 w-24 rounded bg-gray-300"></div>
              </div>
            ))}
          </div>

          {/* Sidebar Filters */}
          <div>
            <div className="mb-4 h-6 w-32 rounded bg-gray-300"></div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="mb-3">
                <div className="mb-2 h-4 w-full rounded bg-gray-300"></div>
                <div className="h-4 w-3/4 rounded bg-gray-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area (~2/3 width) */}
        <div className="w-full p-4 md:w-2/3">
          {/* Banner */}
          <div className="mb-6 h-48 w-full rounded-lg bg-gray-200"></div>

          {/* Slider/Carousel */}
          <div className="mb-6 h-12 w-full rounded-lg bg-gray-200"></div>

          {/* Category Section */}
          <div className="mb-8">
            <div className="mb-4 h-6 w-32 rounded bg-gray-300"></div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 rounded-lg bg-gray-200"></div>
              ))}
            </div>
          </div>

          {/* Highlight Section */}
          <div className="mb-8">
            <div className="mb-4 h-6 w-32 rounded bg-gray-300"></div>
            <div className="h-48 w-full rounded-lg bg-gray-200"></div>
          </div>

          {/* Products Section */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="h-6 w-32 rounded bg-gray-300"></div>
              <div className="h-4 w-20 rounded bg-gray-300"></div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
                >
                  <div className="h-40 w-full bg-gray-200"></div>
                  <div className="p-3">
                    <div className="mb-2 h-4 w-3/4 rounded bg-gray-300"></div>
                    <div className="mb-3 h-4 w-1/2 rounded bg-gray-300"></div>
                    <div className="h-4 w-1/4 rounded bg-gray-300"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 py-8 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="mb-4 h-6 w-32 rounded bg-gray-600"></div>
                <div className="space-y-2">
                  {[...Array(4)].map((_, j) => (
                    <div
                      key={j}
                      className="h-3 w-3/4 rounded bg-gray-600"
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 border-t border-gray-700 pt-6">
            <div className="mx-auto h-4 w-1/2 rounded bg-gray-600 md:w-1/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteSkeleton;
