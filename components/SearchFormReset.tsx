'use client';

import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Link from 'next/link';

const SearchFormReset = () => {
  const reset = () => {
    const form = document.querySelector('.search-form') as HTMLFormElement;
    if (form) form.reset();
  };
  return (
    <Button
      variant='ghost'
      type='reset'
      onClick={reset}
      title='reset'
      className='search-btn text-white'
    >
      <Link href='/' className='search-btn text-white'>
        <X className='size-5' />
      </Link>
    </Button>
  );
};

export default SearchFormReset;
