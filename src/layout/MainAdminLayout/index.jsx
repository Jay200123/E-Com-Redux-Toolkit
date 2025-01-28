import { Outlet } from "react-router-dom";
import { AdminNavbar, Footer } from "../../components";

export default function () {
  return (
    <main className="flex flex-col justify-between min-h-screen transition-all duration-500 min-w-screen">
      <AdminNavbar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}
