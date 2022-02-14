import Image from 'next/image';
import React from 'react';

interface Props {
  photoURL?: string | undefined | null;
}

export const ImageProfile = ({ photoURL }: Props) => {
  return (
    <div className={'pt-1 mr-3'}>
      <Image
        src={photoURL ? photoURL : '/images/profile.png'}
        width={48}
        height={48}
        alt="images-profile"
        className="rounded-full"
      />
    </div>
  );
};
