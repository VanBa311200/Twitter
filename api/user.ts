import axiosClient from './axiosClient';

export const userApi = {
  async getAllUser(): Promise<any> {
    try {
      const res = await axiosClient.get(`/user`);
      return res;
    } catch (error) {
      console.error(error);
    }
  },
  async getUser(_id: string): Promise<any> {
    try {
      const res = await axiosClient.post(`/user/getUser`, _id);
      return res;
    } catch (error) {
      console.error(error);
    }
  },
};
