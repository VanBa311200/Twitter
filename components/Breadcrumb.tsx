import React, { ReactElement } from 'react';

interface Props {}

export default function Breadcrumb({}: Props): ReactElement {
  return (
    <>
      <div className="min-w-full h-[53px] bg-black/60 backdrop-blur-md sticky top-0 z-20">
        <div className="px-4 h-full flex items-center">
          <span className="font-bold text-xl text-textMain cursor-pointer">
            Trang chủ
          </span>
        </div>
      </div>
    </>
  );
}
