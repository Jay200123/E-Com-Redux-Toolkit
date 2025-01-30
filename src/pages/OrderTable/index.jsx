import {
  useGetOrdersQuery,
  useDeleteOrderMutation,
  usePackedOrderMutation,
  useShippedOrderMutation,
  useDeliveredOrderMutation,
} from "../../state/api/reducer";
import DataTable from "react-data-table-component";
import { FadeLoader } from "react-spinners";
import { tableCustomStyles } from "../../utils/tableCustomStyle";
import { useNavigate } from "react-router-dom";
import { FaBox, FaShip, FaTruckMoving, FaTrash, FaEye } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";

export default function () {
  const navigate = useNavigate();
  const { data, isLoading } = useGetOrdersQuery();
  const orders = data?.details || [];

  const [packedOrder] = usePackedOrderMutation();
  const [shippedOrder] = useShippedOrderMutation();
  const [deliveredOrder] = useDeliveredOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const handlePackedOrder = async (id) => {
    if (window.confirm("Order packed?")) {
      await packedOrder(id);
      toast.success("Order packed successfully");
    }
  };

  const handleShippedOrder = async (id) => {
    if (window.confirm("Order Shipped?")) {
      await shippedOrder(id);
      toast.success("Order shipped successfully");
    }
  };

  const handleDeliverOrder = async (id) => {
    if (window.confirm("Order Shipped?")) {
      await deliveredOrder(id);
      toast.success("Order delivered successfully");
    }
  };

  const handleDelete = async (id) => { 
    if(window.confirm("Delete Order Record?")) { 
      await deleteOrder(id);
      toast.success("Order deleted successfully"); 
    }
  }

  const [order, setOrder] = useState("");

  const filteredOrders = orders?.filter((o) =>
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
          <FaBox
          onClick={() => handlePackedOrder(row?._id)} 
            title="Packed Order"
            className="mr-2 text-xl text-yellow-500"
          />
          <FaShip
            onClick={() => handleShippedOrder(row?._id)}
            title="Shipped Order"
            className="mr-2 text-xl text-blue-500"
          />
          <FaTruckMoving
            onClick={() => handleDeliverOrder(row?._id)}
            title="Deliver Order"
            className="mr-1 text-xl text-green-500"
          />
          <FaEye title="View Order" className="mr-1 text-xl text-gray-500" />

          <FaTrash
          onClick={() => handleDelete(row?._id)}
           title="Delete Order" className="mr-1 text-xl text-red-500" />
        </div>
      ),
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <FadeLoader color="#10B981" loading={isLoading} size={15} />
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
            title="Orders"
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
