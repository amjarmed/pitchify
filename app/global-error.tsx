'use client'; // Error boundaries must be Client Components

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    // global-error must include html and body tags
    <html>
      <body className='flex items-center justify-center min-h-screen bg-gray-100'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-red-600'>
            Something went wrong!
          </h2>
          <button
            onClick={() => reset()}
            className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
