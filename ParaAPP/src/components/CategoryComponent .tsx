import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Modal, Pagination, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useGetProductsByCategoryId } from "../hooks/useCategories";

interface Category {
  id: string;
  name: string;
}

const CategoryComponent: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [listCategories, setListCategories] = useState<Category[]>([]);
  const [categoriesPage, setCategoriesPage] = useState(1);
  const [productsPage, setProductsPage] = useState(1);
  const [categoriesPageSize, setCategoriesPageSize] = useState(5);
  const [productsPageSize, setProductsPageSize] = useState(8);

  const { register, handleSubmit, reset, setValue } = useForm<Category>();

  useEffect(() => {
    axios
      .get("http://localhost:88/Category")
      .then((response) => {
        setListCategories(response.data);
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des catégories !",
          error
        );
      });
  }, []);

  const { products, loading: productsLoading } =
    useGetProductsByCategoryId(selectedCategoryId);

  const showCreateModal = () => {
    setIsCreateModalVisible(true);
  };

  const showUpdateModal = (category: Category) => {
    setCurrentCategory(category);
    setValue("name", category.name);
    setIsUpdateModalVisible(true);
  };

  const handleCancel = () => {
    setIsCreateModalVisible(false);
    setIsUpdateModalVisible(false);
    setCurrentCategory(null);
    reset();
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setProductsPage(1);
  };

  const handleDeleteCategory = (categoryId: string) => {
    Modal.confirm({
      title: "Êtes-vous sûr de vouloir supprimer cette catégorie ?",
      onOk: () => {
        axios
          .delete(`http://localhost:88/Category/${categoryId}`)
          .then(() => {
            setListCategories(
              listCategories.filter((c) => c.id !== categoryId)
            );
            message.success("Catégorie supprimée avec succès !");
          })
          .catch((error) => {
            message.error(
              "Une erreur s'est produite lors de la suppression de la catégorie !"
            );
            console.error(
              "Une erreur s'est produite lors de la suppression de la catégorie !",
              error
            );
          });
      },
    });
  };

  const onCreateSubmit = (data: Category) => {
    axios
      .post("http://localhost:88/Category", data)
      .then((response) => {
        setListCategories([...listCategories, response.data]);
        message.success("Catégorie créée avec succès !");
        handleCancel();
      })
      .catch((error) => {
        message.error(
          "Une erreur s'est produite lors de la création de la catégorie !"
        );
        console.error(
          "Une erreur s'est produite lors de la création de la catégorie !",
          error
        );
      });
  };

  const onUpdateSubmit = (data: Category) => {
    if (currentCategory) {
      axios
        .put(`http://localhost:88/Category/${currentCategory.id}`, data)
        .then((response) => {
          setListCategories(
            listCategories.map((c) =>
              c.id === currentCategory.id ? response.data : c
            )
          );
          message.success("Catégorie mise à jour avec succès !");
          handleCancel();
        })
        .catch((error) => {
          message.error(
            "Une erreur s'est produite lors de la mise à jour de la catégorie !"
          );
          console.error(
            "Une erreur s'est produite lors de la mise à jour de la catégorie !",
            error
          );
        });
    }
  };

  const handleCategoriesPageChange = (page: number, pageSize: number) => {
    setCategoriesPage(page);
    setCategoriesPageSize(pageSize);
  };

  const handleProductsPageChange = (page: number, pageSize: number) => {
    setProductsPage(page);
    setProductsPageSize(pageSize);
  };

  const paginatedCategories = listCategories.slice(
    (categoriesPage - 1) * categoriesPageSize,
    categoriesPage * categoriesPageSize
  );

  const paginatedProducts = products.slice(
    (productsPage - 1) * productsPageSize,
    productsPage * productsPageSize
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Catégories</h1>
        <Button type="primary" onClick={showCreateModal}>
          Nouvelle Catégorie
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginatedCategories.map((category) => (
          <div
            key={category.id}
            className="p-4 bg-white rounded shadow-xl hover:shadow-lg cursor-pointer flex justify-between items-center"
            onClick={() => handleSelectCategory(category.id)}
          >
            <h3 className="font-semibold">{category.name}</h3>
            <div>
              <EditOutlined
                className="text-blue-500 hover:text-blue-700 mr-2"
                onClick={(e) => {
                  e.stopPropagation();
                  showUpdateModal(category);
                }}
              />
              <DeleteOutlined
                className="text-red-500 hover:text-red-700"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteCategory(category.id);
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <Pagination
        current={categoriesPage}
        pageSize={categoriesPageSize}
        total={listCategories.length}
        onChange={handleCategoriesPageChange}
        className="mt-4"
      />
      {selectedCategoryId && (
        <div>
          <h2 className="text-xl font-bold mb-4">
            Produits dans la catégorie sélectionnée
          </h2>
          {productsLoading && <p>Chargement en cours...</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginatedProducts.map((product) => (
              <div
                key={product.id}
                className="w-full max-w-xs bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="px-4 py-2">
                    <h3 className="text-gray-800 font-bold text-lg">
                      {product.name}
                    </h3>
                  </div>
                  <div className="px-4 py-2">
                    <p className="text-gray-600">{product.description}</p>
                  </div>
                </div>
                <div className="px-4 py-2 flex justify-end items-center">
                  <span>
                    <span className="text-gray-900 font-semibold">Prix :</span>
                    <span className="text-gray-900">{product.price} $</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            current={productsPage}
            pageSize={productsPageSize}
            total={products.length}
            onChange={handleProductsPageChange}
            className="mt-4"
          />
        </div>
      )}
      <Modal
        title="Nouvelle Catégorie"
        visible={isCreateModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={handleSubmit(onCreateSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="createCategoryName"
              className="block text-sm font-medium text-gray-700"
            >
              Nom de la Catégorie
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              id="createCategoryName"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex justify-end">
            <Button type="primary" htmlType="submit">
              Créer
            </Button>
          </div>
        </form>
      </Modal>
      <Modal
        title="Mettre à jour une Catégorie"
        visible={isUpdateModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={handleSubmit(onUpdateSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="updateCategoryName"
              className="block text-sm font-medium text-gray-700"
            >
              Nom de la Catégorie
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              id="updateCategoryName"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex justify-end">
            <Button type="primary" htmlType="submit">
              Mettre à jour
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CategoryComponent;
