import axios from "axios";
import { Category } from "../Types/CategoryType";

const API_URL = "http://localhost:88/Category";

export const getAllCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getCategoryById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createCategory = async (category: Category) => {
  const response = await axios.post(API_URL, category);
  return response.data;
};

export const updateCategory = async (id: string, category: Category) => {
  await axios.put(`${API_URL}/${id}`, category);
};

export const deleteCategory = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const getProductsByCategoryId = async (categoryId: string) => {
  const response = await axios.get(`${API_URL}/${categoryId}/products`);
  return response.data;
};
