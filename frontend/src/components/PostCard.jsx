import { Heart, MessageCircle, Share2 } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
  const [mediaUrl, setMediaUrl] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    if (post.post_type === "text_with_image") {
      setMediaUrl(post.image_urls);

      //   console.log(mediaUrl[0]);
    } else {
      setMediaUrl(null);
    }
  }, [post]);

  const renderWithHashtags = (text) => {
    const parts = text.split(/(#\w+)/g);

    return parts.map((part, i) =>
      part.startsWith("#") ? (
        <span key={i} className="text-blue-500 font-medium cursor-pointer">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-3   ">
      {/* personal details */}
      <div
        className="flex gap-2 items-center cursor-pointer "
        onClick={() => {
          navigate(`/profile/${post.user._id}`);
        }}
      >
        <img
          src={post.user.profile_picture}
          alt=""
          className="w-12 h-12 rounded-full "
        />
        <div className="flex flex-col">
          <p className="font-bold">{post.user.full_name}</p>
          <span className="text-sm text-gray-500">
            @{post.user.username} . {moment(post.createdAt).fromNow()}
          </span>
        </div>
      </div>
      {/* content */}
      <div>
        <p className="p-5"> {renderWithHashtags(post.content)}</p>
        {/* {mediaUrl && { mappedUrls }} */}
        {mediaUrl && (
          <img
            src={mediaUrl[0]}
            alt=""
            className="w-full h-full object-cover rounded-md mb-5"
          />
        )}
      </div>
      <hr className="w-full h-1 text-gray-200 my-3" />
      {/* reations */}
      <div className="flex gap-5">
        <div className="flex gap-2">
          <Heart />
          <span>{post.likes_count.length}</span>
        </div>
        <div className="flex gap-2">
          <MessageCircle />
          <span>990</span>
        </div>
        <div className="flex gap-2">
          <Share2 />
          <span>70</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

//    {
//         "_id": "686e6d0407845749500c24cd",
//         "user": dummyUserData,
//         "content": "Unlock your potential—every small step counts. Stay consistent, stay focused, and trust the process. Growth takes time, but every day is a new chance to be better than yesterday. 🌱✨\r\n\r\n#Motivation #GrowthMindset #DailyInspiration #StayFocused #LevelUp #PositiveVibes #KeepGoing #SelfImprovement #MindsetMatters #SuccessJourney",
//         "image_urls": [],
//         "post_type": "text",
//         "likes_count": [],
//         "createdAt": "2025-07-09T13:22:12.601Z",
//         "updatedAt": "2025-07-09T13:22:12.601Z",
//     },
