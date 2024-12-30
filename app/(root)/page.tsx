import { auth } from '@/auth';
import SearchForm from '@/components/SearchForm';
import { StartupTypeCard } from '@/components/StartupCard';
import StartupsList from '@/components/StartupsList';
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
        <StartupsList startups={startups} />
      </section>
      <SanityLive />
    </>
  );
}
