// Types/SaleTypes.ts

export interface AddSale {
  productID: string;
  quantity: number;
}

export interface Sale {
  productID: string; // Guid in C# is similar to string in TypeScript
  quantity: number;
  price: number;
  saleDate: Date;
}
