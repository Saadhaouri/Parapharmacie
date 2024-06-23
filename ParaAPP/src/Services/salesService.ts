import axios from "axios";
import { AddSale } from "../Types/SaleTypes";

const API_URL = "https://localhost:7016/api/Sales";
const API_URL_Product = "https://localhost:7016/api/Product";

export const getDailySales = async () => {
  const response = await axios.get(`${API_URL}/daily-sales`);
  return response.data;
};

export const getWeeklySales = async () => {
  const response = await axios.get(`${API_URL}/weekly-sales`);
  return response.data;
};

export const getMonthlySales = async () => {
  const response = await axios.get(`${API_URL}/monthly-sales`);
  return response.data;
};

export const addSale = async (saleData: AddSale) => {
  try {
    const response = await axios.post(`${API_URL}`, saleData);
    return response.data;
  } catch (error) {
    console.error("There was an error adding the sale!", error);
    throw error;
  }
};

export const getAllProducts = async () => {
  const response = await axios.get(API_URL_Product);
  return response.data;
};

export const getTotalDailyProfit = async () => {
  const response = await axios.get(`${API_URL}/total-daily-profit`);
  return response.data.totalDailyProfit; // Assuming the API returns { totalDailyProfit: value }
};

export const getTotalWeeklyProfit = async () => {
  const response = await axios.get(`${API_URL}/total-weekly-profit`);
  return response.data.totalWeeklyProfit; // Assuming the API returns { totalWeeklyProfit: value }
};

export const getTotalMonthlyProfit = async () => {
  const response = await axios.get(`${API_URL}/total-monthly-profit`);
  return response.data.totalMonthlyProfit; // Assuming the API returns { totalMonthlyProfit: value }
};
