import Image from 'next/image';
import React, { useContext, useRef } from 'react';
import { CgMoreAlt } from 'react-icons/cg';
import { IoCheckmarkOutline } from 'react-icons/io5';
import { AuthContext } from '../context/AuthProvider';
import { CSSTransition } from 'react-transition-group';
import Divide from './Divide';

interface Props {
  show: boolean;
  onClose: (value: boolean) => {};
}

export const ModalUserLogout = ({ show, onClose }: Props) => {
  const { user, signOut } = useContext(AuthContext);
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      in={show}
      nodeRef={nodeRef}
      classNames="Modal__UserBox"
      // addEndListener={() => {}}
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
                  src={user?.photoURL ? user.photoURL : '/images/profile.png'}
                  alt={'profile-images'}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-1  min-w-0">
                <div className="flex flex-col mx-3 items-start min-w-0 max-w-full">
                  <div className="text-textMain flex-1 truncate text-[15px] max-w-full font-bold">
                    {user?.name}
                  </div>
                  <div>
                    <span className="text-textSub text-[15px]">
                      {user?.tag}
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
              onClick={async () => await signOut()}
            >
              <div>
                Đăng xuất <span>{user?.tag}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};
