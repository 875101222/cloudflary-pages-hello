export default function Loading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="aspect-square bg-gray-200 animate-pulse rounded-lg"
        />
      ))}
    </div>
  );
} 