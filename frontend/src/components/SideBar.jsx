import {
  House,
  LogOut,
  MessageCircle,
  Rss,
  Search,
  SquarePlus,
  User,
  UsersRound,
  Menu,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { dummyUserData } from "../assets/vibes-assets/assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useClerk, UserButton } from "@clerk/react";

const SideBar = () => {
  const [open, setOpen] = useState(false);
  const { signOut } = useClerk();

  const menuItemsData = [
    { to: "/", label: "Feed", Icon: House },
    {
      to: `/messages`,
      label: "Messages",
      Icon: MessageCircle,
    },
    { to: "/connections", label: "Connections", Icon: UsersRound },
    { to: "/discover", label: "Discover", Icon: Search },
    { to: `/profile/${dummyUserData._id}`, label: "Profile", Icon: User },
   
  ];

  const handleLogout = async () => {
    await signOut();
  };

  const MenuItems = ({ onClick }) => (
    <ul className="mt-6">
      {menuItemsData.map((item, index) => (
        <NavLink to={item.to} key={index} end={item.to === "/"}>
          {({ isActive }) => (
            <li
              onClick={onClick}
              className={`flex gap-2 p-3 rounded-md cursor-pointer transition duration-300
              ${
                isActive
                  ? "bg-purple-100 text-purple-900 font-semibold"
                  : "hover:bg-purple-100 hover:text-purple-900"
              }`}
            >
              <item.Icon />
              <span>{item.label}</span>
            </li>
          )}
        </NavLink>
      ))}
    </ul>
  );

  return (
    <>
      {/* Top bar (mobile only) */}
      <div className="sm:hidden flex justify-end p-4 bg-gray-100 fixed  rounded-3xl">
        <button onClick={() => setOpen(true)}>
          <Menu />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden sm:flex p-5 min-h-screen bg-gray-100 w-68 shadow-4xl flex-col">
        <SidebarContent MenuItems={MenuItems} handleLogout={handleLogout} />
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          {/* drawer */}
          <div className="relative w-72 bg-gray-100 h-full p-5 shadow-xl z-50">
            <button
              className="absolute top-4 right-4"
              onClick={() => setOpen(false)}
            >
              <X />
            </button>

            <SidebarContent
              MenuItems={MenuItems}
              handleLogout={handleLogout}
              onItemClick={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

const SidebarContent = ({ MenuItems, handleLogout, onItemClick }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen fixed w-60 overflow-y-auto">
      {/* Logo */}
      <div>
        <div className="flex gap-2 text-2xl font-bold text-purple-900 py-4 px-3">
          <Rss size={28} />
          <span>Vibez</span>
        </div>
        <hr className="w-full h-1 text-gray-200" />
      </div>

      {/* menu */}
      <div className="flex-1 overflow-y-auto">
        <MenuItems onClick={onItemClick} />

        <button
          className="w-full p-2 bg-purple-900 rounded-lg flex gap-2 hover:bg-purple-800 transition text-white justify-center items-center cursor-pointer mt-3"
          onClick={() => {
            navigate("/create-post");
          }}
        >
          <SquarePlus />
          <span>Create Post</span>
        </button>
      </div>

      {/* user */}
      <div className="mb-5">
        <hr className="w-full h-1 text-gray-200" />
        <div className="flex items-center justify-between">
          <div className="flex gap-2 p-3 items-center">
            <UserButton />
            <div>
              <p className="font-bold text-sm">{dummyUserData.full_name}</p>
              <p className="text-xs text-gray-500">@{dummyUserData.username}</p>
            </div>
          </div>

          <LogOut
            className="text-gray-600 cursor-pointer"
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
