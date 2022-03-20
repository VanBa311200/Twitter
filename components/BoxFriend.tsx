import { memo, useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { AuthContext } from '../context/AuthProvider';
import { fetchListFriend } from '../features/friend/friendSlice';
import { classNames } from '../utils';
import IconSpinnerLoading from './IconSpinnerLoading';
import { ImageProfile } from './ImageProfile';

interface Propss {
  onlines?: [string];
}

const BoxFriend = ({ onlines }: Propss) => {
  const { auth } = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const { list, status } = useAppSelector((state) => state.friend);

  useEffect(() => {
    dispatch(fetchListFriend(auth?._id as string))
      .unwrap()
      .then((value) => console.log({ '[GET] FetchFriends::::': value }))
      .catch((err) => console.log(err));

    return () => {};
  }, [auth]);

  return (
    <div className="flex w-full bg-[#15181c] rounded-tl-xl rounded-tr-xl h-full mt-4 flex-1 flex-col">
      <div className="text-textMain text-xl font-bold  px-4 py-3">
        Bạn bè của bạn
      </div>
      <div
        className={classNames(
          `flex flex-col hover:overflow-y-auto scroll-smooth scroll scrollbar-hide`,
          status === 'loading' ? 'items-center' : ''
        )}
      >
        {status === 'loading' ? (
          <IconSpinnerLoading />
        ) : (
          list?.length &&
          list.map((item) => (
            <ItemFriend
              key={item._id}
              fullName={item.fullName}
              tag={item.tag}
              isOnLine={onlines?.includes(item._id as string) ? true : false}
              photoURL={item.photoURL ? item.photoURL : undefined}
            />
          ))
        )}
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
