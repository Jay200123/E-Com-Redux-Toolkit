import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../state/api/reducer";
import DataTable from "react-data-table-component";
import { tableCustomStyles } from "../../utils/tableCustomStyle";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";
import { FaEye, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function () {
  const navigate = useNavigate();
  const isFocused = useRef(true);
  const { data, isLoading, refetch } = useGetUsersQuery();
  const users = data?.details;
  const [deleteUser] = useDeleteUserMutation();
  const [findUser, setFindUser] = useState("");

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

  const auth = useSelector((state) => state.auth.user);
  const excludedUser = users?.filter((u) => u?._id !== auth?._id);

  const filteredUsers = excludedUser?.filter((u) =>
    u?.fullname.toLowerCase().includes(findUser.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
      toast.success("User deleted successfully");
    }
  };

  const columns = [
    {
      name: "Full Name",
      selector: (row) => row?.fullname,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row?.contact_number,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row?.address,
      sortable: true,
    },
    {
      name: "City",
      selector: (row) => row?.city,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row?.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row?.role,
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
      cell: (row) => (
        <div className="flex items-center">
          <FaEye
            onClick={() => navigate(`/user/${row?._id}`)}
            className="mr-1 text-lg text-green-500 cursor-pointer"
          />
          <FaTrash
            onClick={() => handleDelete(row?._id)}
            className="mr-1 text-lg text-red-500 cursor-pointer"
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
      viewport={{ visible: 1, once: false }}
      className="w-full md:h-[36rem]  rounded-sm overflow-x-auto"
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <FadeLoader color="#808080" loading={true} height={15} width={5} />
        </div>
      ) : (
        <div className="max-w-3xl m-4 rounded-md shadow-md md:max-w-5xl">
          <div className="flex flex-col items-center md:flex-row md:justify-end">
            <input
              type="text"
              placeholder="Search User"
              onChange={(e) => setFindUser(e.target.value)}
              className="p-2 text-sm border border-black rounded-md"
            />
          </div>
          <DataTable
            title="User Records"
            columns={columns}
            data={filteredUsers || []}
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
