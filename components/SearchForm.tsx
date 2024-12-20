import Form from 'next/form';

const SearchForm = () => {
  const query = 'Test';
  const reset = () => {};
  return (
    <Form action='/' scroll={false} className='search-form'>
      <input
        name='query'
        defaultValue={query}
        placeholder='Search Startups'
        className='search-input'
      />
      <div className='flex gap-2'>
        {query && (
          <button type='reset' className='search-btn' onClick={reset}>
            Search
          </button>
        )}
      </div>
    </Form>
  );
};

export default SearchForm;
