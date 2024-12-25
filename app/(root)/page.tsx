import { auth } from '@/auth';
import SearchForm from '@/components/SearchForm';
import StartupCard, { StartupTypeCard } from '@/components/StartupCard';
import { pitchArray } from '@/data/pitchs';
import { createPitchApi } from '@/lib/actions';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { startupQuery } from '@/sanity/lib/queries';
// import {deletePitch} from ''
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };
  const session = await auth();

  const { data: startups } = await sanityFetch({ query: startupQuery, params });
  // check if the currentPitch is in the startups array, if exist pass it , if not add to db
  pitchArray.forEach(async (pitch) => {
    const exists = startups.some(
      (startup: StartupTypeCard) => startup.title === pitch.title
    );
    if (!exists) {
      await createPitchApi(pitch);
    }
  });

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
            startups.map((startup: StartupTypeCard) => (
              <StartupCard key={startup._id} startup={startup} />
            ))
          ) : (
            <p>No startups found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
