import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { UserInterFace } from '../../types/auth';
import { PostDataInterface } from '../../types/posts';

const initialState: PostDataInterface<UserInterFace>[] = [];

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    test() {},
  },
  extraReducers: {},
});

export const { test } = postSlice.actions;
export const selectPosts = (state: RootState) => state.post;

export default postSlice.reducer;
