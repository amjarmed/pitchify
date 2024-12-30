'use client';
import StartupCard, { StartupTypeCard } from '@/components/StartupCard';
import StartupsPagination from '@/components/StartupsPagination';
import { useState } from 'react';

const StartupsList = ({ startups }: { startups: [] }) => {
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // Calculate total pages
  const totalPages = Math.ceil(startups.length / ITEMS_PER_PAGE);

  // Get current posts
  const indexOfLastPost = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - ITEMS_PER_PAGE;
  const currentPosts = startups.slice(indexOfFirstPost, indexOfLastPost);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <ul className='mt-7 card_grid'>
        {currentPosts?.length > 0 ? (
          currentPosts.map((startup: StartupTypeCard) => (
            <StartupCard key={startup._id} startup={startup} />
          ))
        ) : (
          <p>No startups found</p>
        )}
      </ul>
      {/* pagination */}
      <StartupsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default StartupsList;
