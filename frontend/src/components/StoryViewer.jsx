import React, { useEffect, useState } from "react";

const STORY_DURATION = 5 * 1000; // 5 sec

const StoryViewer = ({ setStory, story }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!story) return;

    setProgress(0); // 🔥 reset on new story

    let start = Date.now();
    let animationFrame;

    const update = () => {
      const percent = ((Date.now() - start) / STORY_DURATION) * 100;

      if (percent >= 100) {
        setProgress(100);
        setStory(null);
        return;
      }

      setProgress(percent);
      animationFrame = requestAnimationFrame(update);
    };

    animationFrame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [story, setStory]);

  if (!story) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      {/* Click outside */}
      <div className="absolute inset-0" onClick={() => setStory(null)} />

      {/* Story container */}
      <div className="relative w-full sm:w-[90%] md:w-[70%] lg:w-[50%] h-full max-h-screen flex items-center justify-center overflow-hidden rounded-xl">
        {/* 🔥 PROGRESS BAR */}
        <div className="absolute top-0 left-0 w-full h-1 bg-white/20 z-50">
          <div
            className="h-full bg-white"
            style={{
              width: `${progress}%`,
              minWidth: "2px", // ensures visibility at start
            }}
          />
        </div>

        {/* TOP BAR */}
        <div className="absolute top-4 left-4 flex items-center gap-2 z-40 text-white">
          <img
            src={story?.user?.profile_picture}
            alt=""
            className="w-10 h-10 rounded-full border-2 border-white object-cover"
          />
          <span className="font-medium text-sm">{story?.user?.username}</span>
        </div>

        {/* IMAGE */}
        {story.media_type === "image" && (
          <img
            src={story.media_url}
            alt=""
            className="w-full h-full object-cover z-0"
          />
        )}

        {/* VIDEO */}
        {story.media_type === "video" && (
          <video
            src={story.media_url}
            autoPlay
            muted
            className="w-full h-full object-cover z-0"
          />
        )}

        {/* TEXT */}
        {story.media_type === "text" && (
          <div className="w-full h-full flex items-center justify-center bg-purple-700 text-white text-xl text-center px-6 z-0">
            {story.content}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryViewer;
