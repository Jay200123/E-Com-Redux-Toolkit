import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../../components";

export default function () {
  return (
    <main className="flex min-h-screen transition-all duration-500 min-w-screen">
      <div className="md:w-[20%] hidden border border-black md:block transition-all duration-500 ease-in-out">
        <AdminSidebar />
      </div>
      <div className="w-full md:w-[80%] border border-black transition-all duration-500 ease-in-out">
        <Outlet />
      </div>
    </main>
  );
}
