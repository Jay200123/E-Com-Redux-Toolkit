import DataTable from "react-data-table-component";
import {
  useGetBrandsQuery,
  useDeleteBrandMutation,
} from "../../state/api/reducer";
import { FadeLoader } from "react-spinners";
import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { tableCustomStyles } from "../../utils/tableCustomStyle";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function () {
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useGetBrandsQuery();
  const brands = data?.details || [];
  const [deleteBrand] = useDeleteBrandMutation();
  const [findBrand, setFindBrand] = useState("");

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

  const filteredBrands = brands?.filter((b) =>
    b.brand_name.toLowerCase().includes(findBrand.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      await deleteBrand(id);
      toast.success("Brand Successfully Deleted");
      refetch();
    }
  };

  const columns = [
    {
      name: "Brand",
      selector: (row) => row?.brand_name,
      sortable: true,
    },
    {
      name: "Image",
      cell: (row) => {
        const randomImage = row?.image?.length
          ? row?.image[Math.floor(Math.random() * row?.image?.length)]
          : null;

        return (
          <div className="flex justify-center p-1">
            <img
              src={randomImage?.url}
              alt={randomImage?.originalname}
              className="object-contain rounded-sm h-14 w-14 md:w-20 md:h-20"
            />
          </div>
        );
      },
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center text-center">
          <FaEye
            onClick={() => navigate(`/brand/${row?._id}`)}
            className="mr-2 text-lg text-green-500 cursor-pointer"
          />
          <FaPencilAlt
            onClick={() => navigate(`/edit/brand/${row?._id}`)}
            className="mr-2 text-lg text-blue-500 cursor-pointer"
          />
          <FaTrash
            onClick={() => handleDelete(row?._id)}
            className="mr-2 text-lg text-red-500 cursor-pointer"
          />
        </div>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      viewport={{ visible: 0.8, once: false }}
      className="w-full overflow-x-auto rounded-sm"
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <FadeLoader color="#808080" loading={true} height={15} width={5} />
        </div>
      ) : (
        <div className="max-w-3xl m-4 rounded-md shadow-md md:max-w-5xl">
          <div className="flex flex-col items-center md:flex-row md:justify-between">
            <button
              onClick={() => navigate("/create/brand")}
              className="text-[1rem] mb-2 p-2 bg-black border transition-all duration-500 hover:opacity-75 rounded-md text-white mt-4"
            >
              <i className="mr-1 fa-solid fa-plus"></i> Create Brand
            </button>
            <input
              type="text"
              placeholder="Search Brand"
              onChange={(e) => setFindBrand(e.target.value)}
              className="p-2 text-sm border border-black rounded-md"
            />
          </div>
          <DataTable
            title="Brand Records"
            columns={columns}
            data={filteredBrands || []}
            pagination
            highlightOnHover
            pointerOnHover
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 20, 30]}
            customStyles={tableCustomStyles}
          />
        </div>
      )}
    </motion.div>
  );
}
