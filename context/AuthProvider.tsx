import { useRouter } from 'next/router';
import React, { createContext, useEffect, useState } from 'react';
import { setCookies, removeCookies, getCookie } from 'cookies-next';

import { authApi } from '../api/auth';
import LoadingPage from '../components/LoadingPage';
import { UserInterFace } from '../types/auth';
import axiosClient from '../api/axiosClient';
import { AUTH_ACCESSTOKEN } from '../constants';

interface Props {
  children: JSX.Element;
}

interface AuthContextInterface {
  auth: UserInterFace | undefined;
  isLoading: 'isLoading' | 'authenticated' | 'unauthorization';
  SignOut: () => void;
}

export const AuthContext = createContext<AuthContextInterface>({
  auth: undefined,
  isLoading: 'isLoading',
  SignOut: () => {},
});

const AuthProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState<
    'isLoading' | 'authenticated' | 'unauthorization'
  >('isLoading');
  const [auth, setAuth] = useState<UserInterFace>();
  // get params
  const router = useRouter();

  useEffect(() => {
    // handle get auth
    const fetchAuth = async () => {
      try {
        const res = await authApi.getAuth();
        if (!res?.data) {
          setIsLoading('unauthorization');
        } else {
          setAuth(res.data);
          setIsLoading('authenticated');
        }
      } catch (error) {
        setIsLoading('unauthorization');
        console.log(error);
      }
    };

    // check params when server redirect to /login?auth_accessToken
    const { auth_accessToken } = router.query;
    if (router.isReady) {
      if (auth_accessToken) {
        // console.log({ 'AccessToken:::': auth_accessToken });
        axiosClient.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${auth_accessToken}`;
        setCookies(AUTH_ACCESSTOKEN, auth_accessToken, {
          maxAge: 2 * 24 * 60 * 60,
        });
        fetchAuth();
      } else {
        // get cookie
        const token = getCookie(AUTH_ACCESSTOKEN);
        if (token) {
          // console.log({ 'AccessToken:::': token });
          axiosClient.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${token}`;
          fetchAuth();
        } else setIsLoading('unauthorization');
      }
    }
    return () => {};
  }, [router.isReady]);

  const SignOut = async () => {
    removeCookies(AUTH_ACCESSTOKEN);
    setIsLoading('unauthorization');
    setAuth(undefined);
    router.push('/login');
  };

  const value: AuthContextInterface = {
    auth,
    isLoading,
    SignOut,
  };

  return (
    <>
      <AuthContext.Provider value={value}>
        {isLoading === 'isLoading' ? <LoadingPage /> : children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
