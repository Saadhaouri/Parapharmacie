import React from "react";
import { GiCottonFlower } from "react-icons/gi";

const Header: React.FC = () => {
  return (
    <div className=" w-full  top-0   flex flex-row items-center justify-between bg-white p-4 border-b border-gray-300">
      {/* Logo */}
      <div className="flex items-center">
        <GiCottonFlower className="text-[36px] text-emerald-500 mr-2" />
        <strong className="text-emerald-500 text-lg font-semibold">
          YOUSMALA
        </strong>
      </div>
    </div>
  );
};

export default Header;
