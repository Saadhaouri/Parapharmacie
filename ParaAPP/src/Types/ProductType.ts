// ProductType.ts

export default interface Product {
  productID: string;
  name: string;
  description: string;
  price: number;
  priceForSale: number;
  quantity: number;
  categoryID: string;
  dateExp: string;
}
export default interface CreateProduct {
  name: string;
  description: string;
  price: number;
  priceForSale: number;
  quantity: number;
  categoryID: string;
  dateExp: string;
}
