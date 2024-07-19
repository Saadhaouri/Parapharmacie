import { format } from "date-fns";
import { useEffect, useState } from "react";
import { FcExpired } from "react-icons/fc";
import { getProductsExpiringWithinAMonth } from "../../Services/productservices";
import Product from "../../Types/ProductType";
import { FaBoxOpen } from "react-icons/fa";

const ProductsExpiringSoon = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProductsExpiringWithinAMonth();
      setProducts(result);
    };

    fetchData();
  }, []);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const totalProductsCount = products.length;

  if (products.length === 0)
    return (
      <div className=" bg-white rounded shadow-md   flex flex-col items-center text-center text-gray-500 py-4">
        <FaBoxOpen className="text-3xl mb-2" />
        <span>Aucun produit n'expire bientôt</span>
      </div>
    );

  return (
    <div className="relative bg-white p-6 shadow-lg rounded-lg text-emerald-600">
      <h2 className="text-2xl font-semibold mb-4 flex items-center justify-between">
        Produits expirant bientôt
        <span className="text-emerald-800 text-xl font-bold">
          {products.length}
        </span>
      </h2>
      <ul className="space-y-2">
        {currentProducts.map((product) => (
          <li
            key={product.productID}
            className="flex justify-between items-center p-4 bg-teal-500 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            <div className="flex flex-col">
              <span className="font-medium text-white text-lg">
                {product.name}
              </span>
              <div className="text-sm text-gray-200 mt-1">
                Date d'expiration :{" "}
                {format(new Date(product.dateExp), "dd MMMM yyyy")}
              </div>
            </div>
            <FcExpired className="text-3xl text-white font-bold " />
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-4 space-x-2">
        {[...Array(Math.ceil(totalProductsCount / itemsPerPage))].map(
          (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === index + 1
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ProductsExpiringSoon;
