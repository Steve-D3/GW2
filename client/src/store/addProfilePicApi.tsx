import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const addProfilePicApi = createApi({
  reducerPath: "addProfilePicApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://gw2-rfg0.onrender.com/api",
    baseUrl: "http://localhost:3000",
  }),

  endpoints: (builder) => ({
    addProfilePic: builder.mutation<
      void,
      { formData: FormData; userId: string }
    >({
      query: ({ formData: fd, userId }) => ({
        url: `/upload/${userId}`,
        method: "POST",
        body: fd,
      }),
    }),
  }),
});

export const { useAddProfilePicMutation } = addProfilePicApi;
