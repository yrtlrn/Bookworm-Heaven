import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({baseUrl: "http://localhost:3000/api/v1/users"})

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery,
    endpoints: (builder) => ({
        getTrendingBooks: builder.query({
            query: () => ({
                url: "/"
            })
                
            
        })
    }) 
})