import React, { useState } from "react";
import { IoSend } from "react-icons/io5";

const MessegeInputBox = ({ User, setUser, scrollToBottom }) => {
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessages = () => {
    const newMessage = {
      id: `user-00${Math.floor(Math.random() * 100)}`,
      createdAt: new Date(),
      isRead: false,
      text: inputMessage,
      user: "sender",
    };
    // just test...
    const currUserMessages = [...User.messages];
    currUserMessages.push(newMessage);

    setUser({
      ...User,
      messages: [...currUserMessages],
    }); // add new msg..
    setInputMessage("");
    scrollToBottom();
  };

  return (
    <div className="h-40 relative w-full rounded-full border-gray-400 overflow-hidden p-1 mx-auto">
      <input
        type="text"
        name="messageSentInput"
        id=""
        placeholder="Write a message to sent"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        className="bg-transparent px-4 pr-12 py-3 w-full outline-none ring-2 ring-gray-400/80 focus:ring-blue-500 rounded-full"
      />
      <button
        disabled={!inputMessage}
        onClick={handleSendMessages}
        className="text-blue-50 absolute top-2 right-2 h-10 w-10 disabled:bg-gray-500 bg-blue-500 rounded-full flex items-center justify-center active:scale-95 disabled:active:scale-100 disabled:cursor-not-allowed"
      >
        <IoSend />
      </button>
    </div>
  );
};

export default MessegeInputBox;
