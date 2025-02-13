import { useParams } from "react-router-dom";
import {
  Page,
  Text,
  View,
  Document,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { Table, TD, TH, TR } from "@ag-media/react-pdf-table";
import { styles } from "../../utils/styles";
import { useGetOrderByIdQuery } from "../../state/api/reducer";
import { motion } from "framer-motion";

export default function () {
  const { id } = useParams();
  const { data } = useGetOrderByIdQuery(id);
  const order = data?.details;

  const back = () => {
    window.history.back();
  };

  const OrderInvoice = ({ order }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={[styles.title, styles.textBold]}>INVOICE</Text>
          <Text>Invoice #{order?.orderNumber}</Text>
        </View>
        <View style={styles.spaceY}>
          <Text style={styles.textBold}>Bill To:</Text>
          <Text>{order?.user.fullname}</Text>
          <Text>{order?.user.address}</Text>
          <Text>{order?.user.contact_number}</Text>
          <Text>{order?.user.email}</Text>
        </View>
        <Table style={styles.table}>
          <TH style={[styles.tableHeader, styles.textBold]}>
            <TD>Description</TD>
            <TD>Quantity</TD>
            <TD>Unit Price</TD>
            <TD>Total</TD>
          </TH>
          {order?.products?.map((item, index) => (
            <TR key={index}>
              <TD>{item?.product?.product_name}</TD>
              <TD>{item?.quantity}</TD>
              <TD>₱{item?.product?.price?.toFixed(2)}</TD>
              <TD>₱{item?.quantity * item?.product?.price}</TD>
            </TR>
          ))}
        </Table>
        <View style={styles.totals}>
          <Text style={styles.textBold}>
            Total: ₱{order?.price?.toFixed(2)}
          </Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.8,
            ease: "easeInOut",
          },
        }}
        className="flex flex-col w-full h-full"
      >
        <h3
          onClick={back}
          className="ml-1 text-sm text-left cursor-pointer md:text-lg"
        >
          <i className="mr-1 fa-solid fa-arrow-left"></i>Go Back
        </h3>
        <nav className="flex flex-col items-center w-full h-[10rem] md:h-[14rem] overflow-hidden bg-white shadow-md">
          <h3 className="space-x-2 text-sm md:text-2xl">Order Details</h3>
          <div className="w-full h-[4rem] items-center flex justify-between px-4 md:px-8">
            <h3 className="space-x-2 text-sm md:text-lg">
              Order ID: <span className="ml-1">{order?.orderNumber}</span>
            </h3>
            <div className="flex items-center p-2 m-1 text-white">
              <PDFDownloadLink
                document={<OrderInvoice order={order} />}
                fileName={`Invoice_${order?.orderNumber}.pdf`}
              >
                {({ loading }) => (
                  <motion.button
                    whileHover={{
                      scale: 0.9,
                      animate: {
                        scale: 0.9,
                        transition: {
                          duration: 0.3,
                          ease: "easeInOut",
                        },
                      },
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="p-1 mr-2 text-sm text-white transition-all duration-500 bg-blue-500 border border-gray-500 rounded-md md:p-2 md:font-medium md:text-lg hover:opacity-60"
                  >
                    <i className="mr-1 fa-solid fa-file-invoice"></i>
                    Generate Invoice
                  </motion.button>
                )}
              </PDFDownloadLink>
            </div>
          </div>
          <div className="w-full h-[4rem] items-center flex justify-between px-4 md:px-8">
            <h3 className="text-sm font-medium text-black md:text-lg md:font-bold">
              <i className="mr-1 fa-solid fa-calendar"></i>
              Date Placed:{" "}
              <span className="ml-1 font-medium underline text-md md:text-lg">
                {order
                  ? new Date(order.date_placed.toLocaleString())
                      .toISOString()
                      .split("T")[0]
                  : "Loading..."}
              </span>
            </h3>
            <h3 className="text-sm font-medium text-black md:text-lg md:font-bold">
              <i className="mr-1 fa-solid fa-calendar"></i>
              Order Subtotal:{" "}
              <span className="ml-1 font-medium underline text-md md:text-lg">
                ₱ {order?.price}
              </span>
            </h3>
          </div>
        </nav>
        {order?.products.map((p, index) => (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              transition: {
                duration: 0.8,
                ease: "easeInOut",
              },
            }}
            key={index}
            className="flex flex-col w-full p-1 border border-gray-400 shadow-sm md:flex-row"
          >
            <div className="flex w-[30%]">
              {p?.product?.image?.length > 1 ? (
                <img
                  className="object-contain w-40 h-40 md:w-60 md:h-60"
                  src={
                    p?.product?.image[
                      Math.floor(Math.random() * p?.product?.image.length)
                    ]?.url
                  }
                  alt="test image"
                />
              ) : (
                <img
                  className="object-contain w-40 h-40 md:w-60 md:h-60"
                  src={p?.product?.image[0]?.url || ""}
                  alt="image"
                />
              )}
            </div>
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between w-full p-2 mb-2">
                <h3 className="text-sm md:text-lg">
                  {p?.product?.product_name}
                </h3>
                <h3 className="text-sm md:text-lg"> ₱ {p?.product?.price}</h3>
              </div>
              <div className="w-full p-2 mb-2">
                <p className="text-xs md:text-sm">{p?.product?.description}</p>
              </div>
              <div className="flex items-center justify-end w-full p-2 mb-2">
                <h3 className="text-sm md:text-lg">Qty: x{p?.quantity}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
