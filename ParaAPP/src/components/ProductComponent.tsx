// import React from "react";
// import { useForm, Controller, SubmitHandler } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import {
//   useGetAllProducts,
//   useCreateProduct,
//   useUpdateProduct,
//   useDeleteProduct,
// } from "../hooks/useProducts1"; // Adjust the import path as necessary
// import Product from "../Types/ProductType";

// const productSchema = yup.object().shape({
//   name: yup.string().required("Name is required"),
//   description: yup.string().required("Description is required"),
//   price: yup
//     .number()
//     .required("Price is required")
//     .positive("Price must be positive"),
//   quantity: yup
//     .number()
//     .required("Quantity is required")
//     .integer("Quantity must be an integer")
//     .min(0, "Quantity must be at least 0"),
//   categoryID: yup.string().required("Category ID is required"),
//   dateExp: yup
//     .date()
//     .required("Expiration date is required")
//     .typeError("Invalid date format"),
// });

// const ProductForm: React.FC<{
//   onSubmit: SubmitHandler<Product>;
//   defaultValues: Partial<Product>;
//   buttonLabel: string;
// }> = ({ onSubmit, defaultValues, buttonLabel }) => {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<Product>({
//     defaultValues,
//     resolver: yupResolver(productSchema),
//   });

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       <Controller
//         name="name"
//         control={control}
//         render={({ field }) => (
//           <div>
//             <input {...field} placeholder="Product Name" className="input" />
//             {errors.name && (
//               <p className="text-red-500">{errors.name.message}</p>
//             )}
//           </div>
//         )}
//       />
//       <Controller
//         name="description"
//         control={control}
//         render={({ field }) => (
//           <div>
//             <input
//               {...field}
//               placeholder="Product Description"
//               className="input"
//             />
//             {errors.description && (
//               <p className="text-red-500">{errors.description.message}</p>
//             )}
//           </div>
//         )}
//       />
//       <Controller
//         name="price"
//         control={control}
//         render={({ field }) => (
//           <div>
//             <input
//               {...field}
//               type="number"
//               placeholder="Product Price"
//               className="input"
//             />
//             {errors.price && (
//               <p className="text-red-500">{errors.price.message}</p>
//             )}
//           </div>
//         )}
//       />
//       <Controller
//         name="quantity"
//         control={control}
//         render={({ field }) => (
//           <div>
//             <input
//               {...field}
//               type="number"
//               placeholder="Product Quantity"
//               className="input"
//             />
//             {errors.quantity && (
//               <p className="text-red-500">{errors.quantity.message}</p>
//             )}
//           </div>
//         )}
//       />
//       <Controller
//         name="categoryID"
//         control={control}
//         render={({ field }) => (
//           <div>
//             <input {...field} placeholder="Category ID" className="input" />
//             {errors.categoryID && (
//               <p className="text-red-500">{errors.categoryID.message}</p>
//             )}
//           </div>
//         )}
//       />
//       <Controller
//         name="dateExp"
//         control={control}
//         render={({ field }) => (
//           <div>
//             <input
//               {...field}
//               type="date"
//               placeholder="Expiration Date"
//               className="input"
//             />
//             {errors.dateExp && (
//               <p className="text-red-500">{errors.dateExp.message}</p>
//             )}
//           </div>
//         )}
//       />
//       <button
//         type="submit"
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         {buttonLabel}
//       </button>
//     </form>
//   );
// };

// const ProductComponent: React.FC = () => {
//   const { products, loading, error } = useGetAllProducts();
//   const { create } = useCreateProduct();
//   const { update } = useUpdateProduct();
//   const { remove } = useDeleteProduct();

//   const handleCreateProduct: SubmitHandler<Product> = async (data) => {
//     try {
//       await create(data);
//     } catch (error) {
//       console.error("Failed to create product:", error);
//     }
//   };

//   const handleUpdateProduct: SubmitHandler<Product> = async (data) => {
//     try {
//       await update(data.productID, data);
//     } catch (error) {
//       console.error("Failed to update product:", error);
//     }
//   };

//   const handleDeleteProduct = async (id: string) => {
//     try {
//       await remove(id);
//     } catch (error) {
//       console.error("Failed to delete product:", error);
//     }
//   };

//   if (loading) return <div className="text-center">Loading...</div>;
//   if (error) return <div className="text-red-500">Error: {error.message}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Products</h1>
//       <ul className="list-disc pl-5">
//         {products.map((product) => (
//           <li key={product.productID} className="mb-2">
//             <div className="flex justify-between items-center">
//               <span>{product.name}</span>
//               <button
//                 className="bg-red-500 text-white px-2 py-1 rounded ml-2"
//                 onClick={() => handleDeleteProduct(product.productID)}
//               >
//                 Delete
//               </button>
//             </div>
//             <div>{product.description}</div>
//             <div>{product.price}</div>
//             <div>{product.quantity}</div>
//             <div>{product.dateExp}</div>
//           </li>
//         ))}
//       </ul>
//       <div className="mt-4">
//         <h2 className="text-xl font-semibold mb-2">Create Product</h2>
//         <ProductForm
//           onSubmit={handleCreateProduct}
//           defaultValues={{
//             name: "",
//             description: "",
//             price: 0,
//             quantity: 0,
//             categoryID: "",
//             dateExp: "",
//           }}
//           buttonLabel="Create"
//         />
//       </div>
//       <div className="mt-4">
//         <h2 className="text-xl font-semibold mb-2">Update Product</h2>
//         <ProductForm
//           onSubmit={handleUpdateProduct}
//           defaultValues={{
//             productID: "",
//             name: "",
//             description: "",
//             price: 0,
//             quantity: 0,
//             categoryID: "",
//             dateExp: "",
//           }}
//           buttonLabel="Update"
//         />
//       </div>
//     </div>
//   );
// };

// export default ProductComponent;
