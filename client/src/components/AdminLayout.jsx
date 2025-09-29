import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { IoAddSharp } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";

const sidebarMenu = [
  { title: "Dashboard", icon: MdOutlineDashboard, link: "/admin" },
  { title: "Add Product", icon: IoAddSharp, link: "/admin/add-product" },
  { title: "Manage Product", icon: AiFillEdit, link: "/admin/manage-product" },
  { title: "Manage Order", icon: AiFillEdit, link: "/admin/manage-order" },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      <nav className="h-[60px] px-4 sm:px-10 flex justify-between items-center border-b border-gray-400 shadow">
        <h1 className="text-2xl text-slate-700 font-bold select-none">
          Clothify
        </h1>
        <div className="flex gap-5 items-center">
          <span className="border px-2 rounded-lg">admin</span>
          <span className="border px-2 text-red-600 rounded-lg cursor-pointer">
            logout
          </span>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Wrapper */}
        <div className="relative">
          <div
            className={`h-full bg-white border-r transition-all duration-300 ${
              sidebarOpen ? "w-[250px]" : "w-0"
            } overflow-hidden`}
          >
            <div className="p-4">
              <ul className="mt-3 space-y-4">
                {sidebarMenu.map((menu, i) => (
                  <NavLink
                  key={i}
                    to={menu.link}
                    end={menu.link === "/admin"}
                    className={({ isActive }) =>
                    `flex hover:bg-gray-100 p-2 ${ isActive && 'bg-gray-100' }`
                    }
                    // className="flex hover:bg-gray-100 p-2"
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="flex-1">{menu.title}</span>
                      <span className="text-lg">
                        <menu.icon />
                      </span>
                    </div>
                  </NavLink>
                ))}
              </ul>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-gray-300 p-2 rounded-full absolute -right-7 top-6 cursor-pointer shadow"
          >
            {sidebarOpen ? <FaArrowLeft /> : <FaArrowRight />}
          </button>
        </div>

        <div className="flex-1 px-10 sm:px-10 py-3 overflow-y-auto bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
