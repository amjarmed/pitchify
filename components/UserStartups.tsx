import StartupCard, {
  StartupCardSkeleton,
  StartupTypeCard,
} from '@/components/StartupCard';
import { client } from '@/sanity/lib/client';
import { startups_By_Author_Query } from '@/sanity/lib/queries';
import { Suspense } from 'react';

const UserStartups = async ({ id }: { id: string }) => {
  const startups = await client.fetch(startups_By_Author_Query, {
    id: id,
  });
  return (
    <>
      <Suspense fallback={<StartupCardSkeleton />}>
        {startups.length > 0 ? (
          startups.map((startup: StartupTypeCard) => (
            <li key={startup._id}>
              <StartupCard startup={startup} />
            </li>
          ))
        ) : (
          <p className='no-result'>No startups found</p>
        )}
      </Suspense>
    </>
  );
};

export default UserStartups;
