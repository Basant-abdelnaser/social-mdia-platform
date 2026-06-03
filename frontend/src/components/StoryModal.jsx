import {
  CircleArrowLeft,
  CircleCheckBig,
  TextAlignStart,
  Upload,
} from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const StoryModal = ({
  setShowModal,
  // fetchStories
}) => {
  const bgColors = [
    "#4f46e5",
    "#7c3aad",

    "#ef4444",
    "#f59e0b",
    "#84cc16",
    "#22c55e",
  ];
  const [mode, setMode] = useState("text");
  const [background, setBackground] = useState(bgColors[0]);
  const [ActiveColor, setActiveColor] = useState(bgColors[0]);
  const [text, setText] = useState("");
  const [media, setMedia] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleMediaYUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setMedia(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  const handleCreateStory = async () => {
    setText("");
    setMedia(null);
    setPreviewUrl(null);
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center bg-black/40 backdrop-blur-sm  z-50 p-4">
      <div className=" w-2xl md:w-xl sm:w-3/4 ">
        <div className="flex justify-between items-center text-white p-5">
          <CircleArrowLeft
            onClick={() => setShowModal(false)}
            className="cursor-pointer hover:scale-105 transition"
          />
          <h1>Create Story</h1>
        </div>

        {mode === "text" && (
          <div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={`w-full h-50 rounded-2xl p-4 text-white`}
              style={{ backgroundColor: background }}
              placeholder="Whats on your mind?"
            ></textarea>
            <div>
              <div className="flex gap-2 p-5">
                {bgColors.map((color, index) => (
                  <div
                    key={index}
                    className={`w-6 h-6 rounded-full cursor-pointer  ${
                      color === ActiveColor ? "border-2 border-white" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      setBackground(color);
                      setActiveColor(color);
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        )}
        {mode === "media" &&
          previewUrl &&
          (media.type.startsWith("image") ? (
            <img
              src={previewUrl}
              alt="preview"
              className="max-h-50  mx-auto mb-5"
            />
          ) : (
            <video
              src={previewUrl}
              controls
              className="max-h-50 mx-auto mb-5"
            />
          ))}
        <div className="flex gap-5 justify-between">
          <button
            className="bg-purple-900 text-white px-4 py-2 rounded-xl w-1/2 flex items-center gap-2 hover:bg-purple-800 transition justify-center cursor-pointer"
            onClick={() => {
              setMode("text");
              setMedia(null);
              setPreviewUrl(null);
            }}
          >
            <TextAlignStart />
            <span>Text</span>
          </button>
          {/* <button className="bg-white text-black px-4 py-2 rounded-xl w-1/2 flex items-center gap-2 hover:bg-black/20 transition justify-center cursor-pointer">
            <Upload />
            <span> Photo/Video</span>
          </button> */}
          <label className="bg-white text-black px-4 py-2 rounded-xl w-1/2 flex items-center gap-2 hover:bg-black/20 transition justify-center cursor-pointer">
            <input
              type="file"
              onChange={(e) => {
                handleMediaYUpload(e);
                setMode("media");
              }}
              accept="image/*, video/*"
              className="hidden"
            />
            <Upload />
            <span> Photo/Video</span>
          </label>
        </div>
        <button
          className="w-full text-white bg-purple-950 rounded-md mt-5 py-3 flex items-center justify-center gap-2 hover:bg-purple-800 transition cursor-pointer"
          onClick={() => {
            toast.promise(handleCreateStory(), {
              loading: "Creating Story ...",
              success: "Story Created Successfully",
              error: "Something went wrong",
            });
          }}
        >
          <CircleCheckBig />
          <span>Create Story</span>
        </button>
      </div>
    </div>
  );
};
export default StoryModal;
