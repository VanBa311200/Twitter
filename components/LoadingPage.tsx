import React from 'react';
import { AiOutlineTwitter } from 'react-icons/ai';
import IconSpinnerLoading from './IconSpinnerLoading';

const LoadingPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <AiOutlineTwitter className="text-primary text-7xl" />
        <IconSpinnerLoading />
      </div>
    </div>
  );
};

export default LoadingPage;
