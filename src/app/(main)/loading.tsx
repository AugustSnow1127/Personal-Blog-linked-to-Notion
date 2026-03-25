export default function Loading() {
    return (
        <div className="animate-pulse">
            {/* View Toggle Skeleton */}
            <div className="flex gap-2 mb-6">
                <div className="h-9 w-20 bg-gray-200 rounded-md"></div>
                <div className="h-9 w-20 bg-gray-200 rounded-md"></div>
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-lg overflow-hidden shadow-sm h-full flex flex-col"
                    >
                        {/* Cover Image Skeleton */}
                        <div className="w-full aspect-video bg-gray-200"></div>

                        {/* Content Skeleton */}
                        <div className="p-4 flex flex-col flex-1">
                            {/* Title */}
                            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-5 bg-gray-200 rounded w-1/2 mb-4"></div>

                            {/* Summary */}
                            <div className="space-y-2 mb-8">
                                <div className="h-3 bg-gray-200 rounded w-full"></div>
                                <div className="h-3 bg-gray-200 rounded w-full"></div>
                                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-3 mt-auto border-t border-gray-100">
                                <div className="h-3 bg-gray-200 rounded w-20"></div>
                                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
