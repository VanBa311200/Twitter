import React, { useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoCloseCircle } from 'react-icons/io5';
import { CSSTransition } from 'react-transition-group';

type Props = {
  isShowResult?: boolean;
};

const BoxSearch = (Props: Props) => {
  const nodeRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [isShowResult, setIsShowResult] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(true);

  return (
    <>
      <div className="focus-within:border-primary group border focus-within:border-solid border-greySmoke bg-greySmoke flex w-full h-max rounded-3xl mt-1 relative transition-all duration-300">
        {/* icon search */}
        <div className="flex items-center  pl-4">
          <FiSearch className="text-textSub text-xl group-focus-within:text-primary transition-all duration-300" />
        </div>
        {/* search input */}
        <div className="flex-1">
          <input
            ref={inputRef}
            type="text"
            className="p-3 outline-none w-full flex-1 rounded-tr-3xl rounded-br-3xl bg-transparent caret-white text-white"
            placeholder="Tìm kiếm Twitter"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsShowResult((prev) => !prev)}
            onBlur={() => setIsShowResult((prev) => !prev)}
          />
        </div>
        {/* icon clear input */}
        {inputValue.trim() && (
          <div
            className="flex items-center pr-3 cursor-pointer"
            onClick={() => {
              inputRef?.current?.focus();
              setInputValue('');
            }}
          >
            <IoCloseCircle className="text-3xl text-primary hover:text-primaryDark transition duration-200 ease-in" />
          </div>
        )}

        <CSSTransition
          in={isShowResult}
          timeout={300}
          classNames="Modal__UserBox"
          nodeRef={nodeRef}
          unmountOnExit
        >
          <div ref={nodeRef}>
            <div className="absolute rounded-lg shadow-shadownApp z-50 flex flex-col overflow-hidden top-full w-[107%] left-1/2 -translate-x-1/2 translate-y-1 bg-black">
              {loadingSearch && (
                <div className="absolute top-0 left-full w-12 h-1 bg-primary animate-loadingHorizontal"></div>
              )}
              <div className="text-center py-4 text-textSub h-[100px]">
                Tìm kiếm mọi người, hoặc từ khóa...
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    </>
  );
};

export default BoxSearch;
