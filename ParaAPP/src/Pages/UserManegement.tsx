import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Modal, message } from "antd";
import { GiCottonFlower } from "react-icons/gi";
import { changePassword } from "../Services/userService";
import useUser from "../hooks/useUser";
import { FaUserLock } from "react-icons/fa";
import StockAlerts from "./Dashboard/StockAlerts";

// Define the interface for the form data
interface FormData {
  currentPassword: string;
  newPassword: string;
}

// Define the interface for the change password service response
interface ChangePasswordResponse {
  message: string;
}

// Define the interface for the change password data sent to the server
interface ChangePasswordData {
  userId: string;
  currentPassword: string;
  newPassword: string;
}

// Define the validation schema using Yup
const validationSchema = yup.object({
  currentPassword: yup.string().required("Please enter your current password"),
  newPassword: yup
    .string()
    .required("Please enter a new password")
    .min(8, "Password must be at least 8 characters long"),
});

const UserManagement: React.FC = () => {
  const { userAuth, loading, error } = useUser();
  const [modalVisible, setModalVisible] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const onSubmit = async (formData: FormData) => {
    try {
      const changePasswordData: ChangePasswordData = {
        userId: userAuth?.id || "",
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      };

      const response: ChangePasswordResponse = await changePassword(
        changePasswordData
      );
      // console.log("Password changed successfully:", response);
      message.success(response.message);
      reset();
      setModalVisible(false);
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="grid grid-cols-10 gap-8">
        {/* Left Sidebar */}
        <div className="col-span-3 bg-white rounded-lg shadow-md overflow-hidden">
          <StockAlerts />
        </div>

        {/* Main Content */}
        <div className="col-span-7 space-y-8">
          <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative bg-indigo-600 rounded-t-lg overflow-hidden">
              <GiCottonFlower className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl text-white" />
            </div>
            <div className="p-8">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-indigo-500 flex items-center justify-center text-4xl font-bold text-white mb-4">
                  {userAuth?.firstName.charAt(0)}
                  {userAuth?.lastName.charAt(0)}
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {userAuth?.firstName} {userAuth?.lastName}
                </h1>
                <p className="text-gray-600">{userAuth?.email}</p>
              </div>
              <div className="mt-4">
                <div className=" flex justify-between items-center ">
                  <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                    User Information
                  </h2>
                  <button
                    className="p-3  text-black bg-gray-100 rounded-full "
                    onClick={showModal}
                  >
                    <FaUserLock />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-800">
                    <span className="font-medium">Username:</span>
                    <span>{userAuth?.userName}</span>
                  </div>
                  <div className="flex justify-between text-gray-800">
                    <span className="font-medium">Email:</span>
                    <span>{userAuth?.email}</span>
                  </div>
                  <div className="flex justify-between text-gray-800">
                    <span className="font-medium">Birthday:</span>
                    <span>{userAuth?.birthday}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Top selling products */}
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Modal
                title="Change Password"
                visible={modalVisible}
                onCancel={handleCancel}
                footer={null}
              >
                <div className="p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    mode passe actuel
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                    {...register("currentPassword")}
                  />
                  {errors.currentPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.currentPassword.message}
                    </p>
                  )}

                  <label className="block text-sm font-medium text-gray-700 mt-4 mb-2">
                    nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                    {...register("newPassword")}
                  />
                  {errors.newPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.newPassword.message}
                    </p>
                  )}

                  <div className="mt-4">
                    <Button
                      type="primary"
                      onClick={handleSubmit(onSubmit)}
                      className="w-full"
                    >
                      Change Password
                    </Button>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
