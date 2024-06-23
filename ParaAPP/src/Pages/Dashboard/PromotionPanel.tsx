import { Table, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Promotion } from "../../Types/Promotion";

// API functions
const API_URL = "https://localhost:7016/api/Promotion";

const getAllPromotions = async (): Promise<Promotion[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

const formatDate = (date: string) => {
  const d = new Date(date);
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const day = `0${d.getDate()}`.slice(-2);
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const PromotionPanel = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const data = await getAllPromotions();
        setPromotions(data);
      } catch (error) {
        message.error("Erreur lors de la récupération des promotions");
        console.error("Failed to fetch promotions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Montant de réduction",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Date de début",
      dataIndex: "startDate",
      key: "startDate",
      render: (date: string) => formatDate(date),
    },
    {
      title: "Date de fin",
      dataIndex: "endDate",
      key: "endDate",
      render: (date: string) => formatDate(date),
    },
  ];

  return (
    <div className="  w-full">
      <Table
        dataSource={promotions}
        columns={columns}
        loading={loading}
        rowKey="promotionId"
      />
    </div>
  );
};

export default PromotionPanel;
