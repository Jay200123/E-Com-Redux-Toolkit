import CardInfo from "./CardInfo";
import OrderInfo from "./OrderInfo";
import ProductInfo from "./ProductInfo";  

export default function () {
  
 
  return (
    <div className="flex flex-col items-center justify-start w-full h-full"> 
      <CardInfo />
      <OrderInfo/>
      <div className="flex flex-col w-full mt-2 md:flex-row">
        <ProductInfo />
      </div>
    </div>
  );
}
