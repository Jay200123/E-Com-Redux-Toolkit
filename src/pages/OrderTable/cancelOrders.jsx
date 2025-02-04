import {
  useGetOrdersQuery,
  useApprovedCancelOrderMutation,
} from "../../state/api/reducer";
import DataTable from "react-data-table-component";
import { FadeLoader } from "react-spinners";
import { tableCustomStyles } from "../../utils/tableCustomStyle";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";

export default function () {
  const navigate = useNavigate();
  const isFocused = useRef(true);

  const { data, isLoading, refetch } = useGetOrdersQuery();
  const orders = data?.details;
  const [approvedCancelOrder] = useApprovedCancelOrderMutation();

  const processedOrders = orders?.filter(
    (o) => o?.isCancelled === true && o?.isCancelApproved === true
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

  const handleApprove = async (id) => {
    if (window.confirm("Approve Cancel Request?")) {
      await approvedCancelOrder(id);
      refetch();
      toast.success("Cancel request approved successfully");
    }
  };

  const [order, setOrder] = useState("");

  const filteredOrders = processedOrders?.filter((o) =>
    o?.orderNumber?.toLowerCase()?.includes(order?.toLowerCase())
  );

  const columns = [
    {
      name: "OR Number",
      selector: (row) => row?.orderNumber,
      sortable: true,
    },
    {
      name: "User",
      selector: (row) => row?.user?.fullname,
      sortable: true,
    },
    {
      name: "Ordered Items",
      cell: (row) => {
        return (
          <ul className="space-y-1 text-sm list-disc list-inside">
            {row?.products?.map((p, index) => (
              <li className="truncate" key={index}>
                {p?.product?.product_name}{" "}
                <span className="font-medium">x {p?.quantity}</span>
              </li>
            ))}
          </ul>
        );
      },
    },
    {
      name: "Status",
      selector: (row) => row?.status,
      sortable: true,
    },
    {
      name: "Payment",
      selector: (row) => row?.payment,
      sortable: true,
    },
    {
      name: "Date Placed",
      selector: (row) =>
        new Date(row?.date_placed.toLocaleString()).toISOString().split("T")[0],
      sortable: true,
    },
    {
      name: "Date delivered",
      selector: (row) =>
        row?.date_delivered
          ? new Date(row?.date_delivered.toLocaleString())
              .toISOString()
              .split("T")[0]
          : "Not yet delivered",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center text-center">
          {row?.isCancelApproved ? (
            <FaCheck
              onClick={() => toast.error(" Cancel request already approved")}
              title="Approved Cancel Request"
              className="mr-1 text-xl text-grey-50"
            />
          ) : (
            <FaCheck
              onClick={() => handleApprove(row?._id)}
              title="Approved Cancel Request"
              className="mr-1 text-xl text-green-500"
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-full overflow-x-auto">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <FadeLoader color="#808080" loading={true} height={15} width={5} />
        </div>
      ) : (
        <div className="max-w-3xl m-4 rounded-md shadow-md md:max-w-5xl">
          <div className="w-full m-2">
            <input
              type="text"
              placeholder="Enter OR Number"
              onChange={(e) => setOrder(e.target.value)}
              className="p-2 text-sm border border-black rounded-md"
            />
          </div>
          <DataTable
            title="Cancelled Orders"
            columns={columns}
            data={filteredOrders || []}
            pagination
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
