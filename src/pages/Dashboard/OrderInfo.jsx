import { Bar } from "react-chartjs-2";
import { useGetOrdersQuery } from "../../state/api/reducer";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { FadeLoader } from "react-spinners";

export default function () {
  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
  const { data, isLoading } = useGetOrdersQuery();
  const orders = data?.details;

  const monthlyOrders = orders?.reduce((acc, order) => {
    const orderDate = new Date(order.date_placed);
    const month = orderDate.toLocaleString("default", { month: "long" });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const chartData = months?.map((month) => monthlyOrders?.[month] || 0);

  const finalData = {
    labels: months,
    datasets: [
      {
        label: "Number of Orders Per Month",
        data: chartData,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Orders Per Month",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full mt-2">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <FadeLoader color="#808080" loading={true} height={15} width={5} />
        </div>
      ) : (
        <>
          <h3 className="mb-4 text-lg font-bold text-center">
            Orders Per Month
          </h3>
          <Bar data={finalData} options={barOptions} />
        </>
      )}
    </div>
  );
}
