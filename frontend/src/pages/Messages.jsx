import React from "react";
import { dummyConnectionsData } from "../assets/vibes-assets/assets/assets";
import { Eye, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Messages = () => {
  const navigate = useNavigate();
  return (
    <div className="p-5 space-y-6 mt-10 md:mt-0">
      <h1 className="font-bold text-3xl ">Messages</h1>
      <p className="text-gray-500">Talk to your friends and family</p>

      {dummyConnectionsData.map((user) => (
        <div
          key={user._id}
          className="bg-white shadow-sm p-3 flex gap-3 lg:max-w-3xl max-w-90 rounded-md mx-auto cursor-pointer hover:bg-purple-100 transition md:mx-0 relative"
        >
          <img
            src={user.profile_picture}
            alt="profile_pic"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-bold mb-1">{user.full_name}</p>
            <p className="text-gray-500">@{user.username}</p>
            <p className="text-gray-600">{user.bio}</p>
          </div>
          <div className="absolute right-3 top-3 flex  flex-col gap-3">
            <MessageSquare
              size={40}
              className="bg-gray-200 p-3 rounded-md hover:bg-gray-300 transition"
              onClick={() => {
                navigate(`/messages/${user._id}`);
              }}
            />
            <Eye
              size={40}
              className="bg-gray-200 p-3 rounded-md hover:bg-gray-300 transition"
              onClick={() => {
                navigate(`/profile/${user._id}`);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
