import { useGetRatingsQuery, useDeleteRatingMutation } from "../../state/api/reducer";
import DataTable from "react-data-table-component";
import { FadeLoader } from "react-spinners";
import { FaEye, FaTrash } from "react-icons/fa";
import { tableCustomStyles } from "../../utils/tableCustomStyle";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function () {
  const navigate = useNavigate();
  const isFocused = useRef(true);

  const { data, isLoading, refetch } = useGetRatingsQuery();
  const ratings = data?.details;
  const [orderNumber, setOrderNumber] = useState("");

  const filteredRatings = ratings?.filter((r) =>
    r?.order?.orderNumber.toLowerCase()?.includes(orderNumber.toLowerCase())
  );

  useEffect(() => {
    const handleFocus = () => {
      isFocused.current = true;
      refetch();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [refetch]);

  const columns = [
    {
      name: "Order Number",
      selector: (row) => row?.order?.orderNumber,
      sortable: true,
    },
    {
      name: "User",
      selector: (row) => row?.user?.fullname,
      sortable: true,
    },
    {
      name: "Product",
      selector: (row) => row?.product?.product_name,
      sortable: true,
    },
    {
      name: "Product Image",
      cell: (row) => {
        return (
          <div className="flex justify-center">
            <img
              src={
                row?.product?.image[
                  Math.floor(Math.random() * row?.product?.image?.length)
                ]?.url
              }
              className="object-contain w-16 h-16 md:w-20 md:h-20"
              alt="product"
            />
          </div>
        );
      },
    },
    {
      name: "Description",
      cell: (row) => (
        <div className="w-40 truncate">
          <p className="text-xs md:text-sm">{row?.description}</p>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Rating",
      cell: (row) => {
        return (
          <div className="flex items-center">
            {Array.from({ length: row?.rating }).map((_, index) => (
              <i key={index} className="text-yellow-500 fa-solid fa-star"></i>
            ))}
          </div>
        );
      },
    },
    {
      name: "Image",
      cell: (row) => {
        return (
          <img
            src={
              row?.image[Math.floor(Math.random() * row?.image?.length)]?.url
            }
            class
            Name="object-contain w-16 h-16 md:w-20 md:h-20"
          />
        );
      },
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center">
          <FaEye className="mr-1 text-lg text-green-500 cursor-pointer" />
          <FaTrash className="mr-1 text-lg text-red-500 cursor-pointer" />
        </div>
      ),
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <FadeLoader color="#808080" loading={true} height={15} width={5} />
        </div>
      ) : (
        <div className="max-w-3xl rounded-md shadow-md md:max-w-5xl">
          <div className="flex justify-end">
            <input
              type="text"
              placeholder="Search by Order Number"
              className="p-2 text-sm border border-black rounded-md"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
            />
          </div>
          <DataTable
            title="Rating Records"
            columns={columns}
            data={filteredRatings || []}
            highlightOnHover
            pointerOnHover
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 20, 30]}
            customStyles={tableCustomStyles}
          />
        </div>
      )}
    </div>
  );
}
