import { createSlice } from "@reduxjs/toolkit";
import {
  UserApi,
  useGetUserCartQuery,
} from "../api/userApi";
import { RootState } from "../store";
import { useAppDispatch } from "../hooks/hook";
import { setCartItems } from "./cartSlice";

const initialState: {
  authorized: boolean;
} = {
  authorized: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      UserApi.endpoints.getAuthCheck.matchFulfilled,
      (state) => {
        state.authorized = true;
      }
    );
    builder.addMatcher(
      UserApi.endpoints.postLogoutUser.matchFulfilled,
      (state) => {
        state.authorized = false;
      }
    );
    builder.addMatcher(
      UserApi.endpoints.postLoginUser.matchFulfilled,
      (state) => {
        state.authorized = true;
      }
    );
    builder.addMatcher(
      UserApi.endpoints.postSignupUser.matchFulfilled,
      (state) => {
        state.authorized = true;
        const getCart = useGetUserCartQuery(null);
        const dispatch = useAppDispatch();
        dispatch(setCartItems(getCart.data));
      }
    );
    builder.addMatcher(
      UserApi.endpoints.deleteUser.matchFulfilled,
      (state) => {
        state.authorized = false;
      }
    );
  },
});

export const isUserAuthorized = (state: RootState) =>
  state.userReducer.authorized;

export default userSlice.reducer;
