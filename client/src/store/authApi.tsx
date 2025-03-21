import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type User = {
  name: string;
  email: string;
  role: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};

interface AuthResponse {
  user: User;
  token: string;
}

interface AuthPayload {
  name?: string;
  email: string;
  password: string;
}

const authApi = createApi({
  tagTypes: ["User"],
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://gw2-rfg0.onrender.com/api/auth",
    baseUrl: "http://localhost:3000/api/auth",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, AuthPayload>({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    login: builder.mutation<AuthResponse, Omit<AuthPayload, "name">>({
      query: ({ email, password }) => ({
        url: "/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authApi;
export default authApi;
