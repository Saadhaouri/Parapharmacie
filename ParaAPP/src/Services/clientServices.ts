// Services/clientServices.ts

import axios from "axios";
import { Client, CreateClient } from "../Types/ClientType";

const API_URL = "http://localhost:88/Client";

export const createClient = (data: CreateClient) => {
  return axios.post(API_URL, data);
};

export const updateClient = (clientId: string, data: Client) => {
  return axios.put(`${API_URL}/${clientId}`, data);
};

export const deleteClient = (clientId: string) => {
  return axios.delete(`${API_URL}/${clientId}`);
};

export const getClients = () => {
  return axios.get(API_URL);
};
