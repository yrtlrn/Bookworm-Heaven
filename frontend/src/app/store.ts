import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import { BookApi } from "./api/bookApi";

const store = configureStore({
  reducer: {
    userReducer,
    [BookApi.reducerPath]: BookApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(BookApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
