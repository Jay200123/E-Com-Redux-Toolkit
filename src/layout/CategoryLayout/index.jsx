import { Sidebar } from "../../components";
import { Outlet } from "react-router-dom";

export default function () {
  return (
    <main className="flex min-w-full min-h-screen md:flex-row">
      <div className="w-[40%] md:w-[20%] transition-all duration-500 ease-in-out">  
        <Sidebar />
      </div>
      <div className="w-[70%] border-black transition-all duration-500 ease-in-out">
        <Outlet />
      </div>
    </main>
  );
}
