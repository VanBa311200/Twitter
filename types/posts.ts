import { UserInterFace } from './auth';

export interface PostDataInterface {
  id: string;
  image: [string];
  text: string;
  userRef: UserInterFace;
}
