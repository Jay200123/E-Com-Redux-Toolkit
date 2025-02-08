import CardInfo from "./CardInfo";
import OrderInfo from "./OrderInfo";
import ProductInfo from "./ProductInfo";
import BrandInfo from "./BrandInfo";
import PaymentInfo from "./PaymentInfo";
import OrderStatus from "./OrderStatus";
import { motion } from "framer-motion";

export default function () {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      viewport={{ visible: 1, once: false }}
      className="flex flex-col items-center justify-start w-full overflow-y-auto"
    >
      <CardInfo />
      <OrderInfo />
      <div className="flex flex-col w-full mt-4 md:flex-row">
        <ProductInfo />
        <BrandInfo />
      </div>
      <div className="flex flex-col w-full mt-4 md:flex-row">
        <PaymentInfo />
        <OrderStatus />
      </div>
    </motion.div>
  );
}
