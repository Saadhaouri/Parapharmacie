import { useState, useEffect } from "react";
import axios from "axios";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryID: string;
  dateExp: string;
}

const apiUrl = "http://localhost:88/Product";

export const useGetAllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = () => {
    setLoading(true);
    axios
      .get(apiUrl)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error };
};

export const useGetProduct = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    axios
      .get(`${apiUrl}/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  return { product, loading, error };
};

export const useCreateProduct = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const create = (product: Omit<Product, "id">) => {
    setLoading(true);
    axios
      .post(apiUrl, product)
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  return { create, loading, error };
};

export const useUpdateProduct = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const update = (id: string, product: Omit<Product, "id">) => {
    setLoading(true);
    axios
      .put(`${apiUrl}/${id}`, product)
      .then(() => {
        setLoading(false);
        // onSuccess();
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  return { update, loading, error };
};

export const useDeleteProduct = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const remove = (id: string) => {
    setLoading(true);
    axios
      .delete(`${apiUrl}/${id}`)
      .then(() => {
        setLoading(false);
        // onSuccess();
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  return { remove, loading, error };
};
