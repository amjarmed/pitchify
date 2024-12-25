'use client';
import Image from 'next/image';
import { useState } from 'react';

const ImageBackUp = ({ image, title }: { image?: string; title?: string }) => {
  const [error, setError] = useState(false);

  return (
    <Image
      src={error ? '/image-not-found.svg' : image || '/image-not-found.svg'}
      onError={() => setError(true)}
      width={400}
      height={200}
      alt={title || ''}
      className='startup-card_img'
    />
  );
};

export default ImageBackUp;
