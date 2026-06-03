import React, { useState } from "react";
import {
  assets,
  dummyPostsData,
  dummyRecentMessagesData,
} from "../assets/vibes-assets/assets/assets";
import Loading from "../components/Loading";
import StoriesBar from "../components/StoriesBar";

import PostCard from "../components/PostCard";
import moment from "moment";
import { Link } from "react-router-dom";

const Feed = () => {
  const [feeds] = useState(dummyPostsData);
  // const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* {loading && <Loading />} */}
      {/* {!loading && ( */}
      <div className=" flex flex-col gap-6 p-5 mx-auto md:mx-0 ">
        <div>
          <StoriesBar />
        </div>
        <div className="space-y-6 ">
          {feeds.map((post) => (
            <div key={post._id} className="max-w-3xl">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </div>
      {/*right side  */}
      <div className=" hidden lg:flex flex-col gap-7 p-5 max-w-sm fixed right-0 top-0">
        <div className="bg-white rounded-2xl p-3 shadow-sm ">
          <h1 className="font-bold py-3">Sponsered</h1>
          <img src={assets.sponsored_img} alt="" className="rounded-md" />
          <h2 className="py-3  text-md">Email marketing</h2>
          <p className="text-gray-500 text-sm">
            Supercharge your marketing with a powerful, easy-to-use platform
            built for users
          </p>
        </div>
        <div className="bg-white rounded-2xl p-3 shadow-sm ">
          <h1 className="font-bold py-3">Recent Messages</h1>
          <div className="space-y-3">
            {dummyRecentMessagesData.map((message) => (
              <Link
                to={`/messages/${message.from_user_id._id}`}
                key={message._id}
                className="block"
              >
                <div
                  key={message._id}
                  className="flex justify-between hover:bg-purple-200 p-2 transition rounded-md cursor-pointer"
                >
                  <div className="flex gap-3 items-center">
                    <img
                      src={message.from_user_id.profile_picture}
                      alt=""
                      className="h-11 w-11 rounded-full"
                    />
                    <div>
                      <p className="font-bold text-sm">
                        {message.from_user_id.full_name}
                      </p>
                      <p className="text-sm text-gray-500">{message.text}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <p className="text-xs text-gray-500">
                      {moment(message.createdAt).fromNow()}
                    </p>
                    {message.seen && (
                      <span className="bg-blue-500 w-5 h-5 flex items-center justify-center rounded-full text-white text-xs ">
                        1
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
//  {
//         "_id": "68833af618623d2de81b5381",
//         "from_user_id": dummyUser2Data,
//         "to_user_id": dummyUserData,
//         "text": "I seen your profile",
//         "message_type": "text",
//         "media_url": "",
//         "seen": true,
//         "createdAt": "2025-07-25T08:06:14.436Z",
//         "updatedAt": "2025-07-25T08:47:47.768Z",
//     },

export default Feed;
