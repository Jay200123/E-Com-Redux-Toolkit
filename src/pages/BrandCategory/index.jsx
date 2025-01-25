import {
  useGetProductsQuery,
  useGetRatingsQuery,
  useGetBrandsQuery,
} from "../../state/api/reducer";
import { useDispatch, useSelector } from "react-redux";
import { setBrand, clearBrand } from "../../state/slice/category";
import { FaStar, FaCartPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { addCart } from "../../state/slice/cart";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useGetProductsQuery();
  const products = data?.details || [];

  const { data: ratings } = useGetRatingsQuery();
  const ratingData = ratings?.details || [];

  const { data: brands } = useGetBrandsQuery();
  const brandData = brands?.details || [];

  const brand = useSelector((state) => state.category.brand);
  const filter = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(setBrand(brand));
    return () => {
      dispatch(clearBrand());
    };
  });

  const allProductsWithRatings = products?.map((product) => {
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

  const matchFilters = allProductsWithRatings?.filter((p) => {
    const noFiltersApplied =
      !filter?.info?.name &&
      !filter?.info?.minPrice &&
      !filter?.info?.maxPrice &&
      !filter?.info?.brands.length &&
      !filter?.info?.ratings.length &&
      !filter?.info?.category;

    if (noFiltersApplied) {
      return true;
    }
    const matchName =
      !filter?.info?.name ||
      p?.product_name
        ?.toLowerCase()
        ?.includes(filter?.info?.name?.toLowerCase());

    const matchPrice =
      !filter?.info?.minPrice ||
      (p?.price >= filter?.info?.minPrice && !filter?.info?.maxPrice) ||
      p?.price <= filter?.info?.maxPrice;

    const matchBrand =
      !filter?.info?.brands?.length ||
      filter?.info?.brands?.includes(p?.brand?.brand_name);

    const matchRating =
      !filter?.info?.ratings?.length ||
      filter?.info?.ratings?.some(
        (rating) => Math.floor(p?.averageRating) === rating
      );

    const matchCategory =
      !filter?.info?.category || filter?.info?.category === p?.category;

    return (
      matchName && matchPrice && matchBrand && matchRating && matchCategory
    );
  });

  const filteredProducts = matchFilters?.filter((p) =>
    p?.brand?.brand_name?.toLowerCase()?.includes(brand?.toLowerCase())
  );

  const filteredBrand = brandData?.filter((b) => b?.brand_name === brand);

  const randomImage =
    filteredBrand[0]?.image[
      Math.floor(Math.random() * filteredBrand[0]?.image.length)
    ];

  const handleCart = (product, quantity) => {
    dispatch(addCart({ product, orderQty: quantity }));
    toast.success("Product added to cart");
  };

  const back = () => {
    dispatch(clearBrand());
    window.history.back();
  };

  return (
    <div className="relative w-full h-full p-2 transition-all duration-500">
      <div className="flex items-center justify-between w-full p-2 shadow-md">
        <img
          src={randomImage?.url}
          alt="Brand Image"
          className="w-full h-[8rem] md:h-[10rem] object-contain"
        />
      </div>
      <p className="absolute top-0 right-0"></p>
      <span>
        <i
          onClick={back}
          className="m-2 text-lg cursor-pointer md:text-2xl fa fa-arrow-left"
        ></i>
      </span>
      <div className="grid grid-cols-1 gap-1 w-full max-h-[38rem] md:grid-cols-4 lg:grid-cols-5 overflow-hidden overflow-y-auto p-2">
        {filteredProducts?.length > 0 ? (
          filteredProducts.map((p) => (
            <div
              key={p?._id}
              className="flex mt-2 flex-col  border border-gray-500 rounded-md h-[16rem] md:h-[18rem] overflow-hidden p-2"
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
              <p className="text-sm md:text-sm text-medium">
                ₱{p?.price || "Unknown Price"}
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
