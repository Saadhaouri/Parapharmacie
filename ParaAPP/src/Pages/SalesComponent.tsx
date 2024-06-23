import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Modal, Select, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import {
  addSale,
  getAllProducts,
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
  const [dailySales, setDailySales] = useState<Sale[]>([]);
  const [weeklySales, setWeeklySales] = useState<Sale[]>([]);
  const [monthlySales, setMonthlySales] = useState<Sale[]>([]);
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
      setDailySales(daily);
      setWeeklySales(weekly);
      setMonthlySales(monthly);
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
                <div className="flex flex-col space-y-2">
                  <Select
                    {...field}
                    placeholder="Select Product"
                    className="w-full border"
                    onChange={(value) => field.onChange(value)}
                    value={field.value || ""}
                  >
                    {products.map((product) => (
                      <Select.Option
                        key={product.productID}
                        value={product.productID}
                      >
                        {product.name}
                      </Select.Option>
                    ))}
                  </Select>
                  {errors.productID && (
                    <p className="text-red-500 text-sm">
                      {errors.productID.message}
                    </p>
                  )}
                </div>
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
      <div className="p-2 flex justify-between items-center">
        <h1 className="text-1xl font-bold bg-white p-2 rounded shadow-md">
          Gestion des ventes
        </h1>
        <button
          className="px-6 py-2 flex items-center min-w-[120px] text-center text-white bg-emerald-400 border-emerald-600 shadow-xl hover:shadow rounded active:text-white-500 focus:ring"
          onClick={() => setIsModalVisible(true)}
        >
          ajouter une vente
        </button>
      </div>
      <div className="grid p-4 grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 p-6 shadow-lg rounded-lg text-white">
          <h3 className="text-lg font-bold mb-2">Top Product</h3>
          <p className="text-center text-2xl font-bold text-red-600 mb-4">
            {mostSoldProduct.name}
          </p>
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">Nr de ventes:</p>
            <p className="text-xl font-bold">{mostSoldProduct.count}</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6 shadow-lg rounded-lg flex justify-between items-center text-white">
          <div>
            <h3 className="text-lg font-bold">Ventes quotidiennes</h3>
            <div className="mt-2">
              <h1 className="text-4xl font-extrabold">{dailySales.length}</h1>
              <h2 className="text-2xl font-semibold mt-1">
                Bénéfices: {dailyProfit}
              </h2>
            </div>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 2L9 8h6l-4 6h4L11 22"></path>
            </svg>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-400 via-blue-500 to-teal-500 p-6 shadow-lg rounded-lg flex justify-between items-center text-white">
          <div>
            <h3 className="text-lg font-bold">Ventes hebdomadaires</h3>
            <div className="mt-2">
              <h1 className="text-4xl font-extrabold">{weeklySales.length}</h1>
              <h2 className="text-2xl font-semibold mt-1">
                Bénéfices: {weeklyProfit}
              </h2>
            </div>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 2L9 8h6l-4 6h4L11 22"></path>
            </svg>
          </div>
        </div>

        <div className="bg-gradient-to-r from-cyan-400 via-teal-500 to-blue-500 p-6 shadow-lg rounded-lg flex justify-between items-center text-white">
          <div>
            <h3 className="text-lg font-bold">Ventes mensuelles</h3>
            <div className="mt-2">
              <h1 className="text-4xl font-extrabold">{monthlySales.length}</h1>
              <h2 className="text-2xl font-semibold mt-1">
                Bénéfices: {monthlyProfit}
              </h2>
            </div>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 2L9 8h6l-4 6h4L11 22"></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="flex justify-evenly items-start p-4 gap-4">
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          <h2 className="text-lg font-bold mb-2">Daily Sales</h2>
          <Table
            columns={columns}
            dataSource={dailySales}
            rowKey="id"
            pagination={false}
            scroll={{ y: 300 }}
          />
        </div>

        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          <h2 className="text-lg font-bold mb-2">Weekly Sales</h2>
          <Table
            columns={columns}
            dataSource={weeklySales}
            rowKey="id"
            pagination={false}
            scroll={{ y: 300 }}
          />
        </div>
      </div>
      <div className=" p-4" style={{ maxHeight: "400px", overflowY: "auto" }}>
        <h2 className="text-lg font-bold mb-2">Monthly Sales</h2>
        <Table
          columns={columns}
          dataSource={monthlySales}
          rowKey="id"
          pagination={false}
          scroll={{ y: 300 }}
        />
      </div>
    </div>
  );
};

export default SalesComponent;
