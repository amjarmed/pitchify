import SearchFormReset from '@/components/SearchFormReset';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import Form from 'next/form';

const SearchForm = async ({ query }: { query?: string }) => {
  const q = await query;

  return (
    <Form action='/' scroll={false} className='search-form'>
      <input
        name='query'
        defaultValue={q}
        placeholder='Search Startups'
        className='search-input'
      />
      <div className='flex gap-2'>
        {q && <SearchFormReset />}
        <Button
          variant='ghost'
          type='submit'
          className='search-btn text-white'
          title='submit'
        >
          <Search className='size-5' />
        </Button>
      </div>
    </Form>
  );
};

export default SearchForm;
