import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthProvider';
import LoadingPage from './LoadingPage';

interface Props {
  children: JSX.Element;
}

function Auth({ children }: Props) {
  const { isLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoading === 'unauthorization') router.push('/login');
  }, [isLoading]);

  if (isLoading === 'unauthorization') return <LoadingPage />;

  return <>{isLoading === 'isLoading' ? <LoadingPage /> : children}</>;
}

export default Auth;
