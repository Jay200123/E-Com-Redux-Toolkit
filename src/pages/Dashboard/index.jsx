import CardInfo from "./CardInfo";
import OrderInfo from "./OrderInfo";
import ProductInfo from "./ProductInfo"; 
import BrandInfo from "./BrandInfo"; 
import PaymentInfo from "./PaymentInfo";

export default function () {
  return (
    <div className="flex flex-col items-center justify-start w-full h-full overflow-y-auto"> 
      <CardInfo />
      <OrderInfo/>
      <div className="flex flex-col w-full mt-4 md:flex-row">
        <ProductInfo />
        <BrandInfo />
      </div>
      <div className="flex flex-col w-full mt-4 md:flex-row">
        <PaymentInfo />
        </div>
    </div>
  );
}
