import { Modal } from "antd";
import React, { useState } from "react";
import { BsTruck } from "react-icons/bs";
import { CiLogout, CiShoppingBasket } from "react-icons/ci";
import { GoPaste, GoPerson } from "react-icons/go";
import { ImTree } from "react-icons/im";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiAddressBookLight, PiSealPercent } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import authStore from "../../auth/authStore";

interface ListItemProps {
  IconComponent: React.ElementType;
  label: string;
  link: string;
}

function renderListItem({
  IconComponent,
  label,
  link,
}: ListItemProps): JSX.Element {
  return (
    <li>
      <Link
        to={link}
        className="relative flex flex-row font-poppins items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-emerald-500 pr-6"
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
  const navigate = useNavigate();
  const logOut = authStore((state) => state.logOut);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showLogoutModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    logOut();
    navigate("/login");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="w-64 bg-white border-r">
      <div className="flex flex-col h-screen overflow-y-auto">
        <div className="py-4">
          <ul className="flex flex-col space-y-1">
            {renderListItem({
              IconComponent: LuLayoutDashboard,
              label: "Tableau de bord",
              link: "/",
            })}
            {renderListItem({
              IconComponent: ImTree,
              label: "Catégorie",
              link: "/categories",
            })}
            {renderListItem({
              IconComponent: CiShoppingBasket,
              label: "Produits",
              link: "/products",
            })}
            {renderListItem({
              IconComponent: CiShoppingBasket,
              label: "Stock",
              link: "/stock",
            })}
            {renderListItem({
              IconComponent: BsTruck,
              label: "Fornisseurs",
              link: "/supplier",
            })}
            {renderListItem({
              IconComponent: GoPaste,
              label: "Commandes",
              link: "/orders",
            })}
            {renderListItem({
              IconComponent: PiAddressBookLight,
              label: "Clients",
              link: "/clients",
            })}
            {renderListItem({
              IconComponent: PiSealPercent,
              label: "Promotions",
              link: "/promotions",
            })}
            {renderListItem({
              IconComponent: GoPerson,
              label: "Profile",
              link: "/profile",
            })}
          </ul>
        </div>
        <div className="mt-6 px-4">
          <button
            onClick={showLogoutModal}
            className="w-full flex items-center bg-transparent text-red-500 py-2 px-4 rounded"
          >
            <CiLogout className="mr-2" />
            Se déconnecter
          </button>

          <Modal
            title="Confirmer la déconnexion"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Oui, Déconnexion"
            cancelText="Annuler"
          >
            <p>Êtes-vous sûr de vouloir vous déconnecter?</p>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
