import { useGetProductsQuery } from "../../state/api/reducer";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FadeLoader } from "react-spinners";
import generateRandomColors from "../../utils/randomColors"; 

export default function () {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const { data, isLoading } = useGetProductsQuery();
  const products = data?.details || [];

  const productBrands = products?.reduce((acc, product) => {
    const brand = product?.brand?.brand_name;
    acc[brand] = acc[brand] ? acc[brand] + 1 : 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(productBrands),
    datasets: [
      {
        label: "Products for each brand",
        data: Object.values(productBrands),
        backgroundColor: generateRandomColors(
          Object.keys(productBrands).length
        ),
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
