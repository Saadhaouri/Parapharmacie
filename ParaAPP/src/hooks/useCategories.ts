import { useState, useEffect, useCallback } from "react";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getProductsByCategoryId,
} from "../Services/categoryService";

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
}

export const useGetAllCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, loading, error, refetchCategories: fetchCategories };
};

export const useGetCategory = (id: string) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      try {
        const data = await getCategoryById(id);
        setCategory(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCategory();
  }, [id]);

  return { category, loading, error };
};

export const useCreateCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { refetchCategories } = useGetAllCategories();

  const create = async (category: Omit<Category, "id">) => {
    setLoading(true);
    try {
      await createCategory(category);
      refetchCategories(); // Automatically refetch categories after creation
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error };
};

export const useUpdateCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { refetchCategories } = useGetAllCategories();

  const update = async (id: string, category: Omit<Category, "id">) => {
    setLoading(true);
    try {
      await updateCategory(id, category);
      refetchCategories(); // Automatically refetch categories after update
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
};

export const useDeleteCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { refetchCategories } = useGetAllCategories();

  const remove = async (id: string) => {
    setLoading(true);
    try {
      await deleteCategory(id);
      refetchCategories(); // Automatically refetch categories after deletion
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading, error };
};

export const useGetProductsByCategoryId = (categoryId: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProductsByCategoryId(categoryId);
        setProducts(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    if (categoryId) fetchProducts();
  }, [categoryId]);

  return { products, loading, error };
};
