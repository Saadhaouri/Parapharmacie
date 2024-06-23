// pages/ClientManagementPage.tsx

import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import {
  createClient,
  deleteClient,
  getClients,
  updateClient,
} from "../Services/clientServices";
import { Client, CreateClient } from "../Types/ClientType";
import DataTable from "../components/DataTable";

// Validation schema for the client form
const clientSchema = yup.object().shape({
  firstname: yup.string().required("Le prénom est requis"),
  lastName: yup.string().required("Le nom est requis"),
  cin: yup.string().required("Le CIN est requis"),
  phoneNumber: yup.string().required("Le téléphone est requis"),
  email: yup.string().email("Email invalide").required("L'email est requis"),
  address: yup.object().shape({
    nr: yup.number().required("Le numéro est requis"),
    street: yup.string().required("La rue est requise"),
    neighborhood: yup.string().required("Le quartier est requis"),
    city: yup.string().required("La ville est requise"),
  }),
});

const ClientManagementPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [clientList, setClientList] = useState<Client[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateClient>({
    defaultValues: {
      firstname: "",
      lastName: "",
      cin: "",
      phoneNumber: "",
      email: "",
      address: {
        nr: 0,
        street: "",
        neighborhood: "",
        city: "",
      },
    },
    resolver: yupResolver(clientSchema),
  });

  useEffect(() => {
    getClients()
      .then((response) => {
        setClientList(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the clients!", error);
      });
  }, [clientList]);

  const handleCreateClient: SubmitHandler<CreateClient> = async (data, e) => {
    try {
      await createClient(data);
      setIsModalVisible(false);
      message.success("Client ajouté avec succès");
      reset();
    } catch (error) {
      message.error("Erreur lors de l'ajout du client");
      console.error("Failed to create client:", error);
    }
  };

  const handleUpdateClient: SubmitHandler<Client> = async (data) => {
    try {
      await updateClient(data.clientID, data);
      setIsModalVisible(false);
      message.success("Client mis à jour avec succès");
    } catch (error) {
      message.error("Erreur lors de la mise à jour du client");
      console.error("Failed to update client:", error);
    }
  };

  const handleDeleteClient = async (clientId: string) => {
    try {
      await deleteClient(clientId);
      message.success("Client supprimé avec succès");
    } catch (error) {
      message.error("Erreur lors de la suppression du client");
      console.error("Failed to delete client:", error);
    }
  };

  const confirmDelete = (clientId: string) => {
    Modal.confirm({
      title: "Êtes-vous sûr de vouloir supprimer ce client?",
      content: "Cette action ne peut pas être annulée.",
      okText: "Oui",
      okType: "danger",
      cancelText: "Non",
      onOk: () => handleDeleteClient(clientId),
    });
  };

  const showModal = () => {
    setIsEdit(false);
    reset({
      firstname: "",
      lastName: "",
      cin: "",
      phoneNumber: "",
      email: "",
      address: {
        nr: 0,
        street: "",
        neighborhood: "",
        city: "",
      },
    });
    setIsModalVisible(true);
  };

  const showEditModal = (client: Client) => {
    setIsEdit(true);
    reset(client);
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
      accessorKey: "firstname",
      header: "Prénom",
      Cell: ({ cell }) => <span>{cell.getValue()}</span>,
    },
    {
      accessorKey: "lastName",
      header: "Nom",
      Cell: ({ cell }) => <span>{cell.getValue()}</span>,
    },
    {
      accessorKey: "cin",
      header: "CIN",
      Cell: ({ cell }) => <span>{cell.getValue()}</span>,
    },
    {
      accessorKey: "phoneNumber",
      header: "Téléphone",
      Cell: ({ cell }) => <span>{cell.getValue()}</span>,
    },
    {
      accessorKey: "email",
      header: "Email",
      Cell: ({ cell }) => <span>{cell.getValue()}</span>,
    },
    {
      accessorKey: "address",
      header: "Adresse",
      Cell: ({ cell }) => {
        const address = cell.getValue();
        return (
          <span>{`${address.nr} ${address.street}, ${address.neighborhood}, ${address.city}`}</span>
        );
      },
    },
  ];

  return (
    <div className="h-screen overflow-y-auto bg-gray-200">
      <div className="flex items-center justify-between p-2">
        <div className="pl-4 text-left">
          <h1 className="text-1xl font-bold bg-white p-2 rounded shadow-md ">
            Gestion de Clients
          </h1>
        </div>
        <div className="flex items-center justify-end p-4 mx-3">
          <button
            onClick={showModal}
            className="px-6 py-2 flex items-center min-w-[120px] text-center text-white bg-emerald-400 border-emerald-600 shadow-xl hover:shadow rounded active:text-white-500 focus:ring"
          >
            Ajouter client
          </button>
        </div>
      </div>
      <div className="pl-4 pr-2 w-[99%]">
        <DataTable
          data={clientList}
          columns={columns}
          onDelete={(row) => confirmDelete(row.original.clientID)}
          onUpdate={(row) => showEditModal(row.original)}
        />
      </div>
      <Modal
        title={isEdit ? "Modifier le client" : "Ajouter un client"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={isEdit ? "Modifier" : "Ajouter"}
        cancelText="Annuler"
      >
        <form
          onSubmit={handleSubmit((data, e) =>
            isEdit
              ? handleUpdateClient(data as Client)
              : handleCreateClient(data, e)
          )}
          className="space-y-6"
          ref={formRef}
        >
          <Controller
            name="firstname"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                <input
                  {...field}
                  placeholder="Prénom"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                />
                {errors.firstname && (
                  <p className="text-red-500 text-sm">
                    {errors.firstname.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                <input
                  {...field}
                  placeholder="Nom"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="cin"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                <input
                  {...field}
                  placeholder="CIN"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                />
                {errors.cin && (
                  <p className="text-red-500 text-sm">{errors.cin.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                <input
                  {...field}
                  placeholder="Téléphone"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                <input
                  {...field}
                  placeholder="Email"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            name="address.nr"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                <input
                  {...field}
                  placeholder="Numéro"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                />
                {errors.address?.nr && (
                  <p className="text-red-500 text-sm">
                    {errors.address.nr.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="address.street"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                <input
                  {...field}
                  placeholder="Rue"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                />
                {errors.address?.street && (
                  <p className="text-red-500 text-sm">
                    {errors.address.street.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="address.neighborhood"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                <input
                  {...field}
                  placeholder="Quartier"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                />
                {errors.address?.neighborhood && (
                  <p className="text-red-500 text-sm">
                    {errors.address?.neighborhood.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="address.city"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                <input
                  {...field}
                  placeholder="Ville"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                />
                {errors.address?.city && (
                  <p className="text-red-500 text-sm">
                    {errors.address.city.message}
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

export default ClientManagementPage;
