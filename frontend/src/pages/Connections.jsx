import React, { useState } from "react";
import {
  dummyConnectionsData,
  dummyFollowersData,
  dummyFollowingData,
  dummyPendingConnectionsData,
} from "../assets/vibes-assets/assets/assets";
import {
  MessageCircle,
  UserCheck,
  UserPen,
  UserPlus,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Connections = () => {
  const data = [
    {
      label: "Followers",
      count: dummyFollowersData.length,
      icon: <Users />,
    },
    {
      label: "Following",
      count: dummyFollowingData.length,
      icon: <UserCheck />,
    },
    {
      label: "Pending",
      count: dummyPendingConnectionsData.length,
      icon: <UserPen />,
    },
    {
      label: "Connections",
      count: dummyConnectionsData.length,
      icon: <UserPlus />,
    },
  ];

  const [tap, setTap] = useState("Followers");

  const tabDtatMap = {
    Followers: dummyFollowersData,
    Following: dummyFollowingData,
    Pending: dummyPendingConnectionsData,
    Connections: dummyConnectionsData,
  };
  const activeData = tabDtatMap[tap];
  const navigate = useNavigate();
  return (
    <div className="p-5 space-y-6 mt-10 md:mt-0 ">
      <h1 className="font-bold text-3xl">Connections</h1>
      <p className="text-gray-500">
        Manage your network and discover new connections
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4  gap-7">
        {data.map((state) => (
          <div className="bg-white shadow-md px-2.5 py-5 flex flex-col items-center rounded-md justify-center  ">
            <span className="font-bold">{state.count}</span>
            <span className="text-purple-900">{state.label}</span>
          </div>
        ))}
      </div>
      <div className=" mt-10 ">
        <ul className="flex gap-7 w-fit bg-white shadow p-5 rounded-md  border-gray-200 border-2  flex-wrap">
          {data.map((item) => (
            <li
              className={`flex gap-2 cursor-pointer hover:text-purple-900 transition ${tap === item.label ? "text-purple-900 font-bold" : "text-gray-600"}`}
              onClick={() => setTap(item.label)}
              key={`${item.label}`}
            >
              <span>{item.label}</span>
              {item.icon}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3 ">
        {activeData.map((user) => (
          <div
            key={user._id}
            className="bg-white shadow-sm p-3 flex gap-3 rounded-md  mx-auto cursor-pointer hover:bg-purple-100 transition md:mx-0 relative"
          >
            <img
              src={user.profile_picture}
              alt="profile_pic"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-bold mb-1">{user.full_name}</p>
              <p className="text-gray-500">@{user.username}</p>
              <p className="text-gray-600 line-clamp-1">{user.bio}</p>
              <div className=" flex gap-2.5 ">
                <button
                  className={`mt-3  p-2 bg-purple-900 rounded-md  hover:bg-purple-800 transition text-white  text-center cursor-pointer   flex-1`}
                  onClick={() => navigate(`/profile/${user._id}`)}
                >
                  View Profile
                </button>
                {tap === "Pending" && (
                  <button className="mt-3 p-2 bg-green-500 rounded-md  hover:bg-green-600 transition text-white  text-center cursor-pointer flex-1">
                    accept
                  </button>
                )}
                {tap === "Following" && (
                  <button className="mt-3 p-2 bg-red-500 rounded-md  hover:bg-green-600 transition text-white  text-center cursor-pointer flex-1">
                    Unfollow
                  </button>
                )}
                {tap === "Connections" && (
                  <button
                    className="flex items-center gap-2 mt-3 p-2 bg-gray-300 rounded-md hover:bg-gray-400 transition cursor-pointer flex-1"
                    onClick={() => {
                      navigate(`/messages/${user._id}`);
                    }}
                  >
                    <span>Message</span>
                    <MessageCircle size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
