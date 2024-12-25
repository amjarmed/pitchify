import Ping from '@/components/Ping';
import { formatViews } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { startup_Views_Query } from '@/sanity/lib/queries';
import { writeClient } from '@/sanity/lib/write-client';
import { after } from 'next/server';

const View = async ({ id }: { id: string }) => {
  // Fetch the current number of views for the startup with the given id
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(startup_Views_Query, { id });
  // Increment the number of views for the startup with the given id and save it to Sanity
  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: totalViews + 1 })
        .commit()
  );
  return (
    <div className='view-container'>
      <div className='absolute -top-2 -right-2'>
        <Ping />
      </div>
      <p className='view-text'>
        <span className='font-black'>{formatViews(totalViews)}</span>
      </p>
    </div>
  );
};

export default View;
