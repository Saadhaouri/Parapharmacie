import React from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { CiShoppingBasket } from "react-icons/ci";
import { BsTruck } from "react-icons/bs";
import { GoPaste, GoPerson, GoGear, GoSignIn } from "react-icons/go";
import { PiAddressBookLight } from "react-icons/pi";
import { PiSealPercent } from "react-icons/pi";

import { Link } from "react-router-dom";
import { ImTree } from "react-icons/im";

function renderListItem(IconComponent, label: string, link: string) {
  return (
    <li>
      <Link
        to={link}
        className="relative flex flex-row font-poppins  items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-emerald-500 pr-6"
      >
        <span className="inline-flex justify-center items-center ml-4">
          <IconComponent />
        </span>
        <span className="ml-2 text-sm tracking-wide truncate">{label}</span>
      </Link>
    </li>
  );
}

const SideMenu: React.FC = () => {
  return (
    <div className="w-64 bg-white border-r">
      <div className="flex flex-col h-screen overflow-y-auto">
        <div className="py-4">
          <ul className="flex flex-col space-y-1">
            {renderListItem(LuLayoutDashboard, "Dashboard", "/")}
            {renderListItem(ImTree, "Category", "/categories")}
            {renderListItem(CiShoppingBasket, "Produits", "/products")}
            {renderListItem(CiShoppingBasket, "Stock", "/stock")}
            {renderListItem(BsTruck, "Fornisseurs", "/supplier")}
            {renderListItem(GoPaste, "Commandes", "/orders")}
            {renderListItem(PiAddressBookLight, "Clients", "/clients")}
            {renderListItem(PiSealPercent, "Promotions", "/promotions")}
            {renderListItem(GoPerson, "Profile", "/profile")}
            {renderListItem(GoGear, "Settings", "/settings")}
            {renderListItem(GoSignIn, "Logout", "/")}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
