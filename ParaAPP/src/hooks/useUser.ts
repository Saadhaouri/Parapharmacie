import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Make sure you have jwt-decode installed
import axios from "axios";

interface DecodedToken {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
}

const fetchUserData = async (userId: string) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token not found");
  }

  const response = await axios.get(`http://localhost:88/User/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

const useUser = () => {
  const [userAuth, setUserAuth] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Token not found");
        }

        const decodedToken: DecodedToken = jwtDecode(token);
        const userId =
          decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
          ];

        const data = await fetchUserData(userId);
        setUserAuth(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  return { userAuth, loading, error };
};

export default useUser;
