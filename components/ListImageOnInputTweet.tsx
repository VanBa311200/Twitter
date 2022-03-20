import Image from 'next/image';
import { memo } from 'react';
import { IoClose } from 'react-icons/io5';
interface Props {
  listFile: File[];
  onClick: (e: any) => void;
}

const ListImageOnInputTweet = ({ listFile, onClick }: Props) => {
  const handleRemoveImage = (image: any) => {
    onClick(image);
  };

  return (
    <>
      {listFile.length > 0 && (
        <div className="flex mt-1 gap-4">
          {listFile.map((ele: any, i: React.Key | null | undefined) => {
            return (
              <div className="w-full flex" key={i}>
                <div className="relative w-full pb-[81%]">
                  <Image
                    src={URL.createObjectURL(ele)}
                    layout="fill"
                    alt="photo"
                    objectFit="cover"
                    className="rounded-xl"
                  />
                  <div
                    onClick={() => handleRemoveImage(ele)}
                    className="flex absolute top-1 left-1 bg-black/60 rounded-full p-[7px] items-center justify-center cursor-pointer"
                  >
                    <IoClose
                      className="text-white text-lg"
                      style={{ color: 'white' }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default memo(ListImageOnInputTweet);
