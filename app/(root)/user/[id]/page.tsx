import { auth } from '@/auth';
import UserStartups from '@/components/UserStartups';
import { client } from '@/sanity/lib/client';
import { authorQuery_by_id } from '@/sanity/lib/queries';
import Image from 'next/image';
import { notFound } from 'next/navigation';
export const experimental_ppr = true;
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const info = client.fetch(authorQuery_by_id, { id });
  const user = await info;
  if (!user) return notFound();

  return (
    <div>
      <section className='profile_container'>
        <div className='profile_card'>
          <div className='profile_title'>
            <h3 className='text-13-black uppercase text-center line-clamp-1 '>
              {user.name}
            </h3>
          </div>
          <Image
            src={user.image}
            alt={user.name}
            width={220}
            height={220}
            className='profile_image'
          />
          <p className='text-30-extrabold mt-7 text-center '>
            @{user?.username}
          </p>
          <p className='mt-1 text-center text-14-normal '>{user?.bio}</p>
        </div>
        <div className='flex-1 flex flex-col gap5 lg:-mt-5'>
          <p className='text-30-bold '>
            {session?.id === id ? 'Your' : `All`} Startups
          </p>
          <ul className='card_grid-sm'>
            <UserStartups id={id} />
          </ul>
        </div>
      </section>
    </div>
  );
};

export default page;
