export interface PostDataInterface<UserInterFace> {
  _id?: string | null;
  images?: [] | null;
  text?: string | null;
  userRef?: UserInterFace | string;
  like?: null | [];
  comment?: null | [];
  createdAt?: string;
}
