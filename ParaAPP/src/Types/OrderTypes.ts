// Types/OrderTypes.ts

export interface Order {
  orderID: string;
  supplierId: string;
  orderDate: Date | null;
  totalAmount: number;
  status: string;
  clientId: string;
  productIds: (string | undefined)[];
}

export interface CreateOrder {
  supplierId: string;
  totalAmount: number;
  status: string;
  clientId: string;
  productIds: (string | undefined)[];
}
