// Redux Toolkit
import {
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";

// Slices
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";

// API
import { BookApi } from "./api/bookApi";
import { UserApi } from "./api/userApi";

// Redux Presist

import {
  PERSIST,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Other

const rootPersistConig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  persistedStore: persistReducer(
    rootPersistConig,
    cartReducer
  ),
  userReducer,
  cartReducer,
  [BookApi.reducerPath]: BookApi.reducer,
  [UserApi.reducerPath]: UserApi.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    }).concat(BookApi.middleware, UserApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
