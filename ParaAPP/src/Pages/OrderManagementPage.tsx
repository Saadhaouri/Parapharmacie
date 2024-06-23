import { Modal, message, Select } from "antd"; // Import Select from antd
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import DataTable from "../components/DataTable";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import {
  createOrder,
  deleteOrder,
  updateOrder,
} from "../Services/orderService";
import { CreateOrder, Order } from "../Types/OrderTypes";
import { Supplier } from "../Types/SupplierType"; // Assuming you have Supplier type
import { Client } from "../Types/ClientType"; // Assuming you have Client type
import { Product } from "../Types/ProductType";

// Validation schema for the order form
const orderSchema = yup.object().shape({
  supplierId: yup.string().required("Le fournisseur est requis"),
  totalAmount: yup.number().required("Le montant total est requis").positive(),
  status: yup.string().required("Le statut est requis"),
  clientId: yup.string().required("Le client est requis"),
  productIds: yup.array().of(yup.string()).required("Les produits sont requis"),
});

const OrderManagementPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [orderList, setOrderList] = useState<Order[]>([]);
  const [supplierList, setSupplierList] = useState<Supplier[]>([]);
  const [clientList, setClientList] = useState<Client[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Order | CreateOrder>({
    defaultValues: {},
    resolver: yupResolver(orderSchema),
  });

  useEffect(() => {
    axios
      .get("https://localhost:7016/api/Order")
      .then((response) => {
        setOrderList(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the orders!", error);
      });

    axios
      .get("https://localhost:7016/api/Supplier")
      .then((response) => {
        setSupplierList(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the suppliers!", error);
      });

    axios
      .get("https://localhost:7016/api/Client")
      .then((response) => {
        setClientList(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the clients!", error);
      });

    axios
      .get("https://localhost:7016/api/Product") // Fetch products data
      .then((response) => {
        setProductList(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, [orderList]);

  const handleCreateOrder: SubmitHandler<CreateOrder> = async (data, e) => {
    const formattedData = {
      ...data,
      supplierId: data.supplierId, // Assuming the IDs are already GUIDs
      clientId: data.clientId,
      productIds: data.productIds,
    };

    try {
      await createOrder(formattedData);
      setIsModalVisible(false); // Close the modal upon successful creation
      message.success("Commande ajoutée avec succès");
      reset(); // Reset the form fields
      e?.target.reset(); // Reset the form fields
    } catch (error) {
      message.error("Erreur lors de l'ajout de la commande");
      console.error("Failed to create order:", error);
    }
  };

  const handleUpdateOrder: SubmitHandler<Order> = async (data) => {
    const formattedData = {
      ...data,
      supplierId: data.supplierId, // Assuming the IDs are already GUIDs
      clientId: data.clientId,
      productIds: data.productIds,
    };

    try {
      await updateOrder(data.orderID, formattedData);
      setIsModalVisible(false); // Close the modal upon successful update
      message.success("Commande mise à jour avec succès");
    } catch (error) {
      message.error("Erreur lors de la mise à jour de la commande");
      console.error("Failed to update order:", error);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    try {
      await deleteOrder(orderId);
      message.success("Commande supprimée avec succès");
    } catch (error) {
      message.error("Erreur lors de la suppression de la commande");
      console.error("Failed to delete order:", error);
    }
  };

  const confirmDelete = (orderId: string) => {
    Modal.confirm({
      title: "Êtes-vous sûr de vouloir supprimer cette commande?",
      content: "Cette action ne peut pas être annulée.",
      okText: "Oui",
      okType: "danger",
      cancelText: "Non",
      onOk: () => handleDeleteOrder(orderId),
    });
  };

  const showModal = () => {
    setIsEdit(false);
    reset({}); // Reset form fields when creating a new order
    setIsModalVisible(true);
  };

  const showEditModal = (order: Order) => {
    setIsEdit(true);
    reset(order); // Set form fields with the order data for editing
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

  const getSupplierName = (supplierID: string) => {
    const supplier = supplierList.find((s) => s.supplierId === supplierID);
    return supplier ? supplier.name : "Unknown";
  };

  const getClientName = (clientID: string) => {
    const client = clientList.find((c) => c.clientID === clientID);
    return client ? client.firstname + " " + client.lastName : "Unknown";
  };

  const columns = [
    {
      accessorKey: "supplierId",
      header: "Fournisseur",
      Cell: ({ cell }) => <span>{getSupplierName(cell.getValue())}</span>,
    },
    {
      accessorKey: "totalAmount",
      header: "Montant Total",
      Cell: ({ cell }) => <span>{cell.getValue()}</span>,
    },
    {
      accessorKey: "status",
      header: "Statut",
      Cell: ({ cell }) => <span>{cell.getValue()}</span>,
    },
    {
      accessorKey: "clientId",
      header: "Client",
      Cell: ({ cell }) => <span>{getClientName(cell.getValue())}</span>,
    },
    {
      accessorKey: "productIds",
      header: "Produits",
      Cell: ({ cell }) => {
        const productNames = cell.getValue().map((productId) => {
          const product = productList.find(
            (product) => product.productID === productId
          );
          return product ? product.name : "Inconnu";
        });
        return <span>{productNames.join("-/ ")}</span>;
      },
    },
  ];

  return (
    <div className="h-screen overflow-y-auto bg-gray-200">
      <div className=" flex items-center justify-between p-3">
        <h1 className="text-1xl font-bold bg-white p-2 rounded shadow-md ">
          Gestion des Commandes
        </h1>
        <button
          onClick={showModal}
          className="px-6 py-2 flex items-center min-w-[120px] text-center text-white bg-emerald-400 border-emerald-600 shadow-xl hover:shadow rounded active:text-white-500 focus:ring"
        >
          Ajouter commande
        </button>
      </div>
      <div className="flex items-center justify-end p-4 mx-3"></div>
      <div className="pl-4 pr-2 w-[99%]">
        <DataTable
          data={orderList}
          columns={columns}
          onDelete={(row) => confirmDelete(row.original.orderID)}
          onUpdate={(row) => showEditModal(row.original)}
        />
      </div>
      <Modal
        title={isEdit ? "Modifier la commande" : "Ajouter une commande"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={isEdit ? "Modifier" : "Ajouter"}
        cancelText="Annuler"
      >
        <form
          onSubmit={handleSubmit((data, e) =>
            isEdit ? handleUpdateOrder(data) : handleCreateOrder(data, e)
          )}
          className="space-y-6"
          ref={formRef}
        >
          <Controller
            name="supplierId"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                <select
                  {...field}
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                >
                  <option value="">Sélectionner un fournisseur</option>
                  {supplierList.map((supplier) => (
                    <option
                      key={supplier.supplierId}
                      value={supplier.supplierId}
                    >
                      {supplier.name}
                    </option>
                  ))}
                </select>
                {errors.supplierId && (
                  <p className="text-red-500 text-sm">
                    {errors.supplierId.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="totalAmount"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                <input
                  {...field}
                  placeholder="Montant Total"
                  type="number"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                />
                {errors.totalAmount && (
                  <p className="text-red-500 text-sm">
                    {errors.totalAmount.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                <Select
                  {...field}
                  placeholder="Statut"
                  className="w-full border border-gray-300 p-2 rounded-md focus:border-blue-500"
                >
                  <Select.Option value="Terminé">Terminé</Select.Option>
                  <Select.Option value="Non terminé">Non terminé</Select.Option>
                </Select>
                {errors.status && (
                  <p className="text-red-500 text-sm">
                    {errors.status.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="clientId"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                <select
                  {...field}
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                >
                  <option value="">Sélectionner un client</option>
                  {clientList.map((client) => (
                    <option key={client.clientID} value={client.clientID}>
                      {client.firstname} {client.lastName}
                    </option>
                  ))}
                </select>
                {errors.clientId && (
                  <p className="text-red-500 text-sm">
                    {errors.clientId.message}
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
                  className="w-full border border-gray-300 p-2 rounded-md focus:border-blue-500"
                  onChange={(value) => field.onChange(value)}
                  value={field.value || []}
                >
                  {productList.map((product) => (
                    <Select.Option
                      key={product.productID}
                      value={product.productID}
                    >
                      {product.name}
                    </Select.Option>
                  ))}
                </Select>
                {errors.productIds && (
                  <p className="text-red-500 text-sm">
                    {errors.productIds.message}
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

export default OrderManagementPage;
