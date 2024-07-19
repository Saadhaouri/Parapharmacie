import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, Select, message } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  createPromotion,
  deletePromotion,
  getAllPromotions,
  updatePromotion,
} from "../Services/promotionServices";
import Product from "../Types/ProductType";

interface Promotion {
  promotionID: string;
  code: string;
  discount: number;
  startDate: string;
  endDate: string;
  productIds: string[];
}

const formatDate = (date: string) => {
  const d = new Date(date);
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const day = `0${d.getDate()}`.slice(-2);
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

const ITEMS_PER_PAGE = 6; // Change this to the number of items you want per page

const PromotionManagementPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(
    null
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [promotionList, setPromotionList] = useState<Promotion[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<Promotion>({
    defaultValues: {},
  });

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get("http://localhost:88/Promotion");
        setPromotionList(response.data);
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:88/Product");
        setProductList(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchPromotions();
    fetchProducts();
  }, []);

  const handleCreatePromotion: SubmitHandler<Promotion> = async (data) => {
    try {
      await createPromotion(data);
      setIsModalVisible(false);
      message.success("Promotion ajoutée avec succès");
      reset();
      const newPromotionList = await getAllPromotions();
      setPromotionList(newPromotionList); // Update the promotion list
    } catch (error) {
      message.error("Erreur lors de l'ajout de la promotion");
      console.error("Failed to create promotion:", error);
    }
  };

  const handleUpdatePromotion: SubmitHandler<Promotion> = async (data) => {
    try {
      await updatePromotion(data.promotionID, data);
      setIsModalVisible(false);
      message.success("Promotion mise à jour avec succès");
      const updatedPromotionList = promotionList.map((promo) =>
        promo.promotionID === data.promotionID ? data : promo
      );
      setPromotionList(updatedPromotionList);
    } catch (error) {
      message.error("Erreur lors de la mise à jour de la promotion");
      console.error("Failed to update promotion:", error);
    }
  };

  const handleDeletePromotion = async (promotionId: string) => {
    try {
      await deletePromotion(promotionId);
      message.success("Promotion supprimée avec succès");
      const updatedPromotionList = promotionList.filter(
        (promo) => promo.promotionID !== promotionId
      );
      setPromotionList(updatedPromotionList);
    } catch (error) {
      message.error("Erreur lors de la suppression de la promotion");
      console.error("Failed to delete promotion:", error);
    }
  };

  const confirmDelete = (promotionId: string) => {
    Modal.confirm({
      title: "Êtes-vous sûr de vouloir supprimer cette promotion?",
      content: "Cette action ne peut pas être annulée.",
      okText: "Oui",
      okType: "danger",
      cancelText: "Non",
      onOk: () => handleDeletePromotion(promotionId),
    });
  };

  const showModal = () => {
    setIsEdit(false);
    reset({});
    setIsModalVisible(true);
  };

  const showEditModal = (promotion: Promotion) => {
    setIsEdit(true);
    reset({
      ...promotion,
      startDate: formatDate(promotion.startDate),
      endDate: formatDate(promotion.endDate),
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

  const getProductDetails = (productID: string): Product | null => {
    const product = productList.find((p) => p.productID === productID);
    return product ? product : null;
  };

  const handlePromotionClick = (promotion: Promotion) => {
    setSelectedPromotion(promotion);
    setCurrentPage(1); // Reset to first page when a new promotion is selected
  };

  const totalItems = selectedPromotion?.productIds.length || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return selectedPromotion?.productIds.slice(startIndex, endIndex) || [];
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="h-screen overflow-y-auto bg-gray-200">
      <div className="pl-4 flex justify-between items-center mt-4 pr-4 ">
        <h1 className="text-1xl font-bold bg-white p-2 rounded shadow-md ">
          Gestion des Promotions
        </h1>
        <button
          onClick={showModal}
          className="px-6 py-2 flex items-center min-w-[120px] text-center text-white bg-emerald-400 border-emerald-600 shadow-xl hover:shadow rounded active:text-white-500 focus:ring"
        >
          Ajouter promotion
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {promotionList.map((promotion) => (
          <div
            key={promotion.promotionID}
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
            onClick={() => handlePromotionClick(promotion)}
          >
            <div className=" flex justify-between items-center">
              <h2 className="text-lg font-semibold">{promotion.code}</h2>
              <div className=" ">
                <EditOutlined
                  className="text-blue-500 hover:text-blue-700 mr-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    showEditModal(promotion);
                  }}
                />
                <DeleteOutlined
                  className="text-red-500 hover:text-red-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    confirmDelete(promotion.promotionID);
                  }}
                />
              </div>
            </div>
            <p className="text-emerald-500 text-4xl text-center  font-bold ">
              {promotion.discount}%
            </p>
            <p className="text-gray-600 text-right font-bold ">
              {new Date(promotion.endDate).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
      {selectedPromotion && (
        <div className="p-4 m-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center ">
            {selectedPromotion.code}
          </h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4">
            {getCurrentPageProducts().map((productId) => {
              const product = getProductDetails(productId);
              return (
                product && (
                  <div
                    key={product.productID}
                    className="bg-gradient-to-r from-violet-200 to-pink-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="p-4">
                      <h3 className="text-gray-800 font-bold text-lg truncate">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 truncate">
                        {product.description}
                      </p>
                      <div className="flex justify-end items-center mt-2">
                        <span className="text-gray-900 font-semibold">
                          Prix :
                        </span>
                        <span className="text-gray-900 font-bold">
                          {" "}
                          {product.price} DH
                        </span>
                      </div>
                    </div>
                  </div>
                )
              );
            })}
          </ul>

          {totalPages > 1 && (
            <div className="flex justify-center mt-4">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 mx-1 rounded ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <Modal
        title={isEdit ? "Modifier Promotion" : "Ajouter Promotion"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form
          ref={formRef}
          onSubmit={
            isEdit
              ? handleSubmit(handleUpdatePromotion)
              : handleSubmit(handleCreatePromotion)
          }
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="code"
            >
              Code Promotion
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="code"
              type="text"
              {...register("code", { required: true })}
            />
            {errors.code && (
              <span className="text-red-500">Ce champ est requis</span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="discount"
            >
              Remise (%)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="discount"
              type="number"
              {...register("discount", { required: true })}
            />
            {errors.discount && (
              <span className="text-red-500">Ce champ est requis</span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="startDate"
            >
              Date de début
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="startDate"
              type="date"
              {...register("startDate", { required: true })}
            />
            {errors.startDate && (
              <span className="text-red-500">Ce champ est requis</span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="endDate"
            >
              Date de fin
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="endDate"
              type="date"
              {...register("endDate", { required: true })}
            />
            {errors.endDate && (
              <span className="text-red-500">Ce champ est requis</span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="productIds"
            >
              Produits
            </label>
            <Controller
              control={control}
              name="productIds"
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Sélectionner des produits"
                  {...field}
                  options={productList.map((product) => ({
                    label: product.name,
                    value: product.productID,
                  }))}
                />
              )}
            />
            {errors.productIds && (
              <span className="text-red-500">Ce champ est requis</span>
            )}
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PromotionManagementPage;
