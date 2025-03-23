import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Wishlist = {
  _id: string;
  user_id: string;
  products: string[];
  total_price: number;
  created_at: string;
  updated_at: string;
  __v: number;
};

const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://gw2-rfg0.onrender.com/api",
    baseUrl: "http://localhost:3000/api",
  }),
  tagTypes: ["Wishlist"],
  endpoints: (builder) => ({
    getWishlist: builder.query<Wishlist, { user_id: string }>({
      query: ({ user_id }) => `/wishlist/${user_id}`,

      providesTags: ["Wishlist"],
    }),
    addToWishlist: builder.mutation({
      query: ({
        user_id,
        productId,
      }: {
        user_id: string;
        productId: string;
      }) => ({
        url: `/wishlist/add`,
        method: "POST",
        body: { user_id, productId },
      }),
      invalidatesTags: ["Wishlist"],
    }),
    // removeFromWishlist: builder.mutation({
    //   query: (productId) => ({}),
    // }),
  }),
});

export const { useGetWishlistQuery } = wishlistApi;

export default wishlistApi;
