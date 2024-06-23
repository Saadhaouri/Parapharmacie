import axios from "axios";
import Supplier from "../Types/SupplierType";

const API_URL = "https://localhost:7016/api/Supplier";

export const getAllSuppliers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getSupplierById = async (supplierId: string) => {
  const response = await axios.get(`${API_URL}/${supplierId}`);
  return response.data;
};

export const createSupplier = async (supplier: Supplier) => {
  const response = await axios.post(API_URL, supplier);
  return response.data;
};

export const updateSupplier = async (
  supplierId: string,
  supplier: Supplier
) => {
  await axios.put(`${API_URL}/${supplierId}`, supplier);
};

export const deleteSupplier = async (supplierId: string) => {
  await axios.delete(`${API_URL}/${supplierId}`);
};
