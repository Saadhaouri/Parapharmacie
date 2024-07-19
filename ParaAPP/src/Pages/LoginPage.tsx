import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { message } from "antd";
import authStore from "../auth/authStore";
import useUser from "../hooks/useUser";
import { GiCottonFlower } from "react-icons/gi";

interface LoginForm {
  usernameOrEmail: string;
  password: string;
  rememberMe: boolean;
}

const LoginPage: React.FC = () => {
  // const isAuthenticated = authStore((state) => state.isAuth);
  const LogUser = authStore((state) => state.logIn);
  const navigate = useNavigate();
  const { userAuth } = useUser();
  const [loginForm, setLoginForm] = useState<LoginForm>({
    usernameOrEmail: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginForm((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:88/Account/login",
        loginForm
      );

      // console.log("Connexion réussie !", response.data);
      localStorage.setItem("token", response.data.token);

      if (loginForm.rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }

      LogUser();
      navigate("/");
      message.success(
        "Bienvenue " + userAuth.firstName + " " + userAuth.lastName
      );
    } catch (error) {
      console.error("Échec de la connexion :", error);
      setErrorMessage("Nom d'utilisateur ou mot de passe incorrect");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gradient-to-r from-emerald-500 to-emerald-600">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <div className="flex justify-center items-center">
          <GiCottonFlower className="text-[36px] text-emerald-500 mr-2" />
          <strong className="text-emerald-500 text-lg font-semibold">
            YOUSMALA
          </strong>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Adresse email
            </label>
            <input
              type="email"
              id="email"
              name="usernameOrEmail"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="votre@email.com"
              value={loginForm.usernameOrEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Mot de passe
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Entrez votre mot de passe"
              value={loginForm.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 py-2 text-sm text-gray-600 hover:text-indigo-500 focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "Cacher" : "Afficher"}
            </button>
            <Link
              to="/forgot-password"
              className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Mot de passe oublié ?
            </Link>
          </div>
          {errorMessage && (
            <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
          )}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="rememberMe"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none"
                checked={loginForm.rememberMe}
                onChange={handleChange}
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
              >
                Se souvenir de moi
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
