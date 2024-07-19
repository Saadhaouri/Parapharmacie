import { useEffect, useState } from "react";
import axios from "axios";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MonthlyBenefitsChart = () => {
  const [monthlydata, setMonthlydata] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:88/Sales/monthly-benefits")
      .then((response) => setMonthlydata(response.data))
      .catch((error) => console.error("Error fetching data:", error));
    // console.log(monthlydata);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={monthlydata}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Benefit"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MonthlyBenefitsChart;
