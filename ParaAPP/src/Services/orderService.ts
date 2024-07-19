import axios from "axios";
import { Order, CreateOrder } from "../Types/OrderTypes";

const API_URL = "http://localhost:88/Order";

export const getAllOrders = async (): Promise<Order[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getOrderById = async (orderId: string): Promise<Order> => {
  const response = await axios.get(`${API_URL}/${orderId}`);
  return response.data;
};

export const createOrder = async (order: CreateOrder): Promise<Order> => {
  const response = await axios.post(API_URL, order);
  return response.data;
};

export const updateOrder = async (
  orderId: string,
  order: Order
): Promise<void> => {
  await axios.put(`${API_URL}/${orderId}`, order);
};

export const deleteOrder = async (orderId: string): Promise<void> => {
  await axios.delete(`${API_URL}/${orderId}`);
};
