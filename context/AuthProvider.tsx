import React, {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
} from 'react';
import { auth } from '../firebase/firebaseClient';
import {
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
  UserCredential,
  getAdditionalUserInfo,
} from 'firebase/auth';
import { useAuthFirebase } from '../hooks/useAuthFirebase';
import Router from 'next/router';
import { serverTimestamp } from 'firebase/firestore';
import { addDocument, createNewUser } from '../firebase/services';
import { toast } from 'react-toastify';
import { UserInterFace } from '../types/auth';

interface AuthContextInterface {
  user: UserInterFace | undefined | null;
  authLoading: boolean;
  setAuthLoading: Dispatch<SetStateAction<boolean>>;
  signInWithFacebook: () => Promise<UserCredential | any>;
  signInWithGoogle: () => Promise<UserCredential | any>;
  signOut: () => Promise<void>;
}

interface Props {
  children: ReactElement;
}

export const AuthContext = createContext<AuthContextInterface>({
  user: null,
  authLoading: true,
  setAuthLoading: () => {},
  signInWithFacebook: async () => {},
  signInWithGoogle: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }: Props) => {
  const { user, authLoading, setAuthLoading } = useAuthFirebase();
  const providerFB = new FacebookAuthProvider();
  const providerGG = new GoogleAuthProvider();

  const signInWithFacebook = async () => {
    await signInWithPopup(auth, providerFB)
      .then(async (userCred) => {
        const user = getAdditionalUserInfo(userCred);
        console.log('__SIGNIN_USER');
        if (user?.isNewUser) {
          createNewUser(userCred).catch((error) => console.log(error));
        }
        Router.replace('/');
      })
      .catch(async (error) => {
        console.log({ error });
      });
  };
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, providerGG)
      .then(async (userCred) => {
        const user = getAdditionalUserInfo(userCred);
        console.log('__SIGNIN_USER');
        if (user?.isNewUser) {
          await createNewUser(userCred).catch((error) => {
            toast('Đã xảy ra lỗi khi đăng nhập. Hãy thử lại!', {
              position: toast.POSITION.BOTTOM_CENTER,
            });
            console.log(error);
          });
        }

        Router.replace('/');
      })
      .catch((error) => console.log({ error }));
  };

  const signOut = async () => {
    await auth.signOut();
    Router.replace('/login');
    console.log('__SINGOUT_USER');
  };

  const valueContext = {
    user,
    authLoading,
    signInWithFacebook,
    signInWithGoogle,
    signOut,
    setAuthLoading,
  };
  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
};
