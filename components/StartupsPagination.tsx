'use client';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
export interface StartupsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
const StartupsPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: StartupsPaginationProps) => {
  return (
    <div className='flex gap-2 mt-5 justify-center'>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={'#'}
              onClick={() => onPageChange(currentPage - 1)}
              className={
                currentPage === 1
                  ? 'pointer-events-none opacity-50'
                  : 'cursor-pointer'
              }
            />
          </PaginationItem>
          <PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationLink
                key={index}
                href={`#page-${index + 1}`} // use href to navigate to the page index + 1}
                onClick={() => onPageChange(index + 1)}
                isActive={index + 1 === currentPage}
              >
                {index + 1}
              </PaginationLink>
            ))}
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href='#'
              onClick={() => onPageChange(currentPage + 1)}
              className={
                currentPage === totalPages
                  ? 'pointer-events-none opacity-50'
                  : 'cursor-pointer'
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default StartupsPagination;
