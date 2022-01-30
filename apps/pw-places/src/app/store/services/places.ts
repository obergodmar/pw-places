import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API } from '../../constants';

export const placesApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${API}/` }),
  reducerPath: 'places',
  endpoints: (builder) => ({
    getPlace: builder.query({
      query: (id) => ({ url: `places/${id}` }),
    }),
  }),
});

export const { useGetPlaceQuery } = placesApi;
