import axios from "axios";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Sale } from "../../Types/SaleTypes";

const SalesChart = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    // Fetch sales data from your backend API
    axios
      .get("https://localhost:7016/api/Sales/monthly-sales")
      .then((response) => {
        setSalesData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the sales data!", error);
      });
  }, []);

  // Process data for the chart
  const chartData = {
    labels: salesData.map((sale: Sale) =>
      new Date(sale.saleDate).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Quantity",
        data: salesData.map((sale) => sale.quantity),
        backgroundColor: "rgba(75,192,192,0.6)",
      },
      {
        label: "Profit",
        data: salesData.map((sale) => sale.profit),
        backgroundColor: "rgba(153,102,255,0.6)",
      },
    ],
  };

  return (
    <div>
      <h2>Sales Statistics</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default SalesChart;
