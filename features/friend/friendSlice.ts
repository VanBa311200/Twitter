import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userApi } from '../../api/user';
import { RootState } from '../../app/store';
import { UserInterFace } from '../../types/auth';

interface friendSlice {
  list: UserInterFace[] | null;
  status: 'loading' | 'idle';
  error?: string | null;
}

const initialState: friendSlice = {
  list: null,
  status: 'loading',
  error: null,
};

export const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    test() {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchListFriend.pending, (state) => {});
    builder.addCase(fetchListFriend.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.status = 'idle';
    });
    builder.addCase(fetchListFriend.rejected, (state, { error }) => {
      state.status = 'idle';
      state.error = error.message;
    });
  },
});

export const { test } = friendSlice.actions;
export const selectFriends = (state: RootState) => state.friend;

export default friendSlice.reducer;

export const fetchListFriend = createAsyncThunk(
  'friend/fetchListFriend',
  async (_id: string, { rejectWithValue }) => {
    try {
      const res = await userApi.getAllUser();

      return res.data.filter((item: any) => item._id !== _id);
    } catch (err) {
      return rejectWithValue({
        message: err,
      });
    }
  }
);
