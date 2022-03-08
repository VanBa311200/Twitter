import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CgSpinner } from 'react-icons/cg';
import { useSession } from 'next-auth/react';

import Breadcrumb from '../components/Breadcrumb';
import Divide from '../components/Divide';
import Layout from '../components/Layout';
import PostTweetInput from '../components/PostTweetInput';
import SideBar from '../components/SideBar';
import { GroupTweetPost } from '../components/GroupTweetPost';
import { PostDataInterface } from '../types/posts';
import { uploadMutilImage, validateImage } from '../utils';
import { postApi } from '../api/post';
import { UserInterFace } from '../types/auth';
import BoxSearch from '../components/BoxSearch';
import BoxFriend from '../components/BoxFriend';

interface Props {}

const Home = (Props: Props) => {
  const [isFetchTweet, setIsFetchTweet] = useState(true);
  const [isLoadingTweet, setIsLoadingTweet] = useState(false);
  const [postsTweet, setPostTweet] =
    useState<[PostDataInterface<UserInterFace>]>();
  const { data: session } = useSession();

  const handleOnSubmit = async (text: string, files: Array<File>) => {
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
            userRef: session?._id as string,
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
  };

  useEffect(() => {
    async function fetchPost() {
      const getPosts = await postApi.getAllPost();
      setIsFetchTweet(false);
      setPostTweet(getPosts);
      console.log({ '[GET]getAllPost': getPosts });
    }

    fetchPost();
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
                {isFetchTweet ? (
                  <div className="flex justify-center">
                    <CgSpinner className="text-primary text-4xl animate-spin" />
                  </div>
                ) : (
                  <GroupTweetPost posts={postsTweet} />
                  // <div className="text-textMain text-center">Loading...</div>
                )}
              </div>
            </div>

            {/* Menu right */}
            <div className=" xl:w-[350px] lg:w-[290px] hidden lg:flex-col lg:flex relative">
              <div className="fixed flex-1 w-[inherit] h-full">
                <div className="flex flex-col h-full">
                  <BoxSearch />
                  <BoxFriend />
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
