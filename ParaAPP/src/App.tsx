import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/layout/Header";
import SideMenu from "./components/layout/SideMenu";
import DashboardPage from "./Pages/Dashboard/DashboardPage";
import ClientManagementPage from "./Pages/ClientManagementPage";
import CategoryManagementPage from "./Pages/CategoryManagementPage";
import ProductManagementPage from "./Pages/Products/ProductManagementPage";
import OrderManagementPage from "./Pages/OrderManagementPage";
import UserManegement from "./Pages/UserManegement";
import SupplierManagementPage from "./Pages/Supplier/SupplierManagementPage";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StockManagement from "./Pages/StockManegement";
import PromotionManagementPage from "./Pages/PromotionManagementPage";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col h-screen">
        {/* Wrap your app with QueryClientProvider */}
        <Router>
          <Header />
          <div className="flex flex-1 overflow-hidden">
            <SideMenu />
            <main className="flex-1 overflow-y-auto bg-gray-100">
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/profile" element={<UserManegement />} />
                <Route path="/order" element={<OrderManagementPage />} />
                <Route path="/clients" element={<ClientManagementPage />} />
                <Route path="/supplier" element={<SupplierManagementPage />} />
                <Route
                  path="/categories"
                  element={<CategoryManagementPage />}
                />
                <Route path="/products" element={<ProductManagementPage />} />
                <Route path="/stock" element={<StockManagement />} />
                <Route
                  path="/promotions"
                  element={<PromotionManagementPage />}
                />
                <Route path="/orders" element={<OrderManagementPage />} />
              </Routes>
            </main>
          </div>
        </Router>
        <ToastContainer />
        <ReactQueryDevtools />
      </div>
    </QueryClientProvider>
  );
}

export default App;
