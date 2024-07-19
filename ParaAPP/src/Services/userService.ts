import axios from "axios";

const API_URL_ChangePassword =
  "http://localhost:88/Account/changepassword";

interface ChangePassword {
  userId: string;
  currentPassword: string;
  newPassword: string;
}

export const changePassword = async (changePassword: ChangePassword) => {
  try {
    const response = await axios.post(API_URL_ChangePassword, changePassword);
    return response.data;
  } catch (error) {
    // Handle error responses from the API
    throw error;
  }
};
