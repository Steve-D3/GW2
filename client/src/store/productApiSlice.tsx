//fetch the product from the server http://localhost:3001/products

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: { url: string }[];
  stock_quantity: number;
};
const productApi = createApi({
  tagTypes: ["Product"],
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://gw2-rfg0.onrender.com/api",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
      providesTags: ["Product"],
    }),
  }),
});

//export  the amount of the product

export default productApi;
export const { useGetProductsQuery } = productApi;

export const { getProducts } = productApi.endpoints;
