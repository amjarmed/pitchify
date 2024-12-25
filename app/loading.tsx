export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 text-black'>
      <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-white border-opacity-50'></div>
      <p className='mt-4 text-lg font-semibold'>Loading, please wait...</p>
    </div>
  );
}
