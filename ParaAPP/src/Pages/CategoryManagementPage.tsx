import React, { useEffect, useState } from "react";
import { Button, Modal, message } from "antd";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  FrownOutlined,
} from "@ant-design/icons";
import { useGetProductsByCategoryId } from "../hooks/useCategories";

interface Category {
  id: string;
  name: string;
}

const CategoryManagementPage: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [listcategories, setListcategories] = useState<Category[]>([]);

  const { register, handleSubmit, reset, setValue } = useForm<Category>();

  useEffect(() => {
    axios
      .get("https://localhost:7016/api/Category")
      .then((response) => {
        setListcategories(response.data);
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des catégories !",
          error
        );
      });
  }, [listcategories]);

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
  };

  const handleDeleteCategory = (categoryId: string) => {
    Modal.confirm({
      title: "Êtes-vous sûr de vouloir supprimer cette catégorie ?",
      onOk: () => {
        axios
          .delete(`https://localhost:7016/api/Category/${categoryId}`)
          .then(() => {
            setListcategories(
              listcategories.filter((c) => c.id !== categoryId)
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
      .post("https://localhost:7016/api/Category", data)
      .then((response) => {
        setListcategories([...listcategories, response.data]);
        message.success("Catégorie ajoutée avec succès !");
        handleCancel();
      })
      .catch((error) => {
        message.error(
          "Une erreur s'est produite lors de l'ajout de la catégorie !"
        );
        console.error(
          "Une erreur s'est produite lors de l'ajout de la catégorie !",
          error
        );
      });
  };

  const onUpdateSubmit = (data: Category) => {
    if (currentCategory) {
      axios
        .put(`https://localhost:7016/api/Category/${currentCategory.id}`, data)
        .then((response) => {
          setListcategories(
            listcategories.map((c) =>
              c.id === currentCategory.id ? response.data : c
            )
          );
          message.success("Catégorie mise à jour avec succès !");
          handleCancel(); // Fermer le modal
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

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-1xl font-bold bg-white p-2 rounded shadow-md ">
          Gestion de Catégories
        </h1>
        <button
          className="px-6 py-2 flex items-center min-w-[120px] text-center text-white bg-emerald-400 border-emerald-600 shadow-xl hover:shadow rounded active:text-white-500 focus:ring"
          onClick={showCreateModal}
        >
          Nouvelle Catégorie
        </button>
      </div>
      <div className="grid grid-cols-4 gap-1 mt-4">
        {listcategories.map((category) => (
          <div
            key={category.id}
            className="p-4 m-2 bg-white rounded shadow-xl hover:shadow-lg cursor-pointer flex justify-between items-center"
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
      {selectedCategoryId && (
        <div>
          <h2 className="text-xl font-bold mb-4">
            Produits dans la catégorie sélectionnée
          </h2>
          {productsLoading ? (
            <p>Chargement en cours...</p>
          ) : (
            <div className="grid grid-cols-4 gap-2  bg-white rounded-lg shadow-emerald-500 p-4 ">
              {products.length > 0 ? (
                products.map((product) => (
                  <div
                    key={product.id}
                    className="w-full max-w-xs bg-gray-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
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
                        <span className="text-gray-900 font-semibold">
                          Prix :
                        </span>
                        <span className="text-gray-900">
                          {product.price} dh{" "}
                        </span>
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center col-span-4">
                  <FrownOutlined className="text-gray-500 text-4xl" />
                  <span className="text-gray-500 text-xl ml-2">
                    Aucun produit trouvé
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      <Modal
        title="Nouvelle Catégorie"
        open={isCreateModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={handleSubmit(onCreateSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="categoryName"
              className="block text-sm font-medium text-gray-700"
            >
              Nom de la Catégorie
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              id="categoryName"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex justify-end">
            <Button type="primary" htmlType="submit">
              Soumettre
            </Button>
          </div>
        </form>
      </Modal>
      <Modal
        title="Mettre à Jour la Catégorie"
        open={isUpdateModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={handleSubmit(onUpdateSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="categoryName"
              className="block text-sm font-medium text-gray-700"
            >
              Nom de la Catégorie
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              id="categoryName"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex justify-end">
            <Button type="primary" htmlType="submit">
              Soumettre
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CategoryManagementPage;
