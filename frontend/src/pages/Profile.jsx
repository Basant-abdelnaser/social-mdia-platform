import React, { useState } from "react";
import { dummyUserData } from "../assets/vibes-assets/assets/assets";
import { Calendar, Link, MapPin, SquarePen } from "lucide-react";
import moment from "moment";
import PostCard from "../components/PostCard";
import { useParams } from "react-router-dom";
import UserProfileInfo from "../components/userProfileInfo";

const Profile = () => {
  const [activeButton, setActiveButton] = useState("Posts");
  const { profileId } = useParams();
  const [modal, setModal] = useState(false);

  const tabs = ["Posts", "Likes", "Media"];

  const userData = [
    {
      name: "Posts",
      count: dummyUserData.posts.length,
    },
    {
      name: "Following",
      count: dummyUserData.following.length,
    },
    {
      name: "Followers",
      count: dummyUserData.followers.length,
    },
  ];

  return (
    <div className="w-full lg:w-3/4 mx-auto px-3 lg:px-0">
      {/* Profile Card */}
      <div className="rounded-md shadow-xl bg-white overflow-hidden mt-15 lg:mt-0">
        {/* Cover + Profile */}
        <div className="relative h-64 sm:h-72 lg:h-80">
          <img
            src={dummyUserData.cover_photo}
            alt="cover photo"
            className="h-full w-full object-cover"
          />

          <img
            src={dummyUserData.profile_picture}
            alt="profile"
            className="absolute -bottom-16 sm:-bottom-20 left-5 sm:left-10 w-28 sm:w-36 lg:w-40 aspect-square rounded-full border-4 border-white object-cover"
          />
        </div>

        {/* Info */}
        <div className="px-5 sm:px-6 pt-20 sm:pt-24 lg:pt-5 lg:pl-60 pb-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
            <div className="min-w-0">
              <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl break-words">
                {dummyUserData.full_name}
              </h1>

              <h2 className="text-gray-500 font-bold mt-2 text-sm sm:text-base break-all">
                @{dummyUserData.username}
              </h2>
            </div>

            <button
              onClick={() => setModal(true)}
              className="border border-gray-500 rounded-md px-4 py-2 flex gap-2 cursor-pointer hover:bg-gray-500 hover:text-white transition w-fit items-center shrink-0"
            >
              <SquarePen size={18} />
              <span>Edit</span>
            </button>
          </div>

          <p className="mt-4 text-sm sm:text-base wrap-break-word">
            {dummyUserData.bio}
          </p>

          {/* Meta */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-8 my-5">
            <p className="flex items-center gap-2 text-gray-500 text-sm">
              <MapPin size={16} />
              <span>{dummyUserData.location}</span>
            </p>

            <p className="flex items-center gap-2 text-gray-500 text-sm">
              <Calendar size={16} />
              <span>
                joined{" "}
                <span className="font-bold">
                  {moment(dummyUserData.createdAt).fromNow()}
                </span>
              </span>
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* Stats */}
          <div className="flex flex-wrap gap-6 sm:gap-10 mt-5">
            {userData.map((data, index) => (
              <div key={index} className="flex gap-2">
                <span className="font-bold text-sm sm:text-base lg:text-lg">
                  {data.count}
                </span>
                <span className="text-sm sm:text-base lg:text-lg">
                  {data.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="p-3 bg-white rounded-md shadow-xl w-full lg:w-1/2 mx-auto my-5">
        <ul className="flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <li
              key={tab}
              onClick={() => setActiveButton(tab)}
              className={`${
                activeButton === tab
                  ? "bg-purple-900 text-white"
                  : "text-gray-700"
              } px-6 sm:px-10 py-2 rounded-md cursor-pointer transition hover:bg-purple-900 hover:text-white`}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>

      {/* Posts */}
      {activeButton === "Posts" && (
        <div className="space-y-4  ">
          {dummyUserData.posts.map((post) => (
            <div key={post._id}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      )}
      {activeButton === "Media" && (
        <div className="flex flex-wrap justify-center gap-4">
          {dummyUserData.posts
            .filter((post) => post.image_urls.length > 0)
            .map((post) => (
              <div key={post._id} className="grid gap-2">
                {post.image_urls.map((url, index) => (
                  <a
                    key={`${post._id}-${index}`}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="relative group ">
                      <img
                        src={url}
                        alt="post"
                        className="w-md object-cover rounded-md"
                      />

                      <p className="absolute bottom-2 right-2 text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition bg-purple-500 px-2 py-1 rounded-md">
                        {moment(post.createdAt).fromNow()}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            ))}
        </div>
      )}

      {/* Modal */}
      {modal && <UserProfileInfo setModal={setModal} />}
    </div>
  );
};

export default Profile;
