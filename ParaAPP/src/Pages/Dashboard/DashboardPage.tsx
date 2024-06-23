import ProductsExpiringSoon from "./ProductsExpiringSoon";
import PromotionPanel from "./PromotionPanel";
import SalePanel from "./SalePanel";

const DashboardPage = () => {
  return (
    <div className=" grid grid-cols-3 gap-4 p-2 ">
      <div className=" col-span-3">
        <SalePanel />
      </div>
      <div className=" grid  col-span-2 gap-4 h-[60vh] bg-slate-600">
        <div className="bg-white rounded-md shadow-md flex items-center w-full">
          <PromotionPanel />
        </div>
      </div>
      <div className="grid col-span-1 ">
        <ProductsExpiringSoon />
      </div>
    </div>
  );
};

export default DashboardPage;
