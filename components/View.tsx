import Ping from '@/components/Ping';
import { formatViews } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { startup_Views_Query } from '@/sanity/lib/queries';

const View = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(startup_Views_Query, { id });

  //TODO: UPDATE THE NUMBER OF VIEWS WHEN ANY ONE SEE THE POST
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
