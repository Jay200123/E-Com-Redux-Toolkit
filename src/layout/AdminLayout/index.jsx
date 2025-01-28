import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../../components";

export default function () {
  return (
    <main className="flex min-h-screen transition-all duration-500 min-w-screen">
      <div className="md:w-[20%] border border-gray-500 hidden md:block transition-all duration-500 ease-in-out">
        <AdminSidebar />
      </div>
      <div className="w-full p-2 md:w-[80%] transition-all duration-500 ease-in-out">
        <Outlet />
      </div>
    </main>
  );
}
