import ChartComponent from "./ChartComponent";
import ProductsExpiringSoon from "./ProductsExpiringSoon";
import SalePanel from "./SalePanel";
import StockAlerts from "./StockAlerts";

const DashboardPage = () => {
  return (
    <div className="grid grid-cols-3 gap-4 p-2">
      <div className="col-span-3">
        <SalePanel />
      </div>
      <div className="col-span-2 h-[60vh] grid grid-col-2 gap-4">
        <div className="bg-white rounded-md shadow-md flex items-center w-full h-full">
          <ChartComponent />
        </div>
      </div>
      <div className="col-span-1 gap">
        <ProductsExpiringSoon />
        <StockAlerts />
      </div>
    </div>
  );
};

export default DashboardPage;
