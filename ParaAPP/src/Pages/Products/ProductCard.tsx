import React from "react";

const ProductCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
}> = ({ title, value, icon }) => {
  return (
    <div className="bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 shadow-lg rounded-xl p-6 flex items-center space-x-6 transform hover:scale-105 transition-transform duration-300">
      <div className="text-white text-2xl">{icon}</div>
      <div>
        <h2 className="text-white text-2xl font-bold">{title}</h2>
        <p className="text-white text-lg font-bold opacity-75">{value}</p>
      </div>
    </div>
  );
};

export default ProductCard;
