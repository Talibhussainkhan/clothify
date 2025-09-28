import { Link, NavLink } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";

const Navbar = () => {
  const [showMobileSide, setShowMobileSide] = useState(false);
  return (
    <div className="py-3 max-w-7xl 2xl:max-w-[1500px] mx-auto border-b border-gray-300 px-5 sm:px-3">
      <div className="flex justify-between items-center">
        <Link to={'/'}>
        <h1 className="text-2xl text-slate-700 font-bold select-none">Clothify</h1>
        </Link>
        <div className="flex-1 px-4 hidden sm:block">
          <div className="border border-gray-400 mx-auto px-3 py-2 rounded-lg  max-w-md flex items-center">
            <input
              type="text"
              className="outline-none flex-1"
              placeholder="Search Products...."
            />
            <span>
              <CiSearch />
            </span>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${
                isActive ? "border-b-2 border-slate-700" : "hover:underline"
              } hidden sm:block`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${
                isActive ? "border-b-2 border-slate-700" : "hover:underline"
              } hidden sm:block`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/product"
            className={({ isActive }) =>
              `${
                isActive ? "border-b-2 border-slate-700" : "hover:underline"
              } hidden sm:block`
            }
          >
            Products
          </NavLink>
          <Link to={"/cart"} className="relative">
            <FaCartPlus className="text-xl" />
            <span className="text-xs bg-slate-700 text-white px-1 py-[1px]  absolute -top-4 -right-2 rounded-full">
              0
            </span>
          </Link>

          {/* mobile humbuger and resposive sidebar */}
          <div onClick={() => setShowMobileSide(!showMobileSide)}>
            <IoMenu className="text-3xl block sm:hidden" />
          </div>
        </div>
      </div>
      {/*  Mobile Sidebar */}
      <div
        className={`absolute top-0 left-0 bottom-0 w-60 transition-all duration-300
        ${showMobileSide ? "translate-x-0" : "-translate-x-100"}    
        bg-slate-700 text-white flex sm:hidden flex-col py-10 px-5 gap-2 text-3xl 
        `}
      >
        <Link to={"/"} onClick={() => setShowMobileSide(false)}>
          <h1 className="text-2xl text-white font-bold mb-5">Clothify</h1>
        </Link>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${isActive ? "border-b-2 border-white w-fit" : "hover:underline"}`
          }
          onClick={() => setShowMobileSide(false)}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${isActive ? "border-b-2 border-white w-fit" : "hover:underline"}`
          }
          onClick={() => setShowMobileSide(false)}
        >
          About
        </NavLink>
        <NavLink
          to="/product"
          className={({ isActive }) =>
            `${isActive ? "border-b-2 border-white w-fit" : "hover:underline"}`
          }
          onClick={() => setShowMobileSide(false)}
        >
          Products
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
