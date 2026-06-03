import { Upload } from "lucide-react";
import React, { useState } from "react";
import { dummyUserData } from "../assets/vibes-assets/assets/assets";
import toast from "react-hot-toast";

const UserProfileInfo = ({ setModal }) => {
  const [preview, setPreview] = useState(dummyUserData.profile_picture);
  const [cover, setCover] = useState(dummyUserData.cover_photo);

  const [textData, settextData] = useState({
    name: dummyUserData.full_name,
    bio: dummyUserData.bio,
    username: dummyUserData.username,
    location: dummyUserData.location,
  });

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChangeCover = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCover(URL.createObjectURL(file));
    }
  };
  const handleChanges = async () => {
    setPreview(dummyUserData.profile_picture);
    setCover(dummyUserData.cover_photo);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl max-h-[95vh] overflow-y-auto p-6">
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold text-gray-800">Edit Profile</h1>

          <form className="space-y-6">
            {/* Profile Picture */}
            <div>
              <h2 className="font-semibold mb-3 text-gray-700">
                Profile Picture
              </h2>

              <label className="relative w-fit block cursor-pointer">
                <input
                  type="file"
                  onChange={handleChange}
                  accept="image/*"
                  className="hidden"
                />

                <img
                  src={preview}
                  alt="profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-md"
                />

                <div className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md border">
                  <Upload size={16} />
                </div>
              </label>
            </div>

            {/* Cover Photo */}
            <div>
              <h2 className="font-semibold mb-3 text-gray-700">Cover Photo</h2>

              <label className="relative w-fit block cursor-pointer">
                <input
                  type="file"
                  onChange={handleChangeCover}
                  accept="image/*"
                  className="hidden"
                />

                <img
                  src={cover}
                  alt="cover"
                  className="w-full max-w-md h-36 rounded-lg object-cover shadow-md"
                />

                <div className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md border">
                  <Upload size={16} />
                </div>
              </label>
            </div>

            {/* Name */}
            <div>
              <h2 className="font-semibold mb-2 text-gray-700">Name</h2>
              <input
                type="text"
                value={textData.name}
                onChange={(e) =>
                  settextData({ ...textData, name: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
              />
            </div>

            {/* Username */}
            <div>
              <h2 className="font-semibold mb-2 text-gray-700">Username</h2>
              <input
                type="text"
                value={textData.username}
                onChange={(e) =>
                  settextData({ ...textData, username: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
              />
            </div>

            {/* Bio */}
            <div>
              <h2 className="font-semibold mb-2 text-gray-700">Bio</h2>
              <textarea
                value={textData.bio}
                onChange={(e) =>
                  settextData({ ...textData, bio: e.target.value })
                }
                rows={4}
                className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none outline-none focus:ring-2 focus:ring-black/10"
              />
            </div>

            {/* Location */}
            <div>
              <h2 className="font-semibold mb-2 text-gray-700">Location</h2>
              <input
                type="text"
                value={textData.location}
                onChange={(e) =>
                  settextData({ ...textData, location: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                className="px-5 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
                onClick={() => setModal(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-md bg-black text-white hover:bg-gray-900 transition"
                onClick={() => {
                  toast.promise(handleChanges(), {
                    loading: "updating profile ...",
                    success: "profile updated Successfully",
                    error: "Something went wrong",
                  });
                  setModal(false);
                }}
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfileInfo;
