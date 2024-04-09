import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

// Types
import { SignupPageProps } from "../../page/users/SignupPage";
import { LoginPageProps } from "../../page/users/LoginPage";
import { ProfilePageProps } from "../../page/users/ProfilePage";
import { cartItems } from "../slices/cartSlice";

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
    getAuthCheck: builder.query({
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
    getProfileData: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
        credentials: "include",
      }),
    }),
    putUpdateProfile: builder.mutation<
      null,
      ProfilePageProps
    >({
      query: (data: ProfilePageProps) => ({
        url: "/profile",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
    }),
    deleteUser: builder.mutation<null, null>({
      query: () => ({
        url: "/delete",
        method: "DELETE",
        credentials: "include",
      }),
    }),
    getUserCart: builder.query({
      query: () => ({
        url: "/cart",
        method: "GET",
        credentials: "include",
      }),
    }),
    patchUpdateUserCart: builder.mutation<null, cartItems[]>({
      query: (data) => {
        return {
          url: "/cart",
          method: "PATCH",
          credentials: "include",
          body: data,
        };
      },
    }),
  }),
});

export const {
  usePostSignupUserMutation,
  usePostLoginUserMutation,
  useGetAuthCheckQuery,
  usePostLogoutUserMutation,
  useGetProfileDataQuery,
  usePutUpdateProfileMutation,
  useDeleteUserMutation,
  useGetUserCartQuery,
  usePatchUpdateUserCartMutation,
} = UserApi;
