// Types/OrderTypes.ts

export interface Order {
  orderID: string;
  supplierId: string;
  orderDate: Date;
  totalAmount: number;
  status: string;
  clientId: string;
  productIds: string[];
}

export interface CreateOrder {
  supplierId: string;
  totalAmount: number;
  status: string;
  clientId: string;
  productIds: string[];
}
