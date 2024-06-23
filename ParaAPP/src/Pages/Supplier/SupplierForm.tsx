import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import Supplier from "../../Types/SupplierType";

// Validation schema for the supplier form
const supplierSchema = yup.object().shape({
  name: yup.string().required("Le nom est requis"),
  contactPerson: yup.string().required("Les coordonnées sont requises"),
  email: yup.string().required("L'email est requise"),
  phone: yup.string().required("Tele est requise"),
  // Add other validations as necessary
});

const SupplierForm: React.FC<{
  onSubmit: SubmitHandler<Supplier>;
  defaultValues: Partial<Supplier>;
  buttonLabel: string;
  formRef: React.RefObject<HTMLFormElement>;
}> = ({ onSubmit, defaultValues, formRef }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Supplier>({
    defaultValues,
    resolver: yupResolver(supplierSchema),
  });

  return (
    <form
      onSubmit={handleSubmit((data, e) => onSubmit(data, e))}
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
              placeholder="phone"
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
  );
};

export default SupplierForm;
