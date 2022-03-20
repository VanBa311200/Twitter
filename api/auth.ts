import axiosClient from './axiosClient';

export const authApi = {
  async getAuth(): Promise<any> {
    try {
      const res = await axiosClient.get(`/auth/getAuth`);
      return res;
    } catch (error) {
      console.error(error);
    }
  },
  async logOut(): Promise<any> {
    try {
      const res = await axiosClient.get(`/auth/logout`);
      return res;
    } catch (error) {
      console.error(error);
    }
  },
  logInFB() {
    const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login/facebook`;
    window.open(URL, '_self');
  },
  logInGoogle() {
    const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login/google`;
    window.open(URL, '_self');
  },
};
