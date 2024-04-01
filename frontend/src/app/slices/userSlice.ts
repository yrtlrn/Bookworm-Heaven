import { createSlice } from "@reduxjs/toolkit";
import { UserApi } from "../api/userApi";
import { RootState } from "../store";

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
      }
    );
  },
});

export const isUserAuthorized = (state: RootState) =>
  state.userReducer.authorized;

export default userSlice.reducer;
