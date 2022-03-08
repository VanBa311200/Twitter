import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { UserInterFace } from '../../types/auth';

const initialState: UserInterFace[] = [];

export const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    test() {},
  },
  extraReducers: {},
});

export const { test } = friendSlice.actions;
export const selectFriends = (state: RootState) => state.friend;

export default friendSlice.reducer;
