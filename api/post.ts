import axios from 'axios';
import { URL_NEXTJS } from '../constants';
import { UserInterFace } from '../types/auth';
import { PostDataInterface } from '../types/posts';

export const postApi = {
  async getAllPost() {
    const res = await axios
      .get(`${URL_NEXTJS}/api/post`)
      .catch((error) => console.error(error));
    return res?.data.data;
  },
  async createPost(dataForm: PostDataInterface<UserInterFace>) {
    const res = await axios
      .post(`${URL_NEXTJS}/api/post`, dataForm)
      .catch((error) => {
        console.error(error);
      });
    return res?.data.data;
  },
};
