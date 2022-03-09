import { useSession } from 'next-auth/react';
import React, { useEffect, useState, memo } from 'react';
import { userApi } from '../api/user';
import { UserInterFace } from '../types/auth';
import IconSpinnerLoading from './IconSpinnerLoading';
import { ImageProfile } from './ImageProfile';

const BoxFriend = () => {
  const { data: session } = useSession();
  const [isLoadingFetchFriends, setIsLoadingFetchFriends] =
    useState<boolean>(true);
  const [listFriend, setListFriend] = useState<UserInterFace[]>([]);

  useEffect(() => {
    const fetchListFriend = async () => {
      await userApi
        .getAllUser()
        .then((value: UserInterFace[]) => {
          const newArr = value.filter((item) => item._id !== session?._id);
          setListFriend(newArr);
          setIsLoadingFetchFriends(false);
        })
        .catch((error) => console.log(error));
    };
    fetchListFriend();
    return () => {};
  }, [session?._id]);

  return (
    <div className="flex w-full bg-[#15181c] rounded-tl-xl rounded-tr-xl h-full mt-4 flex-1 flex-col">
      <div className="text-textMain text-xl font-bold  px-4 py-3">
        Bạn bè của bạn
      </div>
      <div
        className={`flex flex-col hover:overflow-y-auto scroll-smooth scroll scrollbar-hide ${
          isLoadingFetchFriends && 'items-center'
        }`}
      >
        {isLoadingFetchFriends ? (
          <IconSpinnerLoading />
        ) : (
          listFriend?.length > 0 &&
          listFriend.map((item) => (
            <ItemFriend
              key={item._id}
              fullName={item.fullName}
              tag={item.tag}
              isOnLine={item.isOnLine ? item.isOnLine : false}
              photoURL={item.photoURL ? item.photoURL : undefined}
            />
          ))
        )}
        {/* <ItemFriend
          fullName="Nguyễn Công Danh nef nef nef nef nef nef"
          tag={'@nguyencongdanh'}
        />
        <ItemFriend fullName="Hà Minh Đức" tag={'@haminhduc'} />
        <ItemFriend fullName="Phước Đại" tag={'@phuocdai'} />
        <ItemFriend fullName="Khương Ngu" tag={'@khuongngu'} />
        <ItemFriend fullName="Thiên Ân" tag={'@thienan'} /> */}
      </div>
    </div>
  );
};

export default memo(BoxFriend);

interface Props {
  photoURL?: string;
  fullName?: string;
  isOnLine?: boolean;
  tag?: string;
}

const ItemFriend = ({ photoURL, fullName, isOnLine, tag }: Props) => {
  return (
    <div className="flex px-4 py-3 cursor-pointer hover:bg-greySmoke transition-all duration-300 ease-out">
      <ImageProfile
        width={45}
        height={45}
        classContainer="flex pr-3"
        photoURL={photoURL ? photoURL : null}
        isOnLine={isOnLine ? isOnLine : false}
      />
      <div className=" flex truncate min-w-0 flex-1 flex-col">
        <span className="text-textMain font-bold truncate block">
          {fullName}
        </span>
        <span className="truncate block text-textSub text-sm">{tag}</span>
      </div>
    </div>
  );
};
