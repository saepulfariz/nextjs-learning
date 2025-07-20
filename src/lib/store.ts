import { configureStore } from "@reduxjs/toolkit";
import counterReducerEasy from "@/lib/features/counterSliceEasy";
import counterReducerHard from "@/lib/features/counterSlice";
import postsReducer from "@/lib/features/postsSlice";
import userReducer from "@/lib/features/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      counterEasy: counterReducerEasy,
      counterHard: counterReducerHard,
      posts: postsReducer,
      user: userReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
