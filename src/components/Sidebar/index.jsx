import { useGetBrandsQuery } from "../../state/api/reducer";
import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../state/slice/filter";

export default function () {
  const dispatch = useDispatch();
  const { data } = useGetBrandsQuery();

  const category = useSelector((state) => state.category?.brand);
  const shop = useSelector((state) => state.category);
  const brands = data?.details;

  const hasCategory = category ? true : false;
  const hasShop = shop?.isShop ? true : false;

  const includedBrands = brands?.filter((b) => b?.brand_name !== category);

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const [findBrand, setBrand] = useState([]);

  const handleSelectBrand = (brand) => {
    setBrand((prev) =>
      prev?.includes(brand)
        ? prev?.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const handleMinPrice = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPrice = (e) => {
    setMaxPrice(e.target.value);
  };

  const [selectedRatings, setSelectedRatings] = useState([]);

  const handleRatingClick = (rating) => {
    setSelectedRatings((prevRatings) =>
      prevRatings.includes(rating)
        ? prevRatings.filter((r) => r !== rating)
        : [...prevRatings, rating]
    );
  };

  const [type, setType] = useState("");

  const handleType = (type) => {
    setType((prev) => (prev === type ? "" : type));
  };

  const variety = ["Computer", "Laptop", "Mobile"];

  useEffect(() => {
    dispatch(
      setFilter({
        search: search,
        minPrice: minPrice,
        maxPrice: maxPrice,
        findBrand: findBrand,
        selectedRatings: selectedRatings,
        category: type,
      })
    );
    return () => {};
  }, [search, minPrice, maxPrice, findBrand, selectedRatings, type]);

  return (
    <div className="flex flex-col justify-between w-full h-full p-2 overflow-hidden">
      <input
        type="text"
        id="search"
        onChange={handleSearch}
        name="search"
        placeholder="Search Product..."
        className="w-full p-1 text-sm border border-gray-500 rounded-md"
      />

      {hasShop ? (
        <>
          <div className="mt-2">
            <h3 className="text-sm md:text-lg">Filter by Device</h3>
            {variety?.map((b, index) => (
              <div key={index} className="flex p-1">
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  checked={type === b}
                  onChange={() => handleType(b)}
                />
                <span className="ml-1 text-xs text-black md:text-sm">{b}</span>
              </div>
            ))}
          </div>
          <div className="mt-2">
            <h3 className="text-sm md:text-lg">Filter by Brand</h3>
            {includedBrands?.map((b) => (
              <div key={b?._id} className="flex p-1">
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  checked={findBrand?.includes(b?.brand_name)}
                  onChange={() => handleSelectBrand(b?.brand_name)}
                />
                <span className="ml-1 text-xs text-black md:text-sm">
                  {b?.brand_name}
                </span>
              </div>
            ))}
          </div>
        </>
      ) : hasCategory ? (
        <>
          <div className="mt-2">
            <h3 className="text-sm md:text-lg">Filter by Device</h3>
            {variety?.map((b, index) => (
              <div key={index} className="flex p-1">
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  checked={type === b}
                  onChange={() => handleType(b)}
                />
                <span className="ml-1 text-xs text-black md:text-sm">{b}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="mt-2">
          <h3 className="text-sm md:text-lg">Filter by Brand</h3>
          {includedBrands?.map((b) => (
            <div key={b?._id} className="flex p-1">
              <input
                type="checkbox"
                className="cursor-pointer"
                checked={findBrand?.includes(b?.brand_name)}
                onChange={() => handleSelectBrand(b?.brand_name)}
              />
              <span className="ml-1 text-xs text-black md:text-sm">
                {b?.brand_name}
              </span>
            </div>
          ))}
        </div>
      )}
      
      <div className="w-full mt-2">
        <h3 className="text-sm md:text-lg">Filter by Price</h3>
        <div className="flex p-2">
          <input
            type="text"
            id="min"
            name="min"
            onChange={handleMinPrice}
            placeholder="Min"
            className="w-1/2 p-1 mr-1 text-sm border border-gray-500 rounded-md"
          />
          <input
            type="text"
            id="max"
            name="max"
            onChange={handleMaxPrice}
            placeholder="Max"
            className="w-1/2 p-1 text-sm border border-gray-500 rounded-md"
          />
        </div>
      </div>
      <div className="w-full mt-2">
        <h3 className="text-sm md:text-lg">Filter by Rating</h3>
        <div className="flex flex-col">
          {[5, 4, 3, 2, 1]?.map((rating) => (
            <div
              key={rating}
              className="flex items-center mb-2 cursor-pointer"
              onClick={() => handleRatingClick(rating)}
            >
              <div className="flex">
                {[...Array(rating)]?.map((_, index) => (
                  <FaStar
                    key={index}
                    className={`${
                      selectedRatings.includes(rating)
                        ? "text-yellow-500"
                        : "text-gray-400"
                    } transition-all duration-500`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
