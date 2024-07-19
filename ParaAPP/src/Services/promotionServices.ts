import axios from "axios";
import { Promotion, CreatePromotion } from "../Types/Promotion";

const API_URL = "http://localhost:88/Promotion";

export const getAllPromotions = async (): Promise<Promotion[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getPromotionById = async (
  promotionId: string
): Promise<Promotion> => {
  const response = await axios.get(`${API_URL}/${promotionId}`);
  return response.data;
};

export const createPromotion = async (
  promotion: CreatePromotion
): Promise<Promotion> => {
  const response = await axios.post(API_URL, promotion);
  return response.data;
};

export const updatePromotion = async (
  promotionId: string,
  promotion: Promotion
): Promise<void> => {
  await axios.put(`${API_URL}/${promotionId}`, promotion);
};

export const deletePromotion = async (promotionId: string): Promise<void> => {
  await axios.delete(`${API_URL}/${promotionId}`);
};
