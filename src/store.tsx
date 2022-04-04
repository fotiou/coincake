import { configureStore } from "@reduxjs/toolkit";
import coinReducer from './coinSlice';
import favsReducer from './favsSlice';


export const store = configureStore({
  reducer: {
      coins: coinReducer,
      favs: favsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
