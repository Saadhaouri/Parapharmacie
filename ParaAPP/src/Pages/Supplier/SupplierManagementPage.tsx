import { Modal, message } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import {
  createSupplier,
  deleteSupplier,
  updateSupplier,
} from "../../Services/supplierServices";
import Supplier from "../../Types/SupplierType";
import DataTable from "../../components/DataTable";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

// Validation schema for the supplier form
const supplierSchema = yup.object().shape({
  name: yup.string().required("Le nom est requis"),
  contactPerson: yup.string().required("Les coordonnées sont requises"),
  email: yup.string().required("L'email est requise"),
  phone: yup.string().required("Téléphone est requis"),
  // Add other validations as necessary
});

const SupplierManagementPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [supplierList, setSupplierList] = useState<Supplier[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Supplier>({
    defaultValues: {},
    resolver: yupResolver(supplierSchema),
  });

  useEffect(() => {
    axios
      .get("https://localhost:7016/api/Supplier")
      .then((response) => {
        setSupplierList(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the suppliers!", error);
      });
  }, [supplierList]);

  const handleCreateSupplier: SubmitHandler<Supplier> = async (data, e) => {
    try {
      await createSupplier(data);
      setIsModalVisible(false); // Close the modal upon successful creation
      message.success("Fournisseur ajouté avec succès");
      reset(); // Reset the form fields
      e?.target.reset(); // Reset the form fields
    } catch (error) {
      message.error("Erreur lors de l'ajout du fournisseur");
      console.error("Failed to create supplier:", error);
    }
  };

  const handleUpdateSupplier: SubmitHandler<Supplier> = async (data) => {
    try {
      await updateSupplier(data.supplierId, data);
      setIsModalVisible(false); // Close the modal upon successful update
      message.success("Fournisseur mis à jour avec succès");
    } catch (error) {
      message.error("Erreur lors de la mise à jour du fournisseur");
      console.error("Failed to update supplier:", error);
    }
  };

  const handleDeleteSupplier = async (supplierId: string) => {
    try {
      await deleteSupplier(supplierId);
      message.success("Fournisseur supprimé avec succès");
    } catch (error) {
      message.error("Erreur lors de la suppression du fournisseur");
      console.error("Failed to delete supplier:", error);
    }
  };

  const confirmDelete = (supplierId: string) => {
    Modal.confirm({
      title: "Êtes-vous sûr de vouloir supprimer ce fournisseur?",
      content: "Cette action ne peut pas être annulée.",
      okText: "Oui",
      okType: "danger",
      cancelText: "Non",
      onOk: () => handleDeleteSupplier(supplierId),
    });
  };

  const showModal = () => {
    setIsEdit(false);
    reset({}); // Reset form fields when creating a new supplier
    setIsModalVisible(true);
  };

  const showEditModal = (supplier: Supplier) => {
    setIsEdit(true);
    reset(supplier); // Set form fields with the supplier data for editing
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
      Cell: ({ cell }) => <span>{cell.getValue()}</span>,
    },
    {
      accessorKey: "contactPerson",
      header: "Coordonnées",
      Cell: ({ cell }) => <span>{cell.getValue()}</span>,
    },
    {
      accessorKey: "email",
      header: "Email",
      Cell: ({ cell }) => <span>{cell.getValue()}</span>,
    },
    {
      accessorKey: "phone",
      header: "Téléphone",
      Cell: ({ cell }) => <span>{cell.getValue()}</span>,
    },
  ];

  return (
    <div className="h-screen overflow-y-auto bg-gray-200">
      <div className="flex items-center justify-between p-2  ">
        <div className="pl-4 text-left">
          <h1 className="text-3xl font-bold ">Gestion de Fournisseurs</h1>
        </div>
        <div className="flex items-center justify-end p-4 mx-3">
          <button
            onClick={showModal}
            className="px-6 py-2 flex items-center min-w-[120px] text-center text-white bg-emerald-400 border-emerald-600 shadow-xl hover:shadow rounded active:text-white-500 focus:ring"
          >
            Ajouter fournisseur
          </button>
        </div>
      </div>
      <div className="pl-4 pr-2 w-[99%]">
        <DataTable
          data={supplierList}
          columns={columns}
          onDelete={(row) => confirmDelete(row.original.supplierId)}
          onUpdate={(row) => showEditModal(row.original)}
        />
      </div>
      <Modal
        title={isEdit ? "Modifier le fournisseur" : "Ajouter un fournisseur"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={isEdit ? "Modifier" : "Ajouter"}
        cancelText="Annuler"
      >
        <form
          onSubmit={handleSubmit((data, e) =>
            isEdit ? handleUpdateSupplier(data) : handleCreateSupplier(data, e)
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
                  placeholder="Nom du fournisseur"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            name="contactPerson"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                <input
                  {...field}
                  placeholder="Coordonnées"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                />
                {errors.contactPerson && (
                  <p className="text-red-500 text-sm">
                    {errors.contactPerson.message}
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
                  placeholder="Adresse"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                <input
                  {...field}
                  placeholder="Téléphone"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
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

export default SupplierManagementPage;
