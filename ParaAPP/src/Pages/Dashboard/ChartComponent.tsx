import { useState, useEffect } from "react";
import { Pie } from "@ant-design/charts";
import axios from "axios";

interface BenefitData {
  month: string;
  benefit: number;
}

const ChartComponent = () => {
  const [data, setData] = useState<BenefitData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:88/Sales/monthly-benefits"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const props = {
    appendPadding: 10,
    data,
    angleField: "benefit",
    colorField: "month",
    radius: 0.8,
    innerRadius: 0.6,
    label: {
      type: "spider",
      labelHeight: 28,
      content: "{name}\n{percentage}",
    },
    interactions: [{ type: "element-active" }],
    statistic: {
      title: {
        style: { fontSize: 24 },
        content: "Benefits",
      },
      content: {
        style: { fontSize: 24 },
        content: `${data
          .reduce((acc, item) => acc + item.benefit, 0)
          .toFixed(1)}`,
      },
    },
  };

  return (
    <div>
      <Pie {...props} />
    </div>
  );
};

export default ChartComponent;
