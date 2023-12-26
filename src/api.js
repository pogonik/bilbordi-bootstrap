import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

import { supabaseUrl, supabaseKey, supabase } from './utils/api'

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: supabaseUrl,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      // const token = getState().auth.token
      // if (token) {
      //   headers.set('authorization', `Bearer ${token}`)
      // }
      // return headers
    },
  }),
  endpoints: (builder) => ({
    
    sveLokacije: builder({
      query: strana => ({ url: `bilbordi/strana/${strana}` }),
    }),
    lokacijeSifra: builder.query({
      query: sifra => `bilbordi/sifra/${sifra}`,
    }),
    lokacijeGrad: builder.query({
      query: (grad) => `bilbordi/grad/${grad}`,
    }),
    novaLokacija: build({
      query(body) {
        return {
          url: 'bilbordi',
          method: "POST",
          body
        };
      }
    }),
  }),
})

export const { useLoginMutation, useProtectedMutation } = api
