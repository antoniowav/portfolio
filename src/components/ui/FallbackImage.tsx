'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface FallbackImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
}

export const FallbackImage = ({
  src,
  alt,
  fallbackSrc = '/images/projects/github/placeholder.svg',
  ...props
}: FallbackImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

export default FallbackImage;
