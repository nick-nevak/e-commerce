// create axios instance

import axios from "axios";

export const httpClient = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 5000,
});

// const mock = new MockAdapter(httpClient);

// mock.onGet("/products").reply(200, mockProducts);

// mock.onGet("/filters").reply(200, mockFilters);

// // use axios mock adapter to get product details by guid
// mock.onGet(/\/product\/.*/).reply(200, mockProductDetails);

export const fetchProducts = async () =>
  (await httpClient.get("/catalog")).data;

export const fetchProductDetails = async (id: string) =>
  (await httpClient.get(`/products/${id}`)).data;

export const fetchFilters = async () =>
  (await httpClient.get("/catalog/filters")).data;
