import React, { useState } from "react";
import { dummyStoriesData } from "../assets/vibes-assets/assets/assets";
import { Plus } from "lucide-react";
import moment from "moment";
import StoryModal from "./StoryModal";
import StoryViewer from "./StoryViewer";

const StoriesBar = () => {
  const [stories] = useState(dummyStoriesData);
  const [showModal, setShowModal] = useState(false);
  const [story, setStory] = useState(null);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm   lg:max-w-3xl max-w-90">
      {/* Scroll container */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
        {/* Create Story */}
        <div
          className="shrink-0 w-28 h-44 border-2 border-dashed border-purple-400 
          rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer 
          bg-linear-to-b from-purple-50 to-purple-200 hover:bg-linear-to-b hover:from-purple-100 hover:to-purple-200"
          onClick={() => setShowModal(true)}
        >
          <Plus
            size={30}
            className="text-white bg-purple-900 p-2 rounded-full"
          />
          <span className="text-sm font-medium text-purple-900 text-center">
            Create Story
          </span>
        </div>

        {/* Stories */}
        {stories.map((story) => (
          <div
            key={story._id}
            className="relative shrink-0 w-28 h-44 rounded-2xl overflow-hidden cursor-pointer"
            onClick={() => setStory(story)}
          >
            {/* Media */}
            {story.media_type !== "text" &&
              (story.media_type === "image" ? (
                <img
                  src={story.media_url}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
              ) : (
                <video
                  src={story.media_url}
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
              ))}

            {/* Overlay (dark gradient like IG) */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent z-5" />

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-between h-full p-2 text-white">
              {/* Top (profile ,text) */}
              <div>
                <img
                  src={story.user.profile_picture}
                  alt=""
                  className="w-9 h-9 rounded-full border-2 border-white mb-5"
                />
                <p className="text-xs line-clamp-3">{story.content}</p>
              </div>

              {/* Bottom (time) */}
              <p className="text-[10px] opacity-90  ">
                {moment(story.createdAt).fromNow()}
              </p>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <StoryModal setShowModal={setShowModal} fetchStories={stories} />
      )}
      {story && <StoryViewer setStory={setStory} story={story} />}
    </div>
  );
};

export default StoriesBar;
