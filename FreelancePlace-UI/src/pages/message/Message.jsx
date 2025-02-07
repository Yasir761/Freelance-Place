import React, { useEffect, useRef, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumb/Breadcrumb";
import { IoSend } from "react-icons/io5";
import { Chats, Users } from "../../mocks/data";
import { useParams } from "react-router-dom";

const Message = () => {
  const { chatId } = useParams();
  const [inputMessage, setInputMessage] = useState("");
  const [User, setUser] = useState(null);
  const ref = useRef();

  const scrollToBottom = () => {
    if (!ref.current) return;
    const parent = ref.current.parentElement;
    if (!parent) return;
    parent.scrollTop = parent.scrollHeight;
  };

  useEffect(() => {
    const userChat = Chats.find((chat) => chat.id === chatId);
    setUser(userChat);

    setTimeout(() => {
      scrollToBottom();
    }, 0);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [User?.messages]);

  if (!User) return;

  //  sender will always in data...
  const sender = Users.find((user) => user.id === User?.user?.sender);
  const receiver = Users.find((user) => user.id === User?.user?.receiver);

  const handleSendMessages = () => {
    const newMessage = {
      id: `user-00${Math.floor(Math.random() * 100)}`,
      createdAt: new Date(),
      isRead: false,
      text: inputMessage,
      user: "receiver",
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
    <section className="sm:p-6 sm:py-0 h-full">
      <div className="max-w-screen-xl mx-auto p-4 sm:py-2 space-y-4 h-full">
        <Breadcrumbs
          links={[
            { href: "/messages", text: "Messages" },
            { text: sender?.name },
          ]}
        />
            
 {/* <MessegeInputBox User={User} setUser={setUser} scrollToBottom={scrollToBottom}/> */}

        <div className="h-[calc(100dvh-170px)] sm:h-[calc(100dvh-185px)]">
          <div className="flex flex-col max-w-screen-lg mx-auto space-y-3 sm:space-y-5 h-full overflow-hidden p-1">
            <div className="flex-1 w-full ring-1 ring-gray-300 rounded-2xl p-3 sm:p-5 scrollbar-hidden overflow-y-auto space-y-5">
              {User?.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 sm:gap-4 items-start w-fit max-w-[80%] sm:max-w-[70%] ${
                    msg.user === "sender" ? "mr-auto" : "ml-auto"
                  }`}
                >
                  <img
                    src={
                      msg.user === "sender" ? sender.profile : receiver.profile
                    }
                    alt=""
                    className={`object-cover h-6 w-6 sm:h-10 sm:w-10 rounded-full ${
                      msg.user === "sender" ? "order-0" : "order-1"
                    }`}
                  />
                  <p
                    className={` rounded-lg px-3 max-sm:text-sm py-2 sm:p-4 ${
                      msg.user === "sender"
                        ? "rounded-ss-none bg-gray-400/50 text-gray-950"
                        : "rounded-se-none bg-blue-500 text-blue-50"
                    }`}
                  >
                    {msg.text}
                  </p>
                </div>
              ))}
              <div ref={ref}></div>
            </div>
        
            <div className="relative w-full rounded-full border-gray-400 overflow-hidden p-1 mx-auto">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Message;
