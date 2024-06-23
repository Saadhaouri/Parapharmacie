export interface CreatePromotion {
  code: string;
  discount: number;
  startDate: string;
  endDate: string;
  productIds: string[];
}
export interface Promotion {
  promotionID: string;
  code: string;
  discount: number;
  startDate: string;
  endDate: string;
  productIds: string[];
}
