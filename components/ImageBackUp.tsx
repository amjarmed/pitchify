'use client';
import Image from 'next/image';
import { useState } from 'react';

interface ImageBackUpProps {
  image?: string;
  title?: string;
  width?: number;
  height?: number;
}

const ImageBackUp = ({ image, title }: ImageBackUpProps) => {
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
