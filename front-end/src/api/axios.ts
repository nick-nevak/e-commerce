import { Product } from "@ltypes/product";
import axios from "axios";
import { Category } from "../types/category";

export const httpClient = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 60000,
});

export const fetchProducts = async () =>
  (await httpClient.get("/catalog")).data;

export const fetchProductDetails = async (id: string) =>
  (await httpClient.get(`/products/${id}`)).data;

export const fetchFilters = async () =>
  (await httpClient.get("/catalog/filters")).data;

export const fetchCategories = async () =>
  (await httpClient.get<Category>("/categories")).data.children!;

export const fetchProductsByCategory = async (id: string) =>
  (await httpClient.get<Product[]>(`/catalog/category/${id}`)).data;


