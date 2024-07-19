import { message } from "antd";
import { useEffect, useState } from "react";
import {
  getDailySales,
  getMonthlySales,
  getTotalDailyProfit,
  getTotalMonthlyProfit,
  getTotalWeeklyProfit,
  getWeeklySales,
} from "../../Services/salesService";
import { FcSalesPerformance } from "react-icons/fc";
import { Sale } from "../../Types/SaleTypes";

const SalePanel = () => {
  const [dailyProfit, setDailyProfit] = useState(0);
  const [weeklyProfit, setWeeklyProfit] = useState(0);
  const [monthlyProfit, setMonthlyProfit] = useState(0);

  // SALE STATES
  const [dailySales, setDailySales] = useState<Sale[]>([]);
  const [weeklySales, setWeeklySales] = useState<Sale[]>([]);
  const [monthlySales, setMonthlySales] = useState<Sale[]>([]);

  useEffect(() => {
    fetchProfitData();
    fetchSalesData();
  }, []); // Fetch profit data on initial component mount

  const fetchProfitData = async () => {
    try {
      const dailyProfit = await getTotalDailyProfit();
      const weeklyProfit = await getTotalWeeklyProfit();
      const monthlyProfit = await getTotalMonthlyProfit();
      setDailyProfit(dailyProfit);
      setWeeklyProfit(weeklyProfit);
      setMonthlyProfit(monthlyProfit);
    } catch (error) {
      console.error("Failed to fetch profit data", error);
      // Handle error gracefully, e.g., show an error message
    }
  };
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

  return (
    <div className="grid  grid-cols-1 md:grid-cols-3 gap-4 ">
      {/* Daily Profit Card */}
      <div className="bg-white text-emerald-600 p-6 shadow-lg rounded-lg flex justify-between items-center ">
        <div>
          <h3 className="text-lg font-bold">Ventes quotidiennes</h3>
          <div className="mt-2">
            <h1 className="text-4xl font-extrabold">{dailySales.length}</h1>
            {/* Display daily profit */}
            <h2 className="text-2xl font-semibold mt-1">
              Bénéfices: {dailyProfit} DH
            </h2>
          </div>
        </div>
        <div className="flex items-center">
          <FcSalesPerformance className="text-6xl" />
        </div>
      </div>

      {/* Weekly Profit Card */}
      <div className="bg-white text-emerald-600 p-6 shadow-lg rounded-lg flex justify-between items-center ">
        <div>
          <h3 className="text-lg font-bold">Ventes hebdomadaires</h3>
          <div className="mt-2">
            <h1 className="text-4xl font-extrabold">{weeklySales.length}</h1>
            {/* Display weekly profit */}
            <h2 className="text-2xl font-semibold mt-1  ">
              Bénéfices: {weeklyProfit} DH
            </h2>
          </div>
        </div>
        <div className="flex items-center">
          <FcSalesPerformance className="text-6xl" />
        </div>
      </div>

      {/* Monthly Profit Card */}
      <div className="bg-white text-emerald-600 p-6 shadow-lg rounded-lg flex justify-between items-center ">
        <div>
          <h3 className="text-lg font-bold">Ventes mensuelles</h3>
          <div className="mt-2">
            <h1 className="text-4xl font-extrabold">{monthlySales.length}</h1>
            {/* Display monthly profit */}
            <h2 className="text-2xl font-semibold mt-1">
              Bénéfices: {monthlyProfit} DH
            </h2>
          </div>
        </div>
        <div className="flex items-center">
          <FcSalesPerformance className="text-6xl" />
        </div>
      </div>
    </div>
  );
};

export default SalePanel;
