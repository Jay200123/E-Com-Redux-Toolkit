import { Bar } from "react-chartjs-2";
import { useGetProductsQuery } from "../../state/api/reducer";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useRef } from "react";
import { FadeLoader } from "react-spinners";

export default function () {
  const isFocused = useRef(true);

  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
  const { data, isLoading, refetch } = useGetProductsQuery();
  const products = data?.details || [];

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

  const category = products?.reduce((acc, product) => {
    acc[product?.category] = (acc[product?.category] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(category),
    datasets: [
      {
        label: "Number of Products",
        data: Object.values(category),
        backgroundColor: ["#4caf50", "#2196f3", "#f44336", "#ff9800"],
        borderColor: ["#4caf50", "#2196f3", "#f44336", "#ff9800"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full md:w-1/2 m-4 flex items-center justify-center max-h-[250px] md:h-[350px]">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <FadeLoader color="#808080" loading={true} height={15} width={5} />
        </div>
      ) : (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
            },
          }}
        />
      )}
    </div>
  );
}
