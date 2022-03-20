import React from 'react';
import { AiOutlineTwitter } from 'react-icons/ai';
import IconSpinnerLoading from './IconSpinnerLoading';
import Layout from './Layout';

const LoadingPage = () => {
  return (
    <Layout>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <AiOutlineTwitter className="text-primary text-7xl" />
          <IconSpinnerLoading />
        </div>
      </div>
    </Layout>
  );
};

export default LoadingPage;
