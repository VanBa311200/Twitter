import Image from 'next/image';
import React from 'react';

interface Props {
  photoURL?: string | undefined | null;
  width?: string | number;
  height?: string | number;
  isOnLine?: boolean;
  classContainer?: string;
  classImage?: string;
}

export const ImageProfile = ({
  photoURL,
  width,
  height,
  isOnLine,
  classContainer,
  classImage,
}: Props) => {
  return (
    <div className={classContainer ? classContainer : 'pt-1 mr-3'}>
      <div className="relative h-fit">
        <Image
          src={photoURL ? photoURL : '/images/profile.png'}
          width={width || 48}
          height={height || 48}
          alt="images-profile"
          className={classImage ? classImage : 'rounded-full'}
        />
        {isOnLine && (
          <span className="flex h-3 w-3 absolute bottom-2 right-1">
            <span className="inline-flex rounded-full h-3 w-3 bg-success border-2 border-greySmoke"></span>
          </span>
        )}
      </div>
    </div>
  );
};
