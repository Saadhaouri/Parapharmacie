import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, message } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../../Services/productservices";
import { Category } from "../../Types/CategoryType";
import DataTable from "../../components/DataTable";
import { FaPlus } from "react-icons/fa";

const productSchema = yup.object({
  name: yup.string().required("Le nom est requis"),
  description: yup.string().required("La description est requise"),
  price: yup.number().required("Le prix est requis"),
  priceForSale: yup.number().required("Le prix de vente est requis"),
  quantity: yup.number().required("La quantité est requise"),
  dateExp: yup.string().required("La date d'expiration est requise"),
  categoryID: yup.string().required("La catégorie est requise"),
});

type ProductBase = {
  name: string;
  description: string;
  price: number;
  priceForSale: number;
  quantity: number;
  categoryID: string;
  dateExp: string;
  // Include other properties if necessary
};

type Product = ProductBase & {
  productID: string;
};

type AddProduct = ProductBase;

interface TableCellProps {
  getValue: () => any;
  record: any; // Consider replacing 'any' with the actual type of your row data
}

const formatDateForInput = (date: string) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

const ProductManagementPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [productList, setProductList] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Product>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      priceForSale: 0,
      quantity: 0,
      dateExp: "",
      categoryID: "",
    },
    resolver: yupResolver(productSchema) as any,
  });

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          axios.get("http://localhost:88/Product"),
          axios.get("http://localhost:88/Category"),
        ]);
        setProductList(productsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error(
          "There was an error fetching the products or categories!",
          error
        );
      }
    };

    fetchProductsAndCategories();
  }, []);

  const handleCreateProduct: SubmitHandler<AddProduct> = async (data) => {
    try {
      await createProduct(data);
      setIsModalVisible(false);
      message.success("Produit ajouté avec succès");
      reset();
      // Refresh the product list after adding a product
      const productsResponse = await axios.get("http://localhost:88/Product");
      setProductList(productsResponse.data);
    } catch (error) {
      message.error("Erreur lors de l'ajout du produit");
      console.error("Failed to create produit:", error);
    }
  };

  const handleUpdateProduct: SubmitHandler<Product> = async (data) => {
    try {
      await updateProduct(data.productID, data);
      setIsModalVisible(false);
      message.success("produit mis à jour avec succès");
      // Refresh the product list after updating a product
      const productsResponse = await axios.get("http://localhost:88/Product");
      setProductList(productsResponse.data);
    } catch (error) {
      message.error("Erreur lors de la mise à jour du produit");
      console.error("Failed to update product :", error);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);
      message.success("Product supprimé avec succès");
      // Refresh the product list after deleting a product
      const productsResponse = await axios.get("http://localhost:88/Product");
      setProductList(productsResponse.data);
    } catch (error) {
      message.error("Erreur lors de la suppression du produit");
      console.error("Failed to delete produit:", error);
    }
  };

  const confirmDelete = (productId: string) => {
    Modal.confirm({
      title: "Êtes-vous sûr de vouloir supprimer ce produit?",
      content: "Cette action ne peut pas être annulée.",
      okText: "Oui",
      okType: "danger",
      cancelText: "Non",
      onOk: () => handleDeleteProduct(productId),
    });
  };

  const showModal = () => {
    setIsEdit(false);
    reset({
      name: "",
      description: "",
      price: 0,
      priceForSale: 0,
      quantity: 0,
      dateExp: new Date().toISOString().split("T")[0],
      categoryID: "",
    });
    setIsModalVisible(true);
  };

  const showEditModal = (product: Product) => {
    setIsEdit(true);
    reset({
      ...product,
      dateExp: formatDateForInput(product.dateExp),
    });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      accessorKey: "name",
      header: "Nom",
      cell: ({ cell }: { cell: TableCellProps }) => (
        <span>{cell.getValue()}</span>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ cell }: { cell: TableCellProps }) => (
        <span>{cell.getValue()}</span>
      ),
    },
    {
      accessorKey: "price",
      header: "Prix",
      cell: ({ cell }: { cell: TableCellProps }) => (
        <span>{cell.getValue()}</span>
      ),
    },
    {
      accessorKey: "priceForSale",
      header: "Prix de vente",
      cell: ({ cell }: { cell: TableCellProps }) => (
        <span>{cell.getValue()}</span>
      ),
    },
    {
      accessorKey: "quantity",
      header: "Quantité",
      cell: ({ cell }: { cell: TableCellProps }) => (
        <span>{cell.getValue()}</span>
      ),
    },
    {
      accessorKey: "dateExp",
      header: "Date d'expiration",
      cell: ({ cell }: { cell: TableCellProps }) => (
        <span>{new Date(cell.getValue()).toLocaleDateString()}</span>
      ),
    },
  ];

  // Calculate statistics
  const productCount = productList.length;
  const totalQuantity = productList.reduce(
    (sum, product) => sum + product.quantity,
    0
  );
  const highQuantityProducts = productList.filter(
    (product) => product.quantity > 60
  ).length;
  const highPriceProducts = productList.filter(
    (product) => product.price > 100
  ).length;

  return (
    <div className="h-screen overflow-y-auto bg-gray-200">
      <div className="flex items-center justify-between p-2">
        <div className="pl-4 text-left">
          <h1 className="text-1xl font-bold bg-white p-2 rounded shadow-md ">
            Gestion des Produits
          </h1>
        </div>
        <div className="flex items-center justify-end p-4 mx-3">
          <button
            onClick={showModal}
            className="px-4 py-2 flex items-center min-w-[120px] text-center text-white bg-emerald-400 border-emerald-600 shadow-xl hover:shadow rounded active:text-white-500 focus:ring"
          >
            <FaPlus className="mr-2" />
            Ajouter un produit
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mr-4 ml-4 mb-3">
        <div className="p-4 bg-gradient-to-r from-green-500 to-green-300 rounded shadow-md">
          <h2 className="text-lg font-semibold text-white">
            Nombre de produits
          </h2>
          <p className="text-2xl text-white font-bold flex justify-center">
            {productCount}
          </p>
        </div>
        <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-300 rounded shadow-md">
          <h2 className="text-lg font-semibold text-white">Quantité totale</h2>
          <p className="text-2xl text-white font-bold flex justify-center">
            {totalQuantity}
          </p>
        </div>
        <div className="p-4 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded shadow-md">
          <h2 className="text-lg font-semibold text-white">
            Produits en quantité élevé
          </h2>
          <p className="text-2xl text-white font-bold flex justify-center">
            {highQuantityProducts}
          </p>
        </div>
        <div className="p-4 bg-gradient-to-r from-red-600 to-red-400 rounded shadow-md">
          <h2 className="text-lg font-semibold text-white">Produits chers</h2>
          <p className="text-2xl text-white font-bold flex justify-center">
            {highPriceProducts}
          </p>
        </div>
      </div>
      <div className="mt-2 p-2 mx-4">
        <DataTable
          columns={columns}
          data={productList}
          onUpdate={(row) => showEditModal(row.original)}
          onDelete={confirmDelete}
        />
      </div>
      <Modal
        title={isEdit ? "Modifier Produit" : "Ajouter Produit"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form
          onSubmit={handleSubmit((data, e) =>
            isEdit
              ? handleUpdateProduct(data as Product)
              : handleCreateProduct(data, e)
          )}
          className="space-y-6"
          ref={formRef}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                <input
                  {...field}
                  placeholder="Nom du produit"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                <input
                  {...field}
                  placeholder="Description"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                <input
                  {...field}
                  placeholder="Prix"
                  type="number"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            name="priceForSale"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                <input
                  {...field}
                  placeholder="Prix de vente"
                  type="number"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                />
                {errors.priceForSale && (
                  <p className="text-red-500 text-sm">
                    {errors.priceForSale.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="quantity"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                <input
                  {...field}
                  placeholder="Quantité"
                  type="number"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                />
                {errors.quantity && (
                  <p className="text-red-500 text-sm">
                    {errors.quantity.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="categoryID"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                <select
                  {...field}
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.categoryID && (
                  <p className="text-red-500 text-sm">
                    {errors.categoryID.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="dateExp"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                <input
                  {...field}
                  placeholder="Date d'expiration"
                  type="date"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                />
                {errors.dateExp && (
                  <p className="text-red-500 text-sm">
                    {errors.dateExp.message}
                  </p>
                )}
              </div>
            )}
          />
          {/* Add other form fields as necessary */}
        </form>
      </Modal>
    </div>
  );
};

export default ProductManagementPage;
