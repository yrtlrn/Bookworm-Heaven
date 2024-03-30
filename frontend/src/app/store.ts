import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import { BookApi } from "./api/bookApi";
import { UserApi } from "./api/userApi";

const store = configureStore({
  reducer: {
    userReducer,
    [BookApi.reducerPath]: BookApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      BookApi.middleware,
      UserApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
