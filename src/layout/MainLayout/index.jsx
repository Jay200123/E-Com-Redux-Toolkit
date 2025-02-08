import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../../components";
import { motion } from "framer-motion";

export default function () {
  return (
    <main className="flex flex-col justify-between min-h-screen transition-all duration-500 min-w-screen">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ visible: 1, once: false }}
      >
        <Navbar />
      </motion.div>

      <div>
        <Outlet />
      </div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ visible: 1, once: false }}
      >
        <Footer />
      </motion.div>
    </main>
  );
}
