import { format } from "date-fns";
import { useEffect, useState } from "react";
import { FcExpired } from "react-icons/fc";
import { getProductsExpiringWithinAMonth } from "../../Services/productservices";
import Product from "../../Types/ProductType";

const ProductsExpiringSoon = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProductsExpiringWithinAMonth();
      setProducts(result);
    };

    fetchData();
  }, []);

  if (products.length === 0)
    return (
      <div className="text-center text-gray-500">No products expiring soon</div>
    );

  return (
    <div className=" bg-white p-6 shadow-lg rounded-lg text-emerald-600">
      <h2 className="text-2xl font-semibold mb-4">Produits expirant bientôt</h2>
      <ul className="space-y-2">
        {products.map((product) => (
          <li
            key={product.productID}
            className="flex justify-between items-center p-4 bg-teal-500 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            <div className="flex flex-col">
              <span className="font-medium text-white text-lg">
                {product.name}
              </span>
              <div className="text-sm text-gray-200 mt-1">
                Expiry Date:{" "}
                {format(new Date(product.dateExp), "MMMM dd, yyyy")}
              </div>
            </div>
            <FcExpired className="text-3xl text-white font-bold " />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsExpiringSoon;
