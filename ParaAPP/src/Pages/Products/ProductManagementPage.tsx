import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, message } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { deleteClient } from "../../Services/clientServices";
import { createProduct, updateProduct } from "../../Services/productservices";
import { Category } from "../../Types/CategoryType";
import { CreateProduct, Product } from "../../Types/ProductType";
import DataTable from "../../components/DataTable";

// Validation schema for the client form
const productSchema = yup.object().shape({
  name: yup.string().required("Le nom est requis"),
  description: yup.string().required("La description est requise"),
  price: yup.number().required("Le prix est requis"),
  priceForSale: yup.number().required("Le prix de vente est requis"),
  quantity: yup.number().required("La quantité est requise"),
  dateExp: yup.date().required("La date d'expiration est requise"),
  categoryID: yup.string().required("La catégorie est requise"),
});

const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatDateForInput = (date) => {
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
      productID: "",
      name: "",
      description: "",
      price: 0,
      priceForSale: 0,
      quantity: 0,
      dateExp: "",
      categoryID: "",
    },
    resolver: yupResolver(productSchema),
  });

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          axios.get("https://localhost:7016/api/Product"),
          axios.get("https://localhost:7016/api/Category"),
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

  const handleCreateProduct: SubmitHandler<CreateProduct> = async (data, e) => {
    try {
      await createProduct(data);
      setIsModalVisible(false);
      message.success("Client ajouté avec succès");
      reset();
    } catch (error) {
      message.error("Erreur lors de l'ajout du client");
      console.error("Failed to create client:", error);
    }
  };

  const handleUpdateProduct: SubmitHandler<Product> = async (data) => {
    try {
      await updateProduct(data.productID, data);
      setIsModalVisible(false);
      message.success("Client mis à jour avec succès");
    } catch (error) {
      message.error("Erreur lors de la mise à jour du client");
      console.error("Failed to update client:", error);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteClient(productId);
      message.success("Client supprimé avec succès");
    } catch (error) {
      message.error("Erreur lors de la suppression du client");
      console.error("Failed to delete client:", error);
    }
  };

  const confirmDelete = (productId: string) => {
    Modal.confirm({
      title: "Êtes-vous sûr de vouloir supprimer ce client?",
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
      productID: "",
      name: "",
      description: "",
      price: 0,
      priceForSale: 0,
      quantity: 0,
      dateExp: formatDateForInput(new Date()),
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
      Cell: ({ cell }: { cell: { getValue: () => string } }) => (
        <span>{cell.getValue()}</span>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      Cell: ({ cell }: { cell: { getValue: () => string } }) => (
        <span>{cell.getValue()}</span>
      ),
    },
    {
      accessorKey: "price",
      header: "Prix",
      Cell: ({ cell }: { cell: { getValue: () => number } }) => (
        <span>{cell.getValue()}</span>
      ),
    },
    {
      accessorKey: "priceForSale",
      header: "Prix de vente",
      Cell: ({ cell }: { cell: { getValue: () => number } }) => (
        <span>{cell.getValue()}</span>
      ),
    },
    {
      accessorKey: "quantity",
      header: "Quantité",
      Cell: ({ cell }: { cell: { getValue: () => number } }) => (
        <span>{cell.getValue()}</span>
      ),
    },
    {
      accessorKey: "dateExp",
      header: "Date d'expiration",
      Cell: ({ cell }: { cell: { getValue: () => string } }) => (
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
    (product) => product.quantity > 100
  ).length;
  const highPriceProducts = productList.filter(
    (product) => product.price > 100
  ).length;

  return (
    <div className="h-screen overflow-y-auto bg-gray-200">
      <div className="flex items-center justify-between p-2">
        <div className="pl-4 text-left">
          <h1 className="text-1xl font-bold bg-white p-2 rounded shadow-md ">
            Gestion des Produit
          </h1>
        </div>
        <div className="flex items-center justify-end p-4 mx-3">
          <button
            onClick={showModal}
            className="px-6 py-2 flex items-center min-w-[120px] text-center text-white bg-emerald-400 border-emerald-600 shadow-xl hover:shadow rounded active:text-white-500 focus:ring"
          >
            Ajouter un produit
          </button>
        </div>
      </div>
      <div className="   grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  mr-4 ml-4 mb-3 ">
        <div className="p-4 bg-gradient-to-r from-green-500 to-green-300 rounded shadow-md">
          <h2 className="text-lg font-semibold text-white ">
            Nombre de produits
          </h2>
          <p className="text-2xl text-white font-bold flex  justify-center">
            {productCount}
          </p>
        </div>
        <div className="p-4 bg-gradient-to-r from-violet-800 to-indigo-600 rounded shadow-md">
          <h2 className="text-lg font-semibold  text-white">Quantité totale</h2>
          <p className="text-2xl font-bold text-white flex justify-center">
            {totalQuantity}
          </p>
        </div>
        <div className="p-4 bg-gradient-to-r from-indigo-500 to-blue-500 rounded shadow-md">
          <h2 className="text-lg font-semibold   text-white">
            Produits en grande quantité
          </h2>
          <p className="text-2xl  font-bold text-white flex justify-center">
            {highQuantityProducts}
          </p>
        </div>
        <div className="p-4 bg-gradient-to-r from-cyan-500 to-blue-500  rounded shadow-md">
          <h2 className="text-lg font-semibold text-white">Produits chers</h2>
          <p className="text-2xl font-bold text-white flex justify-center">
            {highPriceProducts}
          </p>
        </div>
      </div>
      <div className="pl-4 pr-2 w-[99%]">
        <DataTable
          data={productList}
          columns={columns}
          onDelete={(row) => confirmDelete(row.original.productID)}
          onUpdate={(row) => showEditModal(row.original)}
        />
      </div>
      <Modal
        title={isEdit ? "Modifier le produit" : "Ajouter un produit"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={isEdit ? "Modifier" : "Ajouter"}
        cancelText="Annuler"
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
                  placeholder="Nom"
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
                  type="number"
                  placeholder="Prix"
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
                  type="number"
                  placeholder="Prix de vente"
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
                  type="number"
                  placeholder="Quantité"
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
            name="dateExp"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                <input
                  {...field}
                  type="date"
                  placeholder="Date d'expiration"
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

          <Controller
            name="categoryID"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                <select
                  {...field}
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories?.map((category) => (
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
        </form>
      </Modal>
    </div>
  );
};

export default ProductManagementPage;
