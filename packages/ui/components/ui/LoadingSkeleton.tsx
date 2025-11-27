export const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-48 bg-gray-200 rounded-t-lg"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export const StoryGridSkeleton = () => {
  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <LoadingSkeleton key={i} />
      ))}
    </div>
  );
};
