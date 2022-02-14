import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'emoji-mart/css/emoji-mart.css';
import 'animate.css';

import { AuthProvider } from '../context/AuthProvider';

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <>
      <AuthProvider>
        <>
          <Component {...pageProps} />
          <ToastContainer
            pauseOnFocusLoss={false}
            theme="colored"
            hideProgressBar={true}
            autoClose={3500}
            pauseOnHover={false}
            closeOnClick={false}
          />
        </>
      </AuthProvider>
    </>
  );
}

export default MyApp;
