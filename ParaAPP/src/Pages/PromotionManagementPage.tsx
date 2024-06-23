import { Modal, message, Select } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import {
  createPromotion,
  deletePromotion,
  updatePromotion,
  getAllPromotions,
} from "../Services/promotionServices";
import { CreatePromotion, Promotion } from "../Types/Promotion";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Product from "../Types/ProductType";

// Validation schema for the promotion form
const promotionSchema = yup.object().shape({
  code: yup.string().required("Le code est requis"),
  discount: yup
    .number()
    .required("Le pourcentage de réduction est requis")
    .positive(),
  startDate: yup.date().required("La date de début est requise"),
  endDate: yup
    .date()
    .required("La date de fin est requise")
    .min(
      yup.ref("startDate"),
      "La date de fin doit être après la date de début"
    ),
  productIds: yup.array().of(yup.string()).required("Les produits sont requis"),
});

const formatDate = (date: string) => {
  const d = new Date(date);
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const day = `0${d.getDate()}`.slice(-2);
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

const PromotionManagementPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(
    null
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [promotionList, setPromotionList] = useState<Promotion[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Promotion | CreatePromotion>({
    defaultValues: {},
    resolver: yupResolver(promotionSchema),
  });

  useEffect(() => {
    // Fetch promotions and products on component mount
    const fetchPromotions = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7016/api/Promotion"
        );
        setPromotionList(response.data);
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://localhost:7016/api/Product");
        setProductList(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchPromotions();
    fetchProducts();
  }, []);

  const handleCreatePromotion: SubmitHandler<CreatePromotion> = async (
    data,
    e
  ) => {
    try {
      await createPromotion(data);
      setIsModalVisible(false);
      message.success("Promotion ajoutée avec succès");
      reset();
      e?.target.reset();
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
        <div className="p-4 m-4 bg-white rounded-lg shadow-md h-72">
          <h2 className="text-xl font-semibold mb-4 text-center ">
            {selectedPromotion.code}
          </h2>

          <ul className="flex flex-wrap items-center gap-4">
            {selectedPromotion.productIds.map((productId) => {
              const product = getProductDetails(productId);
              return (
                product && (
                  <div
                    key={product.productID}
                    className="w-full max-w-xs h-30 bg-gray-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
                  >
                    <div className="px-4 py-2 overflow-hidden flex-1">
                      <h3 className="text-gray-800 font-bold text-lg truncate">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 truncate">
                        {product.description}
                      </p>
                    </div>
                    <div className="px-4 py-2 flex justify-end items-center">
                      <span>
                        <span className="text-gray-900 font-semibold">
                          Prix :
                        </span>
                        <span className="text-gray-900">
                          {product.price} dh
                        </span>
                      </span>
                    </div>
                  </div>
                )
              );
            })}
          </ul>
        </div>
      )}
      <Modal
        title={isEdit ? "Modifier la promotion" : "Ajouter une promotion"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={isEdit ? "Modifier" : "Ajouter"}
        cancelText="Annuler"
      >
        <form
          onSubmit={handleSubmit(
            isEdit ? handleUpdatePromotion : handleCreatePromotion
          )}
          className="space-y-6"
          ref={formRef}
        >
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                <input
                  {...field}
                  placeholder="Code"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                />
                {errors.code && (
                  <p className="text-red-500 text-sm">{errors.code.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            name="discount"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                <input
                  {...field}
                  placeholder="Réduction (%)"
                  type="number"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                />
                {errors.discount && (
                  <p className="text-red-500 text-sm">
                    {errors.discount.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                <input
                  {...field}
                  placeholder="Date de début"
                  type="date"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                />
                {errors.startDate && (
                  <p className="text-red-500 text-sm">
                    {errors.startDate.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                <input
                  {...field}
                  placeholder="Date de fin"
                  type="date"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                />
                {errors.endDate && (
                  <p className="text-red-500 text-sm">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="productIds"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                <Select
                  {...field}
                  mode="multiple"
                  placeholder="Sélectionner des produits"
                  className="w-full"
                  options={productList.map((product) => ({
                    label: product.name,
                    value: product.productID,
                  }))}
                />
                {errors.productIds && (
                  <p className="text-red-500 text-sm">
                    {errors.productIds.message}
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

export default PromotionManagementPage;
