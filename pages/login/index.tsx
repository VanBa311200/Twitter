import { GetServerSidePropsContext } from 'next';
import { getSession, signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Router from 'next/router';
import React, { useEffect } from 'react';
import { AiOutlineTwitter } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';
import { FaGooglePlus } from 'react-icons/fa';

import Layout from '../../components/Layout';
import LoadingPage from '../../components/LoadingPage';

interface Props {
  session?: any;
}

const Login = (props: Props) => {
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      Router.replace('/');
    }
  }, [status]);
  console.log({
    status,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    VERCEL: process.env.VERCEL_URL,
  });

  return (
    <Layout>
      {status === 'loading' || status === 'authenticated' ? (
        <LoadingPage />
      ) : (
        <div className="w-full">
          <div className="flex flex-col">
            {/* content */}
            <div className="flex lg:h-[calc(100vh-79px)] lg:flex-row flex-col flex-1">
              {/* content left */}
              <div className="lg:order-1 order-2  relative lg:flex-1 h-[45vh] w-full lg:h-auto xl:max-w-[52vw]">
                <Image
                  src={'/images/login-image.png'}
                  layout="fill"
                  objectFit="cover"
                  alt="photo"
                  priority
                />
                <div className="absolute flex top-1/2 left-1/2 transform -translate-x-[50%] -translate-y-[50%]">
                  <div className="flex">
                    <AiOutlineTwitter className="text-white h-fit max-w-[100%] min-w-[270px] lg:min-w-[390px] relative" />
                  </div>
                </div>
              </div>

              {/* content right */}
              <div className="flex  xm:h-[70vh] sm:h-[70vh] md:flex-grow-0 flex-grow md:justify-center md:h-[92vh] items-center order:1 lg:order-2 p-4">
                <div className="flex flex-col flex-1 p-5 xm:p-2 xm:min-w-[280px] min-w-[327px] md:max-w-[760px] max-w-[460px] lg:min-w-[100%]">
                  <div className="inline-flex mb-2 self-start">
                    <AiOutlineTwitter className="text-[45px] text-textMain" />
                  </div>
                  <div className="my-12">
                    <span className="text-textMain text-[64px] font-bold xm:text-[40px]">
                      Happening now
                    </span>
                  </div>
                  <div className="mb-[32px] leading-9 text-[31px] font-bold xm:text-[23px]">
                    <span className="text-textMain">Join Twitter today.</span>
                  </div>
                  <div className="flex flex-col">
                    <button
                      className="btn-primary--medium w-[300px] min-w-[280px] max-w-[380px] h-10 bg-textMain text-black mb-[10px] relative hover:text-textMain"
                      onClick={() =>
                        signIn('facebook', {
                          callbackUrl: '/',
                        })
                      }
                    >
                      <BsFacebook className="ml-2.5 text-2xl absolute top-[50%] left-0 transform -translate-y-[50%]" />
                      Sign in with Facebook
                    </button>
                    <button
                      className="btn-primary--medium w-[300px] min-w-[280px] max-w-[380px] h-10 bg-textMain text-black mb-[10px] relative hover:text-textMain"
                      onClick={() =>
                        signIn('google', {
                          callbackUrl: '/',
                        })
                      }
                    >
                      <FaGooglePlus className="ml-2.5 text-2xl absolute top-[50%] left-0 transform -translate-y-[50%]" />
                      Sign in with Google
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* footer bottom */}
            <div className="flex flex-1">
              <nav className="flex items-center justify-center flex-wrap py-3 px-4 text-textSub text-[13px] flex-1">
                <a href="#" className="my-1 pr-4">
                  About
                </a>
                <a href="#" className="my-1 pr-4">
                  Help Center
                </a>
                <a href="#" className="my-1 pr-4">
                  Terms of Service
                </a>
                <a href="#" className="my-1 pr-4">
                  Privacy Policy
                </a>
                <a href="#" className="my-1 pr-4">
                  Cookie Policy
                </a>
                <a href="#" className="my-1 pr-4">
                  Accessibility
                </a>
                <a href="#" className="my-1 pr-4">
                  Ads info
                </a>
                <a href="#" className="my-1 pr-4">
                  Blog
                </a>
                <a href="#" className="my-1 pr-4">
                  Status
                </a>
                <a href="#" className="my-1 pr-4">
                  Careers
                </a>
                <a href="#" className="my-1 pr-4">
                  Brand Resources
                </a>
                <a href="#" className="my-1 pr-4">
                  Advertising
                </a>
                <a href="#" className="my-1 pr-4">
                  Marketing
                </a>
                <a href="#" className="my-1 pr-4">
                  Twitter for Business
                </a>
                <a href="#" className="my-1 pr-4">
                  Developers
                </a>
                <a href="#" className="my-1 pr-4">
                  Directory
                </a>
                <a href="#" className="my-1 pr-4">
                  Settings
                </a>
                <a
                  href="#"
                  className="mx-1 pr-4"
                >{`© ${new Date().getFullYear()} Twitter, Inc`}</a>
              </nav>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Login;
export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  return {
    props: {
      session: await getSession({ req }),
    },
  };
}
