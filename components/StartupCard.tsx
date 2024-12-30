import ImageBackUp from '@/components/ImageBackUp';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn, formatDate } from '@/lib/utils';
import { Author, Startup } from '@/sanity/types';
import { Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
export type StartupTypeCard = Omit<Startup, 'author'> & { author?: Author };

const StartupCard = ({ startup }: { startup: StartupTypeCard }) => {
  const {
    image,
    title,
    _createdAt,
    views,
    author,
    description,
    category,
    _id,
  } = startup;
  return (
    <li className='startup-card group'>
      <div className=' flex-between'>
        <p className='startup-card_date'>{formatDate(_createdAt)}</p>
        <div className='flex gap-1.5'>
          <Eye className='size-6 text-primary' />
          <span className='text-16-medium'>{views}</span>
        </div>
      </div>
      <div className='flex-between mt-5 gap-5'>
        <div className='flex-1'>
          <Link href={`/user/${author?._id}`}>
            <p className=' text-16-medium  line-clamp-1 '>{author?.name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className='text-26-semibold'>{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image
            src={author?.image || ''}
            width={48}
            height={48}
            alt={author?.name || ''}
            className='rounded-full'
          />
        </Link>
      </div>
      <Link href={`/startup/${_id}`}>
        <p className='startup-card_desc'>{description}</p>
        <ImageBackUp image={image} title={title} />
      </Link>
      <div className='flex-between  gap-3 mt-5'>
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className='text-16-medium'>{category}</p>
        </Link>
        <Button className='startup-card_btn' asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export const StartupCardSkeleton = () => {
  return (
    <div>
      {[0, 1, 2, 3, 4, 5].map((item: number) => (
        <li key={cn('skeleton', item)} className='startup-card group'>
          <Skeleton className='startup-card_skeleton' />
        </li>
      ))}
    </div>
  );
};

export default StartupCard;
