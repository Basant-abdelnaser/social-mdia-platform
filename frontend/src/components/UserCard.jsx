import React from "react";
import { dummyUserData } from "../assets/vibes-assets/assets/assets";
import { MapPinHouse, MessageCircle, SquarePlus, UserPlus } from "lucide-react";
const UserCard = ({ user }) => {
  const currentUser = dummyUserData;
  return (
    <div className="bg-white shadow-sm p-3 flex gap-3 flex-col border-2 border-gray-200 rounded-lg">
      <img
        src={user.profile_picture}
        alt=""
        className="w-15 h-15 rounded-full"
      />
      <p className="font-bold ">{user.full_name}</p>
      <p className="text-gray-500">@{user.username}</p>
      <p className="text-gray-600">{user.bio}</p>
      <div className="flex gap-3">
        <button className=" px-2 rounded-full border border-gray-200  flex items-center gap-2  text-xs">
          <span>{user.location}</span>
          <MapPinHouse size={15} />
        </button>
        <button className=" p-2  border border-gray-200 transition rounded-full text-xs ">
          {user.followers.length} followers
        </button>
      </div>
      <div className="flex gap-3">
        <button className=" p-2 bg-purple-900 rounded-lg  hover:bg-purple-800 transition text-white cursor-pointer mt-3 flex-1">
          {currentUser.following.includes(user._id) ? (
            <span>Following</span>
          ) : (
            <div className="flex gap-2 items-center justify-center">
              <UserPlus />
              <span>Follow</span>
            </div>
          )}
        </button>
        <button className=" py-2 px-4 bg-gray-300 rounded-lg  flex justify-center items-center mt-3 hover:bg-gray-200 transition cursor-pointer">
          {currentUser.following.includes(user._id) ? (
            <MessageCircle />
          ) : (
            <SquarePlus />
          )}
        </button>
      </div>
    </div>
  );
};

export default UserCard;
