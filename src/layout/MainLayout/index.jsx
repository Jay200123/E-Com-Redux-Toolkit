import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../../components";

export default function () {
  return (
    <main className="flex flex-col justify-between min-h-screen transition-all duration-500 min-w-screen">
      <Navbar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}
