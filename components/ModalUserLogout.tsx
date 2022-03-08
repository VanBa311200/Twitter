import axios from 'axios';
import Image from 'next/image';
import React, { useContext, useRef } from 'react';
import { IoCheckmarkOutline } from 'react-icons/io5';
import { CSSTransition } from 'react-transition-group';
import Divide from './Divide';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

interface Props {
  show: boolean;
  onClose: (value: boolean) => {};
}

export const ModalUserLogout = ({ show, onClose }: Props) => {
  const nodeRef = useRef(null);
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = async () => {
    const data = await signOut({ redirect: false, callbackUrl: '/login' });
    router.replace(data.url);
  };

  return (
    <CSSTransition
      in={show}
      nodeRef={nodeRef}
      classNames="Modal__UserBox"
      timeout={300}
      unmountOnExit
    >
      <div>
        <div
          className="fixed top-0 left-0 bottom-0 right-0 z-10"
          onClick={() => onClose(false)}
        ></div>
        <div
          className="flex absolute top-0 left-0 -translate-y-[105%] z-10 "
          ref={nodeRef}
        >
          <div className="py-3 flex flex-col min-w-[300px] max-w-[360px] shadow-shadownApp rounded-xl bg-black static">
            <div className="flex items-start xl:items-center p-3 w-full">
              <div className="relative w-[40px] h-[40px] shrink-0">
                <Image
                  src={
                    session?.user?.image
                      ? session?.user?.image
                      : '/images/profile.png'
                  }
                  alt={'profile-images'}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-1  min-w-0">
                <div className="flex flex-col mx-3 items-start min-w-0 max-w-full">
                  <div className="text-textMain flex-1 truncate text-[15px] max-w-full font-bold">
                    {session?.user?.name}
                  </div>
                  <div>
                    <span className="text-textSub text-[15px]">
                      {session?.tag as string}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center shrink-0 ">
                <IoCheckmarkOutline className="text-2xl text-primary" />
              </div>
            </div>
            <Divide className="my-0" />
            <div
              className="flex p-4 text-[15px] text-textMain hover:bg-white/10 transition duration-300 ease-out cursor-pointer"
              onClick={() => handleLogout()}
            >
              <div>
                Đăng xuất <span>{session?.tag as string}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};
