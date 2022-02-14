import Cookies from 'js-cookie';
import nookies from 'nookies';
import { admin } from '../firebase/firebaseAdmin';
import { auth } from '../firebase/firebaseClient';

// @Attention work on ServerSide
export const withPublic = (functionWrapp: any) => {
  return async function WithPublic(context: any) {
    const nookie = nookies.get(context);
    // const AUTH_TOKEN = JSON.parse(nookie?.AUTH_TOKEN);

    // console.log('Cookies: ', AUTH_TOKEN);

    // Check is token exist Redirect page home
    if (nookie?.AUTH_TOKEN) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
    return await functionWrapp(context);
  };
};

// @Attention work on ServerSide
export const withPrivate = (functionWrapp: any) => {
  return async function WithPrivate(context: any) {
    const nookie = nookies.get(context);
    // const AUTH_TOKEN = JSON.parse(nookie.AUTH_TOKEN);
    // console.log('Cookies: ', AUTH_TOKEN);

    // check is token not exist Redirect /login
    if (!nookie?.AUTH_TOKEN) {
      return {
        redirect: {
          permanent: false,
          destination: '/login',
        },
      };
    }

    return functionWrapp(context);
  };
};
