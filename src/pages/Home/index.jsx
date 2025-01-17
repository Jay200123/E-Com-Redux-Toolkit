import { Carousel } from "../../components";
import Kingston from "../../assets/kingston.png";
import Samsung from "../../assets/samsung.png";
import Nvidia from "../../assets/nvidia.png";
import AMD from "../../assets/amd.png";
import Toshiba from "../../assets/toshiba.png";
import SeaGate from "../../assets/seagate.png";
import WesternDigital from "../../assets/western-digital.png";
import MSI from "../../assets/msi.png";
import ImageOne from "../../assets/ImageComputerTwo.jpg";
import ImageTwo from "../../assets/ImageLaptopTwo.jpg";
import ImageThree from "../../assets/ImageMobileTwo.jpg";
import RAM from "../../assets/ram.jpg";
import { FaStar, FaCartPlus } from "react-icons/fa";

export default function () {
  return (
    <div className="flex flex-col w-full h-full">
      <Carousel />
      <h3 className="mt-2 text-lg font-medium md:text-3xl md:font-bold">
        Our Top Brands
      </h3>
      <div className="flex flex-row flex-wrap items-center w-full overflow-hidden">
        {[
          { src: Kingston, name: "Kingston", alt: "Kingston" },
          { src: Samsung, name: "Samsung", alt: "Samsung" },
          { src: Nvidia, name: "Nvidia", alt: "Nvidia" },
          { src: AMD, name: "AMD", alt: "AMD" },
          { src: Toshiba, name: "Toshiba", alt: "Toshiba" },
          { src: SeaGate, name: "SeaGate", alt: "SeaGate" },
          {
            src: WesternDigital,
            name: "WesternDigital",
            alt: "Western Digital",
          },
          { src: MSI, name: "MSI", alt: "MSI" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center w-1/2 transition-all duration-500 rounded-md cursor-pointer hover:opacity-80 hover:shadow-lg md:p-4 md:w-1/5"
          >
            <img
              src={item.src}
              alt={item.alt}
              className="object-contain w-24 h-24 md:w-32 md:h-32"
            />
            <p className="text-sm font-medium md:font-bold md:text-lg">
              {item.name}
            </p>
          </div>
        ))}
      </div>
      <h3 className="mt-2 text-lg font-medium md:text-3xl md:font-bold">
        Product Category
      </h3>
      <div className="flex w-full h-[22rem] md:h-[24rem] overflow-hidden">
        <div className="relative w-1/2 mr-1">
          <h3 className="absolute text-lg font-medium text-white md:text-2xl md:font-bold">
            Computer Parts
          </h3>
          <img
            src={ImageOne}
            alt="Computer"
            className="object-cover w-full h-full "
          />
        </div>
        <div className="flex flex-col w-1/2">
          <div className="relative w-full mb-1 h-1/2">
            <h3 className="absolute text-lg font-medium text-white md:text-2xl md:font-bold">
              Laptop Parts
            </h3>
            <img
              src={ImageTwo}
              alt="Computer"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="relative w-full h-1/2">
            <h3 className="absolute text-lg font-medium text-white md:text-2xl md:font-bold">
              Mobile Parts
            </h3>
            <img
              src={ImageThree}
              alt="Computer"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      <h3 className="p-2 mt-2 text-lg font-medium md:text-3xl md:font-bold">
        Other Products You may Like
      </h3>
      <div className="grid grid-cols-2 gap-2 w-full max-h-[38rem] md:grid-cols-4 lg:grid-cols-5 overflow-hidden overflow-y-auto p-2">
        <div className="flex flex-col border border-gray-500 rounded-md h-[14rem] md:h-[18rem] overflow-hidden p-2">
          <img src={RAM} className="w-full h-full objet-contain" />
          <p className="text-sm md:text-sm text-medium">
            KINGSTON HYPER X FURY 8GB RAM
          </p>
          <div className="flex items-center justify-between w-full mb-1">
            <div className="flex items-center">
              <FaStar className="text-lg text-yellow-400 md:text-2xl" />
              <FaStar className="text-lg text-yellow-400 md:text-2xl" />
              <FaStar className="text-lg text-yellow-400 md:text-2xl" />
              <FaStar className="text-lg text-yellow-400 md:text-2xl" />
              <FaStar className="text-lg text-yellow-400 md:text-2xl" />
            </div>
            <FaCartPlus className="text-lg md:text-2xl" />
          </div>
        </div>
        <div className="flex flex-col border border-gray-500 rounded-md h-[14rem] md:h-[18rem] overflow-hidden p-2">
          <img src={RAM} className="w-full h-full objet-contain" />
          <p className="text-sm md:text-sm text-medium">
            KINGSTON HYPER X FURY 8GB RAM
          </p>
          <div className="flex items-center justify-between w-full mb-1">
            <div className="flex items-center">
              <FaStar className="text-lg text-yellow-400 md:text-2xl" />
              <FaStar className="text-lg text-yellow-400 md:text-2xl" />
              <FaStar className="text-lg text-yellow-400 md:text-2xl" />
              <FaStar className="text-lg text-yellow-400 md:text-2xl" />
              <FaStar className="text-lg text-yellow-400 md:text-2xl" />
            </div>
            <FaCartPlus className="text-lg md:text-2xl" />
          </div>
        </div>
      </div>
      <div className="w-full overflow-hidden">
        <div className="grid items-center grid-cols-2 gap-2 mt-3 md:gap-4 md:grid-cols-4">
          <div className="flex flex-col m-2 overflow-hidden text-center p-2 h-[10rem] w-[8rem] md:h-[11.7rem] rounded-md  md:w-[11.7rem] border border-black">
            <i className="text-sm md:text-3xl fa-solid fa-truck-fast"></i>
            <h3 className="text-sm md:text-lg">Free Shipping</h3>
            <p className="text-xs md:text-sm">
              Get your orders delivered at no extra cost! Enjoy free shipping on
              all purchases above ₱150.00.
            </p>
          </div>

          <div className="flex flex-col m-2 overflow-hidden text-center p-2 h-[10rem] w-[8rem] md:h-[11.7rem] rounded-md  md:w-[11.7rem] border border-black">
            <i className="text-sm md:text-3xl fa-solid fa-award"></i>
            <h3 className="text-sm md:text-lg">Money-Back Guarantee</h3>
            <p className="text-xs">
              Shop with confidence! Enjoy a hassle-free 30-day money-back
              guarantee on your purchases.
            </p>
          </div>

          <div className="flex flex-col m-2 overflow-hidden text-center p-2 h-[10rem] w-[8rem] md:h-[11.7rem] rounded-md  md:w-[11.7rem] border border-black">
            <i className="text-sm md:text-3xl fa-solid fa-lock"></i>
            <h3 className="text-sm md:text-lg">Secure Payments</h3>
            <p className="text-xs">
              Enjoy peace of mind with our trusted payment options, ensuring
              safe and reliable transactions for all orders above ₱150.00.
            </p>
          </div>

          <div className="flex flex-col m-2 overflow-hidden text-center p-2 h-[10rem] w-[8rem] md:h-[11.7rem] rounded-md  md:w-[11.7rem] border border-black">
            <i className="text-sm md:text-3xl fa-solid fa-phone"></i>
            <h3 className="text-sm md:text-lg">Customer Support</h3>
            <p className="text-xs">
              We're here to help! Reach out to our dedicated support team for
              assistance with any inquiries or concerns about your order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
