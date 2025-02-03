import DataTable from "react-data-table-component";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../../state/api/reducer";
import { FadeLoader } from "react-spinners";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { tableCustomStyles } from "../../utils/tableCustomStyle";
import { useState, useEffect, useRef } from "react";

export default function () {
  const navigate = useNavigate();
  const isFocused = useRef(true);

  const { data, isLoading, refetch } = useGetProductsQuery();
  const products = data?.details || [];
  const [deleteProduct] = useDeleteProductMutation();
  const [findProduct, setProduct] = useState("");

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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      toast.success("Product Successfully Deleted");
      refetch();
    }
  };

  const filteredProducts = products?.filter((p) =>
    p?.product_name.toLowerCase()?.includes(findProduct.toLowerCase())
  );

  const columns = [
    {
      name: "Brand",
      selector: (row) => row?.brand?.brand_name,
      sortable: true,
    },
    {
      name: "Product Name",
      selector: (row) => row?.product_name,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row?.price,
      sortable: true,
    },
    {
      name: "Description",
      cell: (row) => {
        return (
          <div className="w-40 truncate">
            <p className="text-xs md:text-sm">{row?.description}</p>
          </div>
        );
      },
    },
    {
      name: "Category",
      selector: (row) => row?.category,
      sortable: true,
    },
    {
      name: "Quantity ",
      selector: (row) => row?.quantity,
      sortable: true,
    },
    {
      name: "New Product",
      selector: (row) => (row?.isNewlyCreated ? "Yes" : "No"),
      sortable: true,
    },
    {
      name: "Image",
      cell: (row) => {
        return (
          <div className="flex justify-center p-1">
            <img
              src={
                row?.image[Math.floor(Math.random() * row?.image?.length)]?.url
              }
              alt={
                row?.image[Math.floor(Math.random() * row?.image?.length)]
                  ?.originalname
              }
              className="object-contain rounded-sm h-14 w-14 md:w-20 md:h-20"
            />
          </div>
        );
      },
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <div className="flex items-center text-center">
            <FaEye 
            onClick={() => navigate(`/product/view/${row?._id}`)} 
            className="mr-2 text-lg text-green-500 cursor-pointer" />
            <FaEdit
              onClick={() => navigate(`/product/edit/${row?._id}`)}
              className="mr-2 text-lg text-blue-500 cursor-pointer"
            />
            <FaTrash
              onClick={() => handleDelete(row?._id)}
              className="mr-2 text-lg text-red-500 cursor-pointer"
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-full overflow-x-auto rounded-sm">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <FadeLoader color="#808080" loading={true} height={15} width={5} />
        </div>
      ) : (
        <div className="max-w-3xl m-4 rounded-md shadow-md md:max-w-5xl">
          <div className="flex flex-col items-center md:flex-row md:justify-between">
            <button
              onClick={() => navigate("/create/product")}
              className="text-[1rem] mb-2 p-2 bg-black border transition-all duration-500 hover:opacity-75 rounded-md text-white mt-4"
            >
              <i className="mr-1 fa-solid fa-plus"></i> Create Product
            </button>
            <input
              type="text"
              placeholder="Search Product"
              onChange={(e) => setProduct(e.target.value)}
              className="p-2 text-sm border border-black rounded-md"
            />
          </div>
          <DataTable
            title="Product Records"
            columns={columns}
            data={filteredProducts || []}
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
