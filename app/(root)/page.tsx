import SearchForm from '@/components/SearchForm';
import StartupCard from '@/components/StartupCard';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const startups = [
    {
      _createdAt: new Date(),
      views: 55,
      _id: 1,
      author: {
        _id: 1,
        name: 'Siddharth',
        avatar: 'https://placeholder.co/48x48',
      },
      description: 'this is a description',
      image:
        'https://images.unsplash.com/photo-1481697943534-ea55b5ce970b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YWxpZW5zfGVufDB8fDB8fHww',
      category: 'Robots',
      title: 'We Robots',
    },
  ];

  return (
    <>
      {/* Hero Section  */}
      <section className='pink_container'>
        <h1 className='heading'>
          Pitch Your Startup,
          <br /> Connect with Entrepreneurs
        </h1>
        <p className='sub-heading !max-w-3xl'>
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>
        <SearchForm query={query} />
      </section>
      {/* Pitch Section  */}
      <section className='section_container'>
        <p className='text-30-semibold'>
          {query ? `Search Results for: ${query}` : 'Recommended startups'}
        </p>
        <ul className='mt-7 card_grid'>
          {startups?.length > 0 ? (
            startups.map((startup, index) => (
              <StartupCard key={startup._id} startup={startup} />
            ))
          ) : (
            <p>No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}
