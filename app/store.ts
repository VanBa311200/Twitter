import { configureStore } from '@reduxjs/toolkit';
import friendReducer from '../features/friend/friendSlice';
import postReducer from '../features/post/postSlice';

export const store = configureStore({
  reducer: {
    friend: friendReducer,
    post: postReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
