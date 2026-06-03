import React, { useEffect, useRef, useState } from "react";
import {
  dummyMessagesData,
  dummyUserData,
} from "../assets/vibes-assets/assets/assets";
import { ImageIcon, SendHorizonal } from "lucide-react";

const ChatBox = () => {
  const messages = dummyMessagesData;
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [user] = useState(dummyUserData);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {};

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    user && (
      <div className="h-screen flex flex-col bg-linear-to-br from-slate-100 via-purple-50 to-indigo-100 relative -z-2">
        {/* Header */}
        <div className="px-5 py-4 flex items-center gap-3 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm relative -z-1 justify-end">
          <div>
            <h1 className="font-semibold text-gray-800">{user.full_name}</h1>

            <p className="text-sm text-gray-500">@{user.username}</p>
          </div>
          <img
            src={user.profile_picture}
            alt=""
            className="rounded-full h-12 w-12 object-cover ring-2 ring-purple-400"
          />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-3">
          {messages
            .toSorted((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            .map((message, index) => {
              const isMe = message.to_user_id === user._id;

              return (
                <div
                  key={index}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div className="max-w-[75%]">
                    {/* Image Message */}
                    {message.message_type === "image" && (
                      <img
                        src={message.media_url}
                        alt=""
                        className={`rounded-2xl shadow-md border-4 ${
                          isMe ? "border-indigo-200" : "border-white"
                        } max-h-72 object-cover`}
                      />
                    )}

                    {/* Text Message */}
                    {message.message_type === "text" && (
                      <div
                        className={`px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed ${
                          isMe
                            ? "bg-linear-to-r from-gray-300 to-purple-500 text-white rounded-br-sm"
                            : "bg-white text-gray-700 rounded-bl-sm border border-gray-100"
                        }`}
                      >
                        {message.text}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-3 shadow-inner">
            {/* Text Input */}
            <input
              type="text"
              placeholder="Type your message..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
              autoFocus
            />

            {/* Upload Image */}
            <label
              htmlFor="image"
              className="cursor-pointer flex items-center justify-center"
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt=""
                  className="h-10 w-10 rounded-lg object-cover border"
                />
              ) : (
                <div className="p-2 rounded-full hover:bg-gray-200 transition">
                  <ImageIcon className="w-5 h-5 text-gray-600" />
                </div>
              )}

              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                hidden
              />
            </label>

            {/* Send Button */}
            <button
              onClick={sendMessage}
              className="bg-linear-to-r from-white-500 to-purple-500 hover:opacity-90 transition text-white p-3 rounded-full shadow-md"
            >
              <SendHorizonal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ChatBox;
