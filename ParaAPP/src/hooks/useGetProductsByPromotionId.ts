import { useState, useEffect } from "react";
import axios from "axios";

export const useGetProductsByPromotionId = (promotionId: string) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (promotionId) {
      axios
        .get(`https://localhost:7016/api/Promotion/${promotionId}/products`)
        .then((response) => {
          setProducts(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching products!", error);
          setLoading(false);
        });
    }
  }, [promotionId]);

  return { products, loading };
};
