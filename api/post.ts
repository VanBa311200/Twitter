import axiosClient from './axiosClient';
import { UserInterFace } from '../types/auth';
import { PostDataInterface } from '../types/posts';

export const postApi = {
  async getAllPost(): Promise<any> {
    const res = await axiosClient
      .get(`/post`)
      .catch((error) => console.error(error));
    return res;
  },
  async createPost(dataForm: PostDataInterface<UserInterFace>): Promise<any> {
    const res = await axiosClient.post(`/post`, dataForm).catch((error) => {
      console.error(error);
    });
    return res;
  },
};
