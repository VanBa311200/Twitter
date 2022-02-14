import React, { ReactElement, useContext, useState } from 'react';
import { AiOutlineTwitter } from 'react-icons/ai';
import {
  RiHome7Fill,
  RiHome7Line,
  RiFileList2Fill,
  RiFileList2Line,
} from 'react-icons/ri';
import { HiOutlineHashtag, HiHashtag } from 'react-icons/hi';
import { BsBell, BsBellFill, BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { IoMailOutline, IoMail, IoRocketSharp } from 'react-icons/io5';
import { FaUserAlt, FaRegUser } from 'react-icons/fa';
import { CgMoreO, CgMoreAlt } from 'react-icons/cg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { classNames } from '../utils';
import { AuthContext } from '../context/AuthProvider';
import { ModalUserLogout } from './ModalUserLogout';

interface Props {}

function SideBar({}: Props): ReactElement {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [showModalUser, setShowModalUSer] = useState(false);

  const navs = [
    {
      icon: RiHome7Line,
      active: RiHome7Fill,
      text: 'Trang chủ',
      href: '/home',
    },
    {
      icon: HiOutlineHashtag,
      active: HiHashtag,
      text: 'Khám phá',
      href: '/explore',
    },
    {
      icon: BsBell,
      active: BsBellFill,
      text: 'Thông báo',
      href: '/notifications',
    },
    {
      icon: IoMailOutline,
      active: IoMail,
      text: 'Tin nhắn',
      href: '/messages',
    },
    {
      icon: BsBookmark,
      active: BsBookmarkFill,
      text: 'Dấu trang',
      href: '/bookmarks',
    },
    {
      icon: RiFileList2Line,
      active: RiFileList2Fill,
      text: 'Danh sách',
      href: '/lists',
    },
    {
      icon: FaRegUser,
      active: FaUserAlt,
      text: 'Hồ sơ',
      href: '/nampro123p12',
    },
  ];

  return (
    <header className="flex z-10">
      <div className=" xl:w-[275px] sm:w-[88px]  lg:w-[88px] md:block hidden relative">
        <div className="fixed top-0 bottom-0 w-[inherit]">
          <div className="flex flex-col justify-between h-full px-3  grow-0">
            <div className="flex flex-col xl:items-start lg:w-full w-[64px] items-center ">
              {/* Logo */}
              <div className="inline-block mt-0.5">
                <div className="hoverRounded-Blue p-2">
                  <AiOutlineTwitter className="iconLogo" />
                </div>
              </div>

              {/* List navbar */}
              <div className="flex flex-col">
                <ul className="flex xl:items-start items-center flex-col">
                  {navs.map((n, i) => (
                    <Link href={n.href} passHref key={i}>
                      <a>
                        <li className="py-1">
                          <div className="flex p-3 hoverRounded-Smoke items-center">
                            <div className="flex items-center">
                              {router.asPath === n.href ? (
                                <n.active className="iconSideBar" />
                              ) : (
                                <n.icon className="iconSideBar" />
                              )}
                            </div>
                            <div
                              className={classNames(
                                'hidden  text-textMain lg:px-4 cursor-pointer lg:text-xl xl:block',
                                router.asPath === n.href ? 'font-bold' : ''
                              )}
                            >
                              {n.text}
                            </div>
                          </div>
                        </li>
                      </a>
                    </Link>
                  ))}
                  <li className="py-1">
                    <div className="flex p-3 hoverRounded-Smoke items-center">
                      <div className="flex items-center">
                        <CgMoreO className="iconSideBar" />
                      </div>
                      <div className=" hidden lg:text-textMain lg:px-4 cursor-pointer lg:text-xl xl:block">
                        Thêm
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="w-[52px] my-4 xl:w-[90%]">
                <button className="buttonApp">
                  <span className="xl:block hidden "> Đăng Tweet</span>
                  <IoRocketSharp className="xl:hidden block text-2xl" />
                </button>
              </div>
            </div>

            {/* User Box */}
            <div className="my-3 relative">
              <ModalUserLogout
                show={showModalUser}
                onClose={async (value) => setShowModalUSer(value)}
              />

              <div
                className="flex items-start xl:items-center p-3 hoverRounded-Smoke cursor-pointer w-full"
                onClick={() => setShowModalUSer(true)}
              >
                <div className="relative w-[40px] h-[40px] shrink-0">
                  <Image
                    src={user?.photoURL ? user.photoURL : '/images/profile.png'}
                    alt={'profile-images'}
                    layout="fill"
                    className="rounded-full"
                  />
                </div>
                <div className="hidden xl:flex flex-1  min-w-0">
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
                <div className="hidden xl:flex items-center shrink-0 ">
                  <CgMoreAlt className="text-2xl text-textMain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default SideBar;
