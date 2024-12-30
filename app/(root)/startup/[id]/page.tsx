import ImageBackUp from '@/components/ImageBackUp';
import StartupCard, { StartupTypeCard } from '@/components/StartupCard';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import {
  PLAYLIST_BY_SLUG_QUERY,
  startup_By_id_Query,
} from '@/sanity/lib/queries';
import markdownit from 'markdown-it';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
const md = markdownit();
export const experimental_ppr = true;
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  // parallel vs  squencial rending
  const [startup, { select: editorPosts }] = await Promise.all([
    client.fetch(startup_By_id_Query, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: 'editor-picks',
    }),
  ]);
  if (!startup) return notFound();

  const parsedContent = md.render(startup.pitch || '');

  return (
    <>
      <section className='pink_container !min-h-[320px]'>
        <p className='tag'>{formatDate(startup?._createdAt)}</p>
        <h1 className='heading'>{startup.title}</h1>
        <p className='sub-heading !max-h-5xl'>{startup.description}</p>
      </section>
      <section className='section_container'>
        <ImageBackUp
          image={startup.image}
          title={startup.title}
          width={400}
          height={200}
        />
        <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
          <div className='flex-between gap-5'>
            <Link
              href={`/user/${startup.author?._id}`}
              className='flex gap-3 items-center mb-3'
            >
              <Image
                src={startup.author.image}
                width={64}
                height={64}
                alt='avatar'
                className='rounded-full drop-shadow-lg'
              />
              <div>
                <p className='text-20-medium '>{startup.author.name}</p>
                <p className='text-16-medium !text-black-300'>
                  @{startup.author.username}
                </p>
              </div>
            </Link>
            <p className='category-tag'> {startup.category}</p>
          </div>
          <h3 className='text-30-bold'>Startup Details</h3>
          {parsedContent ? (
            <article
              className='prose max-w-4xl font-work-sans break-all'
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className='no-result'> No details provided!</p>
          )}
        </div>
        <hr className='divider' />
        <div>
          <h3 className='text-30-bold'>Similar startups </h3>
          {/* recommended startups */}
          {editorPosts.length > 0 && (
            <div className='max-w-4xl mx-auto'>
              <ul className='mt-7 card_grid-sm'>
                {editorPosts.map((post: StartupTypeCard, index: number) => (
                  <StartupCard startup={post} key={index} />
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
      <Suspense fallback={<Skeleton className='view_skeleton' />}>
        <View id={id} />
      </Suspense>
    </>
  );
};

export default Page;
