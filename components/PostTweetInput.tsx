import Image from 'next/image';
import React, {
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { classNames, readAllFiles } from '../utils';
import { IoImageOutline, IoLocationOutline, IoClose } from 'react-icons/io5';
import { RiFileGifLine } from 'react-icons/ri';
import { BsEmojiSmile } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { Picker } from 'emoji-mart';
import { AuthContext } from '../context/AuthProvider';

interface Props {
  textButton?: string;
  placeholder?: string;
  onSubmit: Function;
  isLoading: boolean;
}

export default function PostTweetInput({
  textButton = 'Đăng Tweet',
  placeholder = 'Chuyện gì đang xảy ra?',
  onSubmit,
  isLoading,
}: Props): ReactElement {
  const { user } = useContext(AuthContext);
  const refInput = useRef(null);
  const refTweet = useRef(null);
  const [input, setInput] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [selectFile, setSelectFile] = useState<
    Array<FileReader['result'] | null>
  >([]);

  // auto resize textArea when typing
  const handleAutoResizeTexarea = (e: { target: HTMLInputElement }) => {
    const target = e.target;
    target.style.height = '62px';
    target.style.height = `${target.scrollHeight}px`;
    setInput(target.value);
  };

  const handleRemoveImage = (e: any) => {
    setSelectFile((prev) => prev.filter((item) => item !== e));
  };

  // handle add Emoji to input
  const addEmoji = (e: any) => {
    const sym = e.unified.split('-');
    const codesArray: Array<any> = [];
    sym.forEach((el: any) => codesArray.push('0x' + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);

    // autoResize when add emoji
    const target: HTMLInputElement | null = refInput.current;
    target!.style.height = '62px';
    target!.style.height = `${target!.scrollHeight}px`;
  };

  const handleOnsubmit = async () => {
    await onSubmit(input, selectFile);

    // clean input & file when submit done
    setInput('');
    setSelectFile([]);
  };

  const handleOnChangeInputFile = async (e: { target: HTMLInputElement }) => {
    const arrImg = Array.from(e.target.files as FileList);
    const listImg = await readAllFiles(arrImg);

    const newArr = [...selectFile, ...listImg];

    if (newArr.length > 4) {
      toast('Vui lòng chọn không quá 4 ảnh.', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      return false;
    }
    setSelectFile(newArr);
    // calHeightTweet(refTweet);
  };

  // useEffect(() => {
  //   calHeightTweet(refTweet);
  // }, []);

  return (
    <div
      className={classNames(
        'sm:flex w-full bg-black hidden transition-all duration-300 ease-linear z-10'
      )}
    >
      <div className="flex py-2 grow">
        <div className="flex px-4 grow">
          {/* image profile */}
          <div className={classNames('pt-1 mr-3', isLoading ? 'disable' : '')}>
            <Image
              src={user?.photoURL ? user.photoURL : '/images/profile.png'}
              width={48}
              height={48}
              alt="images-profile"
              className="rounded-full"
            />
          </div>

          <div
            className="flex divide-y divide-divide flex-col flex-1 transition-all duration-200 ease-linear"
            ref={refTweet}
          >
            {/* text input tweet */}
            <div className={classNames('py-3', isLoading ? 'disable' : '')}>
              <textarea
                ref={refInput}
                className="text-textMain placeholder:text-textSub bg-inherit w-full focus:outline-none text-xl px-[2px] h-[62px] resize-none "
                placeholder={placeholder}
                value={input}
                onChange={(e: any) => handleAutoResizeTexarea(e)}
              />

              {/* images tweet */}
              {selectFile.length > 0 ? (
                <div className="flex mt-1 gap-4">
                  {selectFile.map((e: any, i: React.Key | null | undefined) => (
                    <div className="w-full flex" key={i}>
                      <div className="relative w-full pb-[81%]">
                        <Image
                          src={e}
                          layout="fill"
                          alt="photo"
                          objectFit="cover"
                          className="rounded-xl"
                        />
                        <div className="flex absolute top-1 left-1 bg-black/60 rounded-full p-[7px] items-center justify-center cursor-pointer">
                          <IoClose
                            className="text-white text-lg"
                            style={{ color: 'white' }}
                            onClick={() => handleRemoveImage(e)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                ''
              )}
            </div>

            {/* icon tweet */}
            {!isLoading ? (
              <div className="flex justify-between">
                <div className="flex mt-3 relative">
                  <div className="h-[34px] w-[34px] hoverRounded-Blue flex justify-center items-center ">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <input
                        type="file"
                        multiple
                        className="opacity-0 absolute top-0 left-0 bottom-0 w-[inherit]"
                        onChange={handleOnChangeInputFile}
                        onClick={(e) => {
                          (e.target as HTMLInputElement).value = '';
                        }}
                        disabled={selectFile.length === 4}
                      />
                      <IoImageOutline
                        className={classNames(
                          'text-[20px] text-primary',
                          selectFile.length === 4 ? 'disable' : ''
                        )}
                      />
                    </div>
                  </div>
                  <div className="h-[34px] w-[34px] hoverRounded-Blue flex justify-center items-center ">
                    <div className="relative flex items-center justify-center">
                      <RiFileGifLine className="text-xl text-primary" />
                    </div>
                  </div>
                  <div className="h-[34px] w-[34px] hoverRounded-Blue flex justify-center items-center">
                    <div className="relative flex items-center justify-center">
                      <BsEmojiSmile
                        className="text-xl text-primary"
                        onClick={() => setShowEmoji(true)}
                      />
                      {showEmoji && (
                        <>
                          <div
                            className="fixed top-0 right-0 bottom-0 left-0"
                            onClick={() => setShowEmoji(false)}
                          ></div>
                          <Picker
                            onSelect={addEmoji}
                            set="twitter"
                            style={{
                              position: 'absolute',
                              top: '0',
                              left: '0',
                              transform: 'translate(-24%, 8%)',
                              boxShadow:
                                'rgb(255 255 255 / 20%) 0px 0px 15px, rgb(255 255 255 / 15%) 0px 0px 3px 1px',
                              maxWidth: '320px',
                            }}
                            theme="dark"
                          />
                        </>
                      )}
                    </div>
                  </div>
                  <div className="h-[34px] w-[34px] hoverRounded-Blue flex justify-center items-center disable">
                    <div className="relative flex items-center justify-center">
                      <IoLocationOutline className="text-xl text-primary " />
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <button
                    className={classNames(
                      'btn-primary--medium mt-3 min-h-[36px]',
                      !input ? 'disabled:disable' : ''
                    )}
                    disabled={!input.trim() && !selectFile.length && !isLoading}
                    onClick={handleOnsubmit}
                  >
                    <span>{textButton}</span>
                  </button>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
}