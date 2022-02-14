import { auth } from '../firebase/firebaseClient';
import { useState, useEffect } from 'react';
import { getDocument } from '../firebase/services';
import { UserInterFace } from '../types/auth';
import { useRouter } from 'next/router';

export const useAuthFirebase = () => {
  const [user, setUser] = useState<UserInterFace | null>();
  const [authLoading, setAuthLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unSubscibed = auth.onIdTokenChanged(async (userCRED) => {
      if (userCRED) {
        console.log('__CURRENT_USER: ', userCRED);

        // redirect to page '/'
        router.replace('/');

        // fetch user from firestore
        await getDocument('users/' + userCRED?.uid)
          .then((result) => {
            // console.log(result);
            setUser(result as UserInterFace);
          })
          .catch((error) => console.log(error.code));

        // set localStorage
        localStorage.setItem(
          '__AUTH-FBASE',
          JSON.stringify(await userCRED!.getIdToken())
        );

        setAuthLoading(false);
      } else {
        setUser(null);
        console.log("Don't have any User!!!");

        // remove localStorage
        localStorage.removeItem('__AUTH-FBASE');

        // redirect to page '/login'
        router.replace('/login');

        setAuthLoading(false);
      }
    });
    return () => unSubscibed();
  }, []);

  return { user, authLoading, setAuthLoading, setUser };
};
