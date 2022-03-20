import { DefaultEventsMap } from '@socket.io/component-emitter';
import { useRouter } from 'next/router';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { CgSpinner } from 'react-icons/cg';
import { toast } from 'react-toastify';
import io, { Socket } from 'socket.io-client';

import { postApi } from '../api/post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import BoxFriend from '../components/BoxFriend';
import BoxSearch from '../components/BoxSearch';
import Breadcrumb from '../components/Breadcrumb';
import Divide from '../components/Divide';
import { GroupTweetPost } from '../components/GroupTweetPost';
import Layout from '../components/Layout';
import PostTweetInput from '../components/PostTweetInput';
import SideBar from '../components/SideBar';
import { AuthContext } from '../context/AuthProvider';
import { fetchPosts, selectPosts } from '../features/post/postSlice';
import { UserInterFace } from '../types/auth';
import { PostDataInterface } from '../types/posts';
import { uploadMutilImage, validateImage } from '../utils';

interface Props {}

const Home = (Props: Props) => {
  const { auth } = useContext(AuthContext);
  const ioRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);
  const [isLoadingTweet, setIsLoadingTweet] = useState(false);
  const [useOnlines, setUserOnline] = useState<[string]>();
  const { list, loading } = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleOnSubmit = useCallback(
    async (text: string, files: Array<File>) => {
      // console.log({ files });

      if (isLoadingTweet === true) return;
      setIsLoadingTweet(true);

      // check validate images
      const isValidateImage = validateImage(files);
      if (!isValidateImage) {
        toast('🛠 Hình không đúng định dạng (gif, jpeg, jpg, png).', {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        setIsLoadingTweet(false);
        return;
      } else {
        await uploadMutilImage(files)
          .then(async (value) => {
            // console.log(value);
            const dataForm: PostDataInterface<UserInterFace> = {
              userRef: auth?._id as string,
              text: text,
              images: value as [],
            };

            const res = await postApi.createPost(dataForm).catch((error) => {
              setIsLoadingTweet(false);
              console.error(error);
            });
            if (res) {
              setIsLoadingTweet(false);
              toast('🎉Đăng Tweet thành công.', {
                position: toast.POSITION.BOTTOM_CENTER,
              });
            }
          })
          .catch(() => {
            toast('💣Upload hình không thành công. Hãy thử lại', {
              position: toast.POSITION.BOTTOM_CENTER,
            });
            setIsLoadingTweet(false);
            return;
          });
      }
    },
    [auth]
  );

  useEffect(() => {
    ioRef.current = io(process.env.NEXT_PUBLIC_SERVER_URL as string);
    ioRef.current.emit('online', auth?._id);

    ioRef.current.on('getUsersOnline', (users: []) => {
      const arry: any = users.map((ele) => Object.values(ele)[0] as string);
      console.log({ '[IO] _IdOnline::::': arry });
      setUserOnline(arry);
    });

    console.log({ '[CONNECT] socketIO::::': ioRef.current });

    return () => {
      ioRef?.current?.disconnect();
    };
  }, [auth]);

  useEffect(() => {
    router.replace('/', undefined, { shallow: true });
    dispatch(fetchPosts())
      .unwrap()
      // .then((value) => console.log({ '[GET] FetchPosts::::': value.data }))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Layout>
      <div className="container">
        <div className="flex w-full">
          <SideBar />
          <div className="flex justify-between grow min-w-0">
            <div className="lg:max-w-[600px] w-full border-r border-l border-divide flex min-h-screen flex-col grow min-w-0">
              <div className="flex flex-col grow relative">
                <Breadcrumb />
                <PostTweetInput
                  onSubmit={handleOnSubmit}
                  isLoading={isLoadingTweet}
                />
                <Divide />
                {loading === 'loading' ? (
                  <div className="flex justify-center">
                    <CgSpinner className="text-primary text-4xl animate-spin" />
                  </div>
                ) : (
                  <GroupTweetPost posts={list} />
                )}
              </div>
            </div>

            {/* Menu right */}
            <div className=" xl:w-[350px] lg:w-[290px] hidden lg:flex-col lg:flex relative">
              <div className="fixed flex-1 w-[inherit] h-full">
                <div className="flex flex-col h-full">
                  <BoxSearch />
                  <BoxFriend onlines={useOnlines} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

Home.auth = true;

export default Home;
