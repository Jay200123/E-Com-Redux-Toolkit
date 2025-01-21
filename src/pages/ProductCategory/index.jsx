import { useGetProductsQuery } from "../../state/api/reducer";
import { useDispatch, useSelector } from "react-redux";
import { clearCategory } from "../../state/slice/category";
import { FaStar, FaCartPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { addCart } from "../../state/slice/cart";
import { toast } from "react-toastify";

export default function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useGetProductsQuery();
  const products = data?.details || [];

  const category = useSelector((state) => state.category.categories);

  const filterProducts = products.filter(
    (p) => p?.category?.toLowerCase() === category.toLowerCase()
  );

  const handleCart = (product, quantity) => {
    dispatch(addCart({ product, orderQty: quantity }));
    toast.success("Product added to cart");
  };

  const back = () => {
    dispatch(clearCategory());
    window.history.back();
  };

  return (
    <div className="relative w-full h-full">
      <p className="absolute top-0 right-0"></p>
      <span>
        <i
          onClick={back}
          className="m-2 text-lg cursor-pointer md:text-2xl fa fa-arrow-left"
        ></i>
      </span>
      <div className="grid grid-cols-1 gap-1 w-full max-h-[38rem] md:grid-cols-4 lg:grid-cols-5 overflow-hidden overflow-y-auto p-2">
        {filterProducts?.length > 0 ? (
          filterProducts.map((p) => (
            <div
              key={p?._id}
              className="flex mt-2 flex-col border border-gray-500 rounded-md h-[14rem] md:h-[18rem] overflow-hidden p-2"
            >
              {p?.image?.length > 1 ? (
                <img
                  src={
                    p?.image[Math.floor(Math.random() * p?.image.length)]?.url
                  }
                  alt={p?.product_name || "Product Image"}
                  onClick={() => navigate(`/product/${p?._id}`)}
                  className="object-contain w-full h-full cursor-pointer"
                />
              ) : (
                <img
                  src={p?.image[0]?.url}
                  alt={p?.name || "Product Image"}
                  onClick={() => navigate(`/product/${p?._id}`)}
                  className="object-contain w-full h-full cursor-pointer"
                />
              )}
              <p className="text-sm md:text-sm text-medium">
                {p?.product_name || "Unnamed Product"}
              </p>
              <div className="flex items-center justify-between w-full mb-1">
                <div className="flex items-center">
                  {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <FaStar
                        key={index}
                        className="text-lg text-yellow-400 md:text-2xl"
                      />
                    ))}
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
    </div>
  );
}
