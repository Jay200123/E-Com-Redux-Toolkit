import { useGetOrdersQuery } from "../../state/api/reducer";

export default function () {
  const { data, isLoading } = useGetOrdersQuery();
  const orders = data?.details || [];

  const orderPayments = orders?.reduce((acc, order) => {
    acc[order?.payment] = (acc[order?.payment] || 0) + 1;
    return acc;
  }, {});

  return <>Setting up payment dashboard!</>;
}
