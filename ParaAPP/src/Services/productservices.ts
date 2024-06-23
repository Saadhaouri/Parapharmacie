import axios from "axios";
import Product from "../Types/ProductType";

const API_URL = "https://localhost:7016/api/Product";

export const getAllProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createProduct = async (product: Product) => {
  const response = await axios.post(API_URL, product);
  return response.data;
};

export const updateProduct = async (id: string, product: Product) => {
  await axios.put(`${API_URL}/${id}`, product);
};

export const deleteProduct = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};

// Additional methods for sales, purchases, and stock management

export const sellProduct = async (productId: string, quantity: number) => {
  await axios.post(`${API_URL}/${productId}/sell`, { quantity });
};

export const purchaseProduct = async (productId: string, quantity: number) => {
  await axios.post(`${API_URL}/${productId}/purchase`, { quantity });
};

export const checkStock = async (productId: string) => {
  const response = await axios.get(`${API_URL}/${productId}/stock`);
  return response.data;
};

export const checkAvailability = async (
  productId: string,
  desiredQuantity: number
) => {
  const response = await axios.get(`${API_URL}/${productId}/availability`, {
    params: { desiredQuantity },
  });
  return response.data;
};

export const updateStock = async (
  productId: string,
  newStockQuantity: number
) => {
  await axios.post(`${API_URL}/${productId}/update-stock`, {
    newStockQuantity,
  });
};

export const autoReorder = async (thresholdQuantity: number) => {
  await axios.post(`${API_URL}/auto-reorder`, { thresholdQuantity });
};

export const getProductsExpiringWithinAMonth = async () => {
  const response = await axios.get(`${API_URL}/expiring-soon`);
  return response.data;
};
