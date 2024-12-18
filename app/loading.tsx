export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-2xl font-bold">
                <div className="h-5 w-5 border-b-2 border-gray-900 rounded-full animate-spin"></div>
            </div>
        </div>
    )
  }
