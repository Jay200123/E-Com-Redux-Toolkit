import { useGetOrdersQuery } from "../../state/api/reducer";
import generateRandomColors from "../../utils/randomColors";
import { FadeLoader } from "react-spinners";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

export default function () {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const { data, isLoading } = useGetOrdersQuery();
  const orders = data?.details || [];

  const orderStatus = orders?.reduce((acc, order) => {
    acc[order?.status] = (acc[order?.status] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(orderStatus),
    datasets: [
      {
        label: "Orders by payment method",
        data: Object.values(orderStatus),
        backgroundColor: generateRandomColors(Object.keys(orderStatus).length),
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const brand = tooltipItem.label;
            const count = tooltipItem.raw;
            return `${brand}: ${count} products`;
          },
        },
      },
    },
  };

  return (
    <div className="w-1/2 m-4 flex items-center justify-center max-h-[250px] md:h-[350px]">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <FadeLoader color="#808080" loading={true} height={15} width={5} />
        </div>
      ) : (
        <>
          <Pie data={chartData} options={pieOptions} />
        </>
      )}
    </div>
  );
}
