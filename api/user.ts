import axios from 'axios';
import { URL_NEXTJS } from '../constants';

export const userApi = {
  async getAllUser() {
    try {
      const res = await axios.get(`${URL_NEXTJS}/api/user`);

      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  },
};
