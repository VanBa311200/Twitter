import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'animate.css';
import '../styles/globals.css';
import 'emoji-mart/css/emoji-mart.css';
import 'react-toastify/dist/ReactToastify.css';

import { store } from '../app/store';
import AuthProvider from '../context/AuthProvider';
import { NextComponentType } from 'next';
import Auth from '../components/Auth';

type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean }; // add auth type
};

function MyApp({ Component, pageProps }: CustomAppProps) {
  return (
    <>
      <Provider store={store}>
        <AuthProvider>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </AuthProvider>
      </Provider>
      <ToastContainer
        pauseOnFocusLoss={false}
        theme="colored"
        hideProgressBar={true}
        autoClose={3500}
        pauseOnHover={false}
        closeOnClick={false}
      />
    </>
  );
}

export default MyApp;
