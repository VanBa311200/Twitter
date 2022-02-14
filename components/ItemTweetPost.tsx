import Image from 'next/image';
import React, { useState } from 'react';
import { AiOutlineRetweet } from 'react-icons/ai';
import { BsHeartFill, BsHeart } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import { FiMoreHorizontal } from 'react-icons/fi';
import { RiShareForward2Line } from 'react-icons/ri';
import { classNames } from '../utils';
import { ImageProfile } from './ImageProfile';
import { PostDataInterface } from '../types/posts';

interface Props {
  post: PostDataInterface;
}

export const ItemTweetPost = ({ post }: Props) => {
  const [isLike, setIsLike] = useState(false);

  return (
    <div className="w-full pt-3 px-4 border-b border-divide cursor-pointer hover:bg-white/5 transition duration-300 ease-out">
      <div className="flex">
        {/* image */}
        <div className="flex cursor-pointer shrink-0">
          <ImageProfile photoURL={post?.userRef?.photoURL || null} />
        </div>
        <div className="flex flex-col flex-1 pb-3 min-w-[0%]">
          {/* Author info */}
          <div className="flex justify-between pb-1">
            <div className="flex group">
              <div className="flex shrink w-full">
                {/* name author */}
                <span className="text-[15px] text-textMain font-medium cursor-pointer group-hover:underline shrink-0">
                  {post?.userRef?.name}
                </span>
                {/* tagName author */}
                <span className="text-[15px] text-textSub ml-1 cursor-pointer shrink truncate">
                  {post?.userRef?.tag}
                </span>
              </div>
              {/* dot */}
              <span className="text-textSub px-1 shrink-0">·</span>
              {/* time */}
              <span className="text-[15px] text-textSub cursor-pointer hover:underline shrink-0">
                1 giờ
              </span>
            </div>
            <div className="flex items-center ml-5 ">
              <div className="flex relative group cursor-pointer">
                <div className="inline-flex absolute top-0 left-0 right-0 bottom-0 -m-2 hoverRounded-Blue"></div>
                <FiMoreHorizontal className="text-textSub text-xl group-hover:text-primary transition duration-200 ease-linear" />
              </div>
            </div>
          </div>
          {/* content text */}
          <div className="flex font-normal text-[15px] text-textMain">
            <span className=" min-w-0 break-words">{post?.text}</span>
          </div>
          {/* content images */}
          {!!post?.image ? (
            <div className="mt-3 flex">
              <div className="flex rounded-xl overflow-hidden w-full gap-0.5">
                {post?.image.map((img, i) => (
                  <div className="relative pb-[54.5852%] w-full" key={i}>
                    <Image src={img} layout="fill" objectFit="cover" priority />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            ''
          )}

          {/* indicator */}
          <div className="flex mt-3 max-w-[425px] justify-between">
            <div className="flex items-center group cursor-pointer">
              <div className="relative">
                <div className="absolute top-0 left-0 right-0 bottom-0 -m-2 rounded-full group-hover:bg-primary/20 transition duration-300 ease-out"></div>
                <FaRegComment className="text-textSub group-hover:text-primary  transition duration-300 ease-out" />
              </div>
              <div className="px-3 text-textSub text-[13px] group-hover:text-primary  transition duration-300 ease-out">
                34
              </div>
            </div>
            <div className="flex items-center group cursor-pointer">
              <div className="relative">
                <div className="absolute top-0 left-0 right-0 bottom-0 -m-2 rounded-full group-hover:bg-success/20 transition duration-300 ease-out"></div>
                <AiOutlineRetweet className="text-textSub group-hover:text-success  transition duration-300 ease-out" />
              </div>
              <div className="px-3 text-textSub text-[13px] group-hover:text-success  transition duration-300 ease-out">
                34
              </div>
            </div>
            <div
              className="flex items-center group cursor-pointer"
              onClick={() => setIsLike((prev) => !prev)}
            >
              <div className="relative">
                <div className="absolute top-0 left-0 right-0 bottom-0 -m-2 rounded-full group-hover:bg-pinkRed/20 transition duration-300 ease-out"></div>
                <BsHeart
                  className={classNames(
                    'text-textSub group-hover:text-pinkRed  transition duration-300 ease-out',
                    !isLike ? 'block' : 'hidden'
                  )}
                />
                <BsHeartFill
                  className={classNames(
                    ' text-pinkRed  transition duration-300 ease-out  animate__animated animate__heartBeat',
                    isLike ? 'block' : 'hidden'
                  )}
                />
              </div>
              <div
                className={classNames(
                  'px-3 text-textSub text-[13px] group-hover:text-pinkRed  transition duration-300 ease-out',
                  isLike ? 'text-pinkRed' : ''
                )}
              >
                34
              </div>
            </div>
            <div className="flex items-center group cursor-pointer">
              <div className="relative">
                <div className="absolute top-0 left-0 right-0 bottom-0 -m-2 rounded-full group-hover:bg-primary/20 transition duration-300 ease-out"></div>
                <RiShareForward2Line className="text-textSub group-hover:text-primary  transition duration-300 ease-out" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
