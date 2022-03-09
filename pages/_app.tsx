import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'emoji-mart/css/emoji-mart.css';
import 'animate.css';
import { store } from '../app/store';
import { Provider } from 'react-redux';

import { SessionProvider, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import LoadingPage from '../components/LoadingPage';
import { NextComponentType } from 'next';

type Props = {
  children: JSX.Element;
};

const Auth = ({ children }: Props) => {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!isUser) router.replace('/login');
  }, [isUser, status, router]);

  if (isUser) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <LoadingPage />;
};

type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean };
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  return (
    <>
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <Provider store={store}>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </Provider>
        <ToastContainer
          pauseOnFocusLoss={false}
          theme="colored"
          hideProgressBar={true}
          autoClose={3500}
          pauseOnHover={false}
          closeOnClick={false}
        />
      </SessionProvider>
    </>
  );
}

export default MyApp;
