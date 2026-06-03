import React, { useState } from "react";
import { dummyUserData } from "../assets/vibes-assets/assets/assets";
import { Image, X } from "lucide-react";
import toast from "react-hot-toast";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);

  return (
    <div className="p-5 ">
      {/* heading */}
      <div className="space-y-3 mb-6">
        <h1 className="font-bold text-3xl">Create Post</h1>
        <p className="text-gray-500 text-sm">
          Share your thoughts with the world
        </p>
      </div>
      {/* form */}
      <div className="p-4 bg-white rounded-md shadow-md max-w-3xl">
        <div className="flex gap-3 items-center">
          <img
            src={dummyUserData.profile_picture}
            alt="profile"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p>{dummyUserData.full_name}</p>
            <p className="text-gray-500">@{dummyUserData.username}</p>
          </div>
        </div>
        <form>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-24 mt-4 rounded-md p-2 outline-none resize-none"
            placeholder="What's on your mind?"
          />
        </form>
        <div>
          <div className="flex gap-2 mt-4 flex-wrap">
            {images.length > 0 &&
              images.map((image, index) => (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded-xl w-20 h-20"
                >
                  {/* remove button */}
                  <button
                    onClick={() =>
                      setImages(images.filter((_, i) => i !== index))
                    }
                    className="absolute top-2 right-2 z-10 bg-black/60 hover:bg-red-500 transition p-1 rounded-full text-white opacity-0 group-hover:opacity-100"
                  >
                    <X size={18} />
                  </button>

                  {/* overlay on hover */}

                  <img
                    src={URL.createObjectURL(image)}
                    alt={`preview-${index}`}
                    className=" h-25 object-cover rounded-xl transition duration-300 group-hover:scale-105 group-hover:brightness-50"
                  />
                </div>
              ))}
          </div>
          <hr className="b border-gray-200" />
          {/* bottom */}
          <div className="mt-6 flex items-center justify-between">
            <label htmlFor="images">
              <Image
                size={24}
                className="cursor-pointer hover:text-purple-900 transition text-gray-500"
              />
            </label>
            <input
              type="file"
              id="images"
              multiple
              accept="image/*"
              hidden
              onChange={(e) => {
                const files = Array.from(e.target.files);
                setImages([...images, ...files]);
              }}
            />
            <button
              type="submit"
              className="bg-purple-900 rounded-md hover:bg-purple-800 px-3 py-2 w-30 text-white transition cursor-pointer"
              onClick={() => {
                (setContent(""), setImages([]));
                // toast.promise(handleCreateStory(), {
                //   loading: "Creating Story ...",
                //   success: "Story Created Successfully",
                //   error: "Something went wrong",
                // });
                toast.success("Post Created Successfully");
              }}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
