import { yupResolver } from "@hookform/resolvers/yup";
import { Delete } from "@mui/icons-material";
import { Input, Modal, Select, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaCalendarAlt, FaCalendarDay, FaCalendarWeek } from "react-icons/fa";
import * as yup from "yup";
import {
  addSale,
  deleteAllSales,
  getAllProducts,
  getAllSales,
  getDailySales,
  getMonthlySales,
  getTotalDailyProfit,
  getTotalMonthlyProfit,
  getTotalWeeklyProfit,
  getWeeklySales,
} from "../Services/salesService";
import { AddSale } from "../Types/SaleTypes";

interface Product {
  productID: string;
  name: string;
}

interface Sale {
  productId: string;
  quantity: number;
  saleDate: string;
  id: string;
  price: number;
  profit: number;
}

const SalesComponent: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [dailySales, setDailySales] = useState<Sale[]>([]);
  const [weeklySales, setWeeklySales] = useState<Sale[]>([]);
  const [monthlySales, setMonthlySales] = useState<Sale[]>([]);
  const [allSales, setAllSales] = useState<Sale[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [dailyProfit, setDailyProfit] = useState(0);
  const [weeklyProfit, setWeeklyProfit] = useState(0);
  const [monthlyProfit, setMonthlyProfit] = useState(0);

  const schema = yup.object().shape({
    productID: yup.string().required("Product ID is required"),
    quantity: yup
      .number()
      .required("Quantity is required")
      .positive()
      .integer(),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddSale>({
    resolver: yupResolver(schema),
  });

  const fetchSalesData = async () => {
    try {
      const daily = await getDailySales();
      const weekly = await getWeeklySales();
      const monthly = await getMonthlySales();
      const all = await getAllSales();
      setDailySales(daily);
      setWeeklySales(weekly);
      setMonthlySales(monthly);
      setAllSales(all);
    } catch (error) {
      message.error("Failed to fetch sales data");
    }
  };

  const fetchProfitData = async () => {
    try {
      const dailyProfit = await getTotalDailyProfit();
      const weeklyProfit = await getTotalWeeklyProfit();
      const monthlyProfit = await getTotalMonthlyProfit();
      setDailyProfit(dailyProfit);
      setWeeklyProfit(weeklyProfit);
      setMonthlyProfit(monthlyProfit);
    } catch (error) {
      message.error("Failed to fetch profit data");
    }
  };

  const fetchProducts = async () => {
    try {
      const products = await getAllProducts();
      setProducts(products);
    } catch (error) {
      message.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchSalesData();
    fetchProfitData();
    fetchProducts();
  }, []);

  const onSubmit = async (data: AddSale) => {
    try {
      await addSale(data);
      message.success("Sale added successfully");
      setIsModalVisible(false);
      reset();
      fetchSalesData();
      fetchProfitData();
    } catch {
      message.error("Failed to add sale");
    }
  };

  const handleDeleteAllSales = async () => {
    try {
      await deleteAllSales();
      message.success("All sales deleted successfully");
      setIsDeleteModalVisible(false);
      fetchSalesData();
    } catch {
      message.error("Failed to delete sales");
    }
  };

  const getProductWithMostSales = () => {
    const allSales = [...dailySales, ...weeklySales, ...monthlySales];
    const productSalesCount: { [key: string]: number } = allSales.reduce(
      (acc, sale) => {
        if (!acc[sale.productId]) {
          acc[sale.productId] = 0;
        }
        acc[sale.productId] += sale.quantity;
        return acc;
      },
      {} as { [key: string]: number }
    );

    const mostSoldProductId = Object.keys(productSalesCount).reduce(
      (a, b) => (productSalesCount[a] > productSalesCount[b] ? a : b),
      ""
    );

    const mostSoldProduct = products.find(
      (p) => p.productID === mostSoldProductId
    );
    return mostSoldProduct
      ? {
          name: mostSoldProduct.name,
          count: productSalesCount[mostSoldProductId],
        }
      : { name: "Unknown", count: 0 };
  };

  const mostSoldProduct = getProductWithMostSales();

  const columns = [
    {
      title: "Product Name",
      dataIndex: "productId",
      key: "productId",
      render: (productId: string) => {
        const product = products.find((p) => p.productID === productId);
        return product ? product.name : "Unknown Product";
      },
    },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Prix", dataIndex: "price", key: "price" },
    { title: "Bénéfices", dataIndex: "profit", key: "profit" },
    {
      title: "Date",
      dataIndex: "saleDate",
      key: "saleDate",
      render: (saleDate: string) => {
        // Format the date to "day month year"
        const formattedDate = new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }).format(new Date(saleDate));
        return formattedDate;
      },
    },
  ];

  return (
    <div className=" mx-auto pt-6 ">
      <Modal
        title="Add New Sale"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Product
            </label>
            <Controller
              name="productID"
              control={control}
              render={({ field }) => (
                <Select
                  showSearch
                  placeholder="Select a product"
                  optionFilterProp="label"
                  onChange={(value) => field.onChange(value)}
                  options={products.map((product) => ({
                    value: product.productID,
                    label: product.name,
                  }))}
                  value={field.value || ""}
                  className="w-full border"
                />
              )}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <Controller
              name="quantity"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  className={`block w-full mt-1 p-2 border ${
                    errors.quantity ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                />
              )}
            />
            {errors.quantity && (
              <p className="mt-2 text-sm text-red-600">
                {errors.quantity.message}
              </p>
            )}
          </div>

          <div className=" flex  justify-end  ">
            <button
              type="submit"
              className=" text-white font-poppins  bg-emerald-500 shadow-emerald-900 rounded p-2"
            >
              Ajouter
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        title="Confirm Deletion"
        open={isDeleteModalVisible}
        onOk={handleDeleteAllSales}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="supprimer "
        okButtonProps={{ danger: true }}
      >
        <p>Êtes-vous sûr de vouloir supprimer toutes les ventes ?</p>
      </Modal>

      <div className="p-2 flex justify-between items-center">
        <h1 className="text-1xl font-bold bg-white p-2 rounded shadow-md">
          Gestion des ventes
        </h1>
        <div className="flex items-center justify-between">
          <button
            className="px-6 py-2 flex items-center min-w-[120px] text-center text-white bg-emerald-400 border-emerald-600 shadow-xl hover:shadow rounded active:text-white-500 focus:ring"
            onClick={() => setIsModalVisible(true)}
          >
            Ajouter une vente
          </button>
          <button
            className="px-6 py-2 flex items-center ml-2 text-center text-white bg-red-500 border-red-700 shadow-xl hover:shadow rounded active:text-white-500 focus:ring"
            onClick={() => setIsDeleteModalVisible(true)}
          >
            <Delete />
          </button>
        </div>
      </div>

      <div className="grid p-4 grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 p-6 shadow-lg rounded-lg text-white">
          <h3 className="text-lg font-bold mb-2">Top Produit </h3>
          <p className="text-center text-2xl font-bold text-red-600 mb-4">
            {mostSoldProduct.name}
          </p>
        </div>

        <div className="bg-gradient-to-r from-sky-400 to-blue-500 p-6 shadow-lg rounded-lg flex justify-between items-center text-white">
          <div>
            <h3 className="text-lg font-bold">Ventes quotidiennes</h3>
            <div className="mt-2">
              <h1 className="text-4xl font-extrabold">{dailySales.length}</h1>
              <h2 className="text-1xl font-semibold mt-1">
                Bénéfices: {dailyProfit} DH
              </h2>
            </div>
          </div>
          <div className="flex items-center">
            <FaCalendarDay className="h-12 w-12" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-violet-500 to-purple-500 p-6 shadow-lg rounded-lg flex justify-between items-center text-white">
          <div>
            <h3 className="text-lg font-bold">Ventes hebdomadaires</h3>
            <div className="mt-2">
              <h1 className="text-4xl font-extrabold">{weeklySales.length}</h1>
              <h2 className="text-1xl font-semibold mt-1">
                Bénéfices: {weeklyProfit} DH
              </h2>
            </div>
          </div>
          <div className="flex items-center">
            <FaCalendarWeek className="h-12 w-12" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-400 to-emerald-400 p-6 shadow-lg rounded-lg flex justify-between items-center text-white">
          <div>
            <h3 className="text-lg font-bold">Ventes mensuelles</h3>
            <div className="mt-2">
              <h1 className="text-4xl font-extrabold">{monthlySales.length}</h1>
              <h2 className="text-1xl font-semibold mt-1">
                Bénéfices: {monthlyProfit} DH
              </h2>
            </div>
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="h-12 w-12" />
          </div>
        </div>
      </div>

      <div className="flex justify-evenly items-start p-4 gap-4">
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          <h2 className="text-lg font-bold mb-2">Ventes quotidiennes</h2>
          <Table
            columns={columns}
            dataSource={dailySales}
            rowKey="id"
            pagination={false}
            scroll={{ y: 300 }}
          />
        </div>

        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          <h2 className="text-lg font-bold mb-2">Ventes hebdomadaires</h2>
          <Table
            columns={columns}
            dataSource={weeklySales}
            rowKey="id"
            pagination={false}
            scroll={{ y: 300 }}
          />
        </div>
      </div>

      <div className="p-4" style={{ maxHeight: "400px", overflowY: "auto" }}>
        <h2 className="text-lg font-bold mb-2">Ventes mensuelles</h2>
        <Table
          columns={columns}
          dataSource={monthlySales}
          rowKey="id"
          pagination={false}
          scroll={{ y: 300 }}
        />
      </div>

      <div className="p-4" style={{ maxHeight: "400px", overflowY: "auto" }}>
        <h2 className="text-lg font-bold mb-2">Toutes les ventes</h2>
        <Table
          columns={columns}
          dataSource={allSales}
          rowKey="id"
          pagination={false}
          scroll={{ y: 300 }}
        />
      </div>
    </div>
  );
};

export default SalesComponent;
