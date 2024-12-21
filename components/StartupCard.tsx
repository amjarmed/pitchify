import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type StartupTypeCard = {
  _createdAt: Date;
  views: number;
  _id: number;
  author: {
    _id: number;
    name: string;
    avatar: string;
  };
  description: string;
  image: string;
  category: string;
  title: string;
};

interface StartupTypeCardProps {
  startup: StartupTypeCard;
}

const StartupCard = ({ startup }: StartupTypeCardProps) => {
  const {
    image,
    title,
    _createdAt,
    views,
    author: { _id: authorId, name: authorName, avatar: authorAvatar },
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
          <Link href={`/user/${authorId}`}>
            <p className=' text-16-medium  line-clamp-1 '>{authorName}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className='text-26-semibold'>{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${authorId}`}>
          <Image
            src={authorAvatar}
            width={48}
            height={48}
            alt={authorName}
            className='rounded-full'
          />
        </Link>
      </div>
      <Link href={`/startup/${_id}`}>
        <p className='startup-card_desc'>{description}</p>
        <Image
          src={image}
          width={400}
          height={200}
          alt={authorName}
          className='startup-card_img'
        />
      </Link>
      <div className='flex-between  gap-3 mt-5'>
        <Link href={`/?query=${category.toLowerCase()}`}>
          <p className='text-16-medium'>{category}</p>
        </Link>
        <Button className='startup-card_btn' asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export default StartupCard;
