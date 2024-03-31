import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

// Types
import { SignupPageProps } from "../../page/SignupPage";
import { LoginPageProps } from "../../page/LoginPage";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api/v1/users",
});

export const UserApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  endpoints: (builder) => ({
    postSignupUser: builder.mutation<null, SignupPageProps>(
      {
        query: (data: SignupPageProps) => ({
          url: "/signup",
          method: "POST",
          credentials: "include",
          body: data,
        }),
      }
    ),
    postLoginUser: builder.mutation<null, LoginPageProps>({
      query: (data: SignupPageProps) => ({
        url: "/login",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    getAuthCheck: builder.query<null, null>({
      query: () => ({
        url: "/authCheck",
        method: "GET",
        credentials: "include",
      }),
    }),
    postLogoutUser: builder.mutation<null, null>({
      query: () => ({
        url: "/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  usePostSignupUserMutation,
  usePostLoginUserMutation,
  useGetAuthCheckQuery,
  usePostLogoutUserMutation,
} = UserApi;
