import { Carousel } from "../../components";
import ImageOne from "../../assets/ImageComputerTwo.jpg";
import ImageTwo from "../../assets/ImageLaptopTwo.jpg";
import ImageThree from "../../assets/ImageMobileTwo.jpg";
import { FaStar, FaCartPlus } from "react-icons/fa";
import {
  useGetBrandsQuery,
  useGetProductsQuery,
  useGetRatingsQuery,
} from "../../state/api/reducer";
import { addCart } from "../../state/slice/cart";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setCategory, setBrand } from "../../state/slice/category";

export default function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useGetBrandsQuery();
  const brands = data?.details || [];

  const { data: products } = useGetProductsQuery();
  const productsData = products?.details || [];

  const { data: ratings } = useGetRatingsQuery();
  const ratingData = ratings?.details || [];

  const allProductsWithRatings = productsData?.map((product) => {
    const matchingRatings = ratingData.filter(
      (rating) => rating?.product?._id === product?._id
    );

    const count = matchingRatings?.length;

    const averageRating =
      count > 0
        ? matchingRatings?.reduce((sum, rating) => sum + rating?.rating, 0) /
          count
        : 0;

    return {
      ...product,
      averageRating: Number(averageRating.toFixed(1)),
      reviewCount: count,
    };
  });

  const test = useSelector((state) => state.category);
  console.log(test);

  const handleCart = (product, quantity) => {
    dispatch(addCart({ product, orderQty: quantity }));
    toast.success("Product added to cart");
  };

  const handleComputer = () => {
    dispatch(setCategory("Computer"));
    navigate("/products/category");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleLaptop = () => {
    dispatch(setCategory("Laptop"));
    navigate("/products/category");
    window.scrollTo(0, 0);
  };

  const handleMobile = () => {
    dispatch(setCategory("Mobile"));
    navigate("/products/category");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleBrand = (brand) => {
    dispatch(setBrand(brand));
    navigate("/products/brand");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col w-full h-full">
      <Carousel />
      <h3 className="mt-2 text-lg font-medium md:text-3xl md:font-bold">
        Our Top Brands
      </h3>
      <div className="flex flex-row flex-wrap items-center w-full overflow-hidden">
        {brands?.length > 0 ? (
          brands?.map((b) => (
            <div
              key={b?._id}
              onClick={() => handleBrand(b?.brand_name)}  
              className="flex flex-col items-center justify-center w-1/2 transition-all duration-500 rounded-md cursor-pointer hover:opacity-80 hover:shadow-lg md:p-4 md:w-1/5"
            >
              {b?.image?.length > 1 ? (
                <img
                  src={
                    b?.image[Math.floor(Math.random * b?.image?.length)]?.url
                  }
                  alt="Brand Image"
                  className="object-contain w-24 h-24 md:w-32 md:h-32"
                />
              ) : (
                <img
                  src={b?.image[0]?.url}
                  alt="Brand Image"
                  className="object-contain w-24 h-24 md:w-32 md:h-32"
                />
              )}

              <p className="text-sm font-medium md:font-bold md:text-lg">
                {b?.brand_name}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-center text-gray-600 md:text-2xl">
            No Brands Found
          </p>
        )}
      </div>
      <h3 className="mt-2 text-lg font-medium md:text-3xl md:font-bold">
        Product Category
      </h3>
      <div className="flex w-full h-[22rem] md:h-[24rem] overflow-hidden">
        <div className="relative w-1/2 mr-1">
          <div className="absolute p-2">
            <h3 className="text-lg font-medium text-white md:text-2xl md:font-bold">
              Computer Parts
            </h3>
            <p
              onClick={handleComputer}
              className="text-xs font-medium underline cursor-pointer text-white md:text-[1rem] md:font-bold"
            >
              Shop Now<i className="ml-1 fa-solid fa-arrow-right"></i>
            </p>
          </div>
          <img
            src={ImageOne}
            alt="Computer"
            className="object-cover w-full h-full "
          />
        </div>
        <div className="flex flex-col w-1/2">
          <div className="relative w-full mb-1 h-1/2">
            <div className="absolute p-2">
              <h3 className="text-lg font-medium text-white md:text-2xl md:font-bold">
                Laptop Parts
              </h3>
              <p
                onClick={handleLaptop}
                className="text-xs font-medium underline cursor-pointer text-white md:text-[1rem] md:font-bold"
              >
                Shop Now<i className="ml-1 fa-solid fa-arrow-right"></i>
              </p>
            </div>
            <img
              src={ImageTwo}
              alt="Computer"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="relative w-full h-1/2">
            <div className="absolute p-2">
              <h3 className="text-lg font-medium text-white md:text-2xl md:font-bold">
                Mobile Parts
              </h3>
              <p
                onClick={handleMobile}
                className="text-xs font-medium underline cursor-pointer text-white md:text-[1rem] md:font-bold"
              >
                Shop Now<i className="ml-1 fa-solid fa-arrow-right"></i>
              </p>
            </div>
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
        {allProductsWithRatings?.length > 0 ? (
          allProductsWithRatings.map((p) => (
            <div
              key={p?._id}
              className="flex flex-col border border-gray-500 rounded-md h-[16rem] md:h-[18rem] overflow-hidden p-2"
            >
              {p?.image?.length > 1 ? (
                <img
                  src={
                    p?.image[Math.floor(Math.random() * p?.image.length)]?.url
                  }
                  alt={p?.product_name || "Product Image"}
                  onClick={() => {
                    navigate(`/product/${p?._id}`);
                    window.scrollTo(0, 0);
                  }}
                  className="object-contain w-full h-full cursor-pointer"
                />
              ) : (
                <img
                  src={p?.image[0]?.url}
                  alt={p?.name || "Product Image"}
                  onClick={() => {
                    navigate(`/product/${p?._id}`);
                    window.scrollTo(0, 0);
                  }}
                  className="object-contain w-full h-full cursor-pointer"
                />
              )}
              <p className="text-sm md:text-sm text-medium">
                {p?.product_name || "Unnamed Product"}
              </p>
              <p className="text-sm md:text-sm text-medium">
                ₱ {p?.price || "Unknown Price"}
              </p>
              <div className="flex items-center justify-between w-full mb-1">
                <div className="flex items-center">
                  {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <FaStar
                        key={index}
                        className={`text-sm md:text-lg ${
                          index < Math.floor(p.averageRating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  <span className="ml-2 text-xs text-gray-600 truncate md:text-sm">
                    ({p.reviewCount || 0}) Reviews
                  </span>
                </div>
                <FaCartPlus
                  onClick={() => handleCart(p, 1)}
                  className="text-lg cursor-pointer md:text-2xl"
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-center text-gray-600 md:text-2xl">
            No Products Found
          </p>
        )}
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
