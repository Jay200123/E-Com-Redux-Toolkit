import { useGetBrandsQuery } from "../../state/api/reducer";
import { FaStar } from "react-icons/fa";

export default function () {
  const { data } = useGetBrandsQuery();

  return (
    <div className="flex flex-col justify-between w-full h-full p-2 overflow-hidden">
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search Product..."
        className="w-full p-1 text-sm border border-gray-500 rounded-md"
      />
      <div className="mt-2">
        <h3 className="text-sm md:text-lg">Filter by Brand</h3>
        {data?.details?.map((b) => (
          <div key={b?._id} className="flex p-1">
            <input type="checkbox" className="cursor-pointer" />
            <span className="ml-1 text-xs text-black md:text-sm">{b?.brand_name}</span>
          </div>
        ))}
      </div>
      <div className="w-full mt-2">
        <h3 className="text-sm md:text-lg">Filter by Price</h3>
        <div className="flex p-2">
          <input
            type="text"
            id="min"
            name="min"
            placeholder="Min"
            className="w-1/2 p-1 mr-1 text-sm border border-gray-500 rounded-md"
          />
          <input
            type="text"
            id="max"
            name="max"
            placeholder="Max"
            className="w-1/2 p-1 text-sm border border-gray-500 rounded-md"
          />
        </div>
      </div>
      <div className="w-full mt-2">
        <h3 className="text-sm md:text-lg">Filter by Rating</h3>
        <div className="flex p-2">
          {[1, 2, 3, 4, 5].map((r) => (
            <FaStar key={r} className="text-yellow-500 cursor-pointer" />
          ))}
        </div>
        <div className="flex p-2">
          {[1, 2, 3, 4].map((r) => (
            <FaStar key={r} className="text-yellow-500 cursor-pointer" />
          ))}
        </div>
        <div className="flex p-2">
          {[1, 2, 3].map((r) => (
            <FaStar key={r} className="text-yellow-500 cursor-pointer" />
          ))}
        </div>
        <div className="flex p-2">
          {[1, 2].map((r) => (
            <FaStar key={r} className="text-yellow-500 cursor-pointer" />
          ))}
        </div>
        <div className="flex p-2">
          {[1].map((r) => (
            <FaStar key={r} className="text-yellow-500 cursor-pointer" />
          ))}
        </div>
      </div>
    </div>
  );
}
