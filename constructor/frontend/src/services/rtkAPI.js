import { fetchBaseQuery} from "@reduxjs/toolkit/query";
import { createApi } from '@reduxjs/toolkit/query/react'
const API_URL = 'https://jsonplaceholder.typicode.com/'

export const postAPI = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: API_URL,
            // prepareHeaders: headers => {
            //     const token = localStorage.getItem() || ""
            //     if (token) {
            //         headers.set('Authorization', token)
            //     }
            //     return headers
            // }
        },

    ),
    endpoints: (builder) => ({
        fetchAllPosts: builder.query({
            query: (searchTerm) => `/posts?_sort=id&_order=desc&q=${searchTerm}`,
            providesTags: (result, error, searchTerm) => [
                {
                    id: searchTerm
                },
            ],
        }),
        sortedPosts: builder.query({
            query: (searchTerm) => `/posts?_sort=id&_order=desc&q=${searchTerm}`,
            providesTags: (result, error, searchTerm) => [
                {
                    id: searchTerm
                },
            ],
        }),
        createPost: builder.mutation({
            query: (post) => ({
                body: post,
                url: "/posts",
                method: "POST"
            }),
        }),
    })
})

export const { useFetchAllPostsQuery } = postAPI

//     setAuth(bool) {
//         this.isAuth = bool
//     }
//
//     setUser(user) {
//         this.user = user
//     }
//
//     async login(email, password) {
//         try {
//             const response = await  AuthService.login(email, password)
//             localStorage.setItem('token', response.data.accessToken)
//             this.setAuth(true)
//             this.setUser(response.data.user)
//         } catch (e) {
//             console.log(e.response?.data?.message)
//         }
//     }
//
//     async reg(email, password) {
//         try {
//             const response = await  AuthService.registration(email, password)
//             localStorage.setItem('token', response.data.accessToken)
//             this.setAuth(true)
//             this.setUser(response.data.user)
//         } catch (e) {
//             console.log(e.response?.data?.message)
//         }
//     }
//
//     async logout() {
//         try {
//             const response = await  AuthService.logout()
//             localStorage.removeItem('token')
//             this.setAuth(false)
//             this.setUser({response})
//         } catch (e) {
//             console.log(e.response?.data?.message)
//         }
//     }
