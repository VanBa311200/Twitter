import React, { useContext, useEffect, useState } from 'react';
import { doc } from 'firebase/firestore';

import Breadcrumb from '../components/Breadcrumb';
import Divide from '../components/Divide';
import Layout from '../components/Layout';
import PostTweetInput from '../components/PostTweetInput';
import SideBar from '../components/SideBar';
import { getAllDocument, uploadMultilImages } from '../firebase/services';
import { addDocument } from '../firebase/services';
import { AuthContext } from '../context/AuthProvider';
import { db } from '../firebase/firebaseClient';
import { GroupTweetPost } from '../components/GroupTweetPost';
import { toast } from 'react-toastify';
import { PostDataInterface } from '../types/posts';

interface Props {
  trendingResults: any;
  followResults: any;
}

const Home = ({ trendingResults, followResults }: Props) => {
  const [isLoadingTweet, setIsLoadingTweet] = useState(false);
  const { signOut, user, authLoading } = useContext(AuthContext);
  const [postsTweet, setPostTweet] = useState<[PostDataInterface]>();

  const handleOnSubmit = async (input: String, files: Array<File>) => {
    if (isLoadingTweet === true) return;
    setIsLoadingTweet(true);
    console.log({ input, files });

    try {
      let listImg;
      if (!!files.length) {
        listImg = await uploadMultilImages(files, 'posts/');
      }

      await addDocument('posts', {
        userRef: user,
        image: listImg || null,
        text: input,
      });
      toast('Tweet của bạn đã được gửi thành công !!!', {
        position: toast.POSITION.BOTTOM_CENTER,
      });

      setIsLoadingTweet(false);
    } catch (error) {
      toast('Đã xảy ra lỗi. Hãy thử lại !!!', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setIsLoadingTweet(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getAllDocument('posts');
      setPostTweet(posts as [PostDataInterface]);
      console.log('__POSTS-ALL', posts);
    };

    fetchPosts();
    return () => {};
  }, []);

  return (
    <Layout>
      {authLoading ? (
        <div className="flex">Loading ....</div>
      ) : (
        <div className="container">
          <div className="flex w-full">
            <SideBar />
            <div className="flex justify-between grow min-w-0">
              <div className="max-w-[600px] border-r border-l border-divide flex min-h-screen flex-col grow min-w-0">
                <div className="flex flex-col grow relative">
                  <Breadcrumb />
                  <PostTweetInput
                    onSubmit={handleOnSubmit}
                    isLoading={isLoadingTweet}
                  />
                  <Divide />
                  {!postsTweet?.length ? (
                    <div className="text-textMain text-center">Loading...</div>
                  ) : (
                    <GroupTweetPost posts={postsTweet} />
                    // <div className="text-textMain text-center">Loading...</div>
                  )}
                </div>
              </div>

              <div className=" xl:w-[350px] lg:w-[290px] hidden lg:flex"></div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

// export const getServerSideProps = async (context: any) => {
//   const trendingResults = await fetch('https://jsonkeeper.com/b/NKEV').then(
//     (res) => res.json()
//   );
//   const followResults = await fetch('https://jsonkeeper.com/b/WWMJ').then(
//     (res) => res.json()
//   );

//   return {
//     props: {
//       trendingResults,
//       followResults,
//     },
//   };
// };

export default Home;
