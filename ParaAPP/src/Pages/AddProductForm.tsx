// Import React, React Hook Form, and Axios
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

// Define the product data interface
interface ProductData {
  Name: string;
  Description: string;
  price: number;
  quantity: number;
  categoryId: string; // Assuming categoryId is a string representation of Guid
  dateExp: string; // Format as ISO string (YYYY-MM-DDTHH:mm:ssZ)
}

// Extend the FormData interface to include the product data
interface FormData extends ProductData {}

const AddProductForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      // Make an HTTP POST request to your API endpoint
      const response = await axios.post(
        "https://localhost:7016/api/Product",
        data
      );
      console.log("Product added successfully:", response.data);
      // You can add further actions, like resetting the form or showing a success message
    } catch (error) {
      console.error("Error adding product:", error);
      // Handle error appropriately, e.g., show an error message
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name:
        </label>
        <input
          {...register("Name", { required: "Name is required" })}
          id="name"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.Name && (
          <span className="text-red-600 mt-1">{errors.Name.message}</span>
        )}
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description:
        </label>
        <textarea
          {...register("Description", { required: "Description is required" })}
          id="description"
          rows={4}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></textarea>
        {errors.Description && (
          <span className="text-red-600 mt-1">
            {errors.Description.message}
          </span>
        )}
      </div>
      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price:
        </label>
        <input
          type="number"
          {...register("price", { required: "Price is required" })}
          id="price"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.price && (
          <span className="text-red-600 mt-1">{errors.price.message}</span>
        )}
      </div>
      <div>
        <label
          htmlFor="quantity"
          className="block text-sm font-medium text-gray-700"
        >
          Quantity:
        </label>
        <input
          type="number"
          {...register("quantity", { required: "Quantity is required" })}
          id="quantity"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.quantity && (
          <span className="text-red-600 mt-1">{errors.quantity.message}</span>
        )}
      </div>
      <div>
        <label
          htmlFor="categoryId"
          className="block text-sm font-medium text-gray-700"
        >
          Category ID:
        </label>
        <input
          {...register("categoryId", { required: "Category ID is required" })}
          id="categoryId"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.categoryId && (
          <span className="text-red-600 mt-1">{errors.categoryId.message}</span>
        )}
      </div>
      <div>
        <label
          htmlFor="dateExp"
          className="block text-sm font-medium text-gray-700"
        >
          Expiry Date:
        </label>
        <input
          type="datetime-local"
          {...register("dateExp", { required: "Expiry date is required" })}
          id="dateExp"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.dateExp && (
          <span className="text-red-600 mt-1">{errors.dateExp.message}</span>
        )}
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;
