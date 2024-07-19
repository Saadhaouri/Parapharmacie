import axios from "axios";
import { useEffect, useState } from "react";
import Product from "../../Types/ProductType";
const API_URL = "http://localhost:88/Product";

export const getAllProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const StockAlerts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();
        setProducts(
          products.filter((product: Product) => product.quantity < 10)
        );
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % products.length);
  };

  const handlePrevious = () => {
    setCurrentPage(
      (prevPage) => (prevPage - 1 + products.length) % products.length
    );
  };

  const totalProductsCount = products.length;

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  const currentProduct = products[currentPage];

  return (
    <div className="relative bg-white p-6 mt-4 rounded-lg text-emerald-600">
      <h2 className="text-2xl font-semibold mb-4 flex items-center justify-between">
        Alertes de Stock{" "}
        <span className="text-gray-700 text-xl font-bold">
          {totalProductsCount}
        </span>
      </h2>
      <div className="absolute top-0 right-0 p-2 bg-gray-200 rounded-lg"></div>
      {currentProduct ? (
        <div className="flex flex-col">
          <div
            key={currentProduct.productID}
            className="flex justify-between items-center p-4 bg-teal-500 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            <h3 className="text-lg font-semibold text-white">
              {currentProduct.name}
            </h3>
            <p className="text-white font-bold">
              Qté : {currentProduct.quantity}
            </p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevious}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-md hover:bg-gray-400 transition-colors duration-300 ease-in-out"
            >
              Précédent
            </button>
            <button
              onClick={handleNext}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-md hover:bg-gray-400 transition-colors duration-300 ease-in-out"
            >
              Suivant
            </button>
          </div>
        </div>
      ) : (
        <div>Aucun produit en faible stock.</div>
      )}
    </div>
  );
};

export default StockAlerts;
