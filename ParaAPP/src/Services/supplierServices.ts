import axios from "axios";
type SupplierBase = {
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  // Include other properties if necessary
};

type Supplier = SupplierBase & {
  supplierId: string;
};

const API_URL = "http://localhost:88/Supplier";

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
