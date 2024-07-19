import { useState, useEffect } from "react";
import axios from "axios";

const apiSupplierUrl = "http://localhost:88/Supplier";
interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  // Add other properties if needed
}

export const useGetAllSuppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSuppliers = () => {
    setLoading(true);
    axios
      .get(apiSupplierUrl)
      .then((response) => {
        setSuppliers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return { suppliers, loading, error, fetchSuppliers };
};

export const useGetSupplier = (id: string) => {
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    axios
      .get(`${apiSupplierUrl}/${id}`)
      .then((response) => {
        setSupplier(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  return { supplier, loading, error };
};

export const useCreateSupplier = (onSuccess: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const create = (supplier: Omit<Supplier, "id">) => {
    setLoading(true);
    axios
      .post(apiSupplierUrl, supplier)
      .then(() => {
        setLoading(false);
        onSuccess();
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  return { create, loading, error };
};

export const useUpdateSupplier = (onSuccess: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const update = (id: string, supplier: Omit<Supplier, "id">) => {
    setLoading(true);
    axios
      .put(`${apiSupplierUrl}/${id}`, supplier)
      .then(() => {
        setLoading(false);
        onSuccess();
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  return { update, loading, error };
};

export const useDeleteSupplier = (onSuccess: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const remove = (id: string) => {
    setLoading(true);
    axios
      .delete(`${apiSupplierUrl}/${id}`)
      .then(() => {
        setLoading(false);
        onSuccess();
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  return { remove, loading, error };
};
