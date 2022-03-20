import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postApi } from '../../api/post';
import { RootState } from '../../app/store';
import { UserInterFace } from '../../types/auth';
import { PostDataInterface } from '../../types/posts';

interface postSliceInterface {
  list: PostDataInterface<UserInterFace>[] | null;
  loading: 'loading' | 'idle';
  error?: null | string;
}

const initialState: postSliceInterface = {
  list: [],
  error: null,
  loading: 'loading',
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    test() {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = 'loading';
    });
    builder.addCase(fetchPosts.fulfilled, (state, { payload }) => {
      state.loading = 'idle';
      state.list = payload.data;
    });
    builder.addCase(fetchPosts.rejected, (state, { error }) => {
      state.loading = 'idle';
      state.error = error?.message;
    });
  },
});

export const { test } = postSlice.actions;
export const selectPosts = (state: RootState) => state.post;

export default postSlice.reducer;

export const fetchPosts = createAsyncThunk(
  'post/fetchPost',
  async (value, { rejectWithValue }) => {
    try {
      const res = await postApi.getAllPost();
      return res;
    } catch (error) {
      return rejectWithValue({ message: error });
    }
  }
);
