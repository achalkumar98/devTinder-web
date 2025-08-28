import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();

  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState("");

  const user = useSelector((store) => store.user);

  const userId = user?._id;

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/api/chat/" + targetUserId, {
      withCredentials: true,
    });
    console.log(chat.data.messages);

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log(firstName + ":  " + text);
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-full md:w-2/3 lg:w-1/2 mx-auto m-5 h-[80vh] flex flex-col rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-xl">
      {/* Header */}
      <h1 className="p-5 border-b border-gray-700 text-xl font-semibold text-white bg-gray-800 rounded-t-xl">
        Chat Room
      </h1>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={`flex ${
                user.firstName === msg.firstName
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div className="max-w-xs">
                <div className="text-sm font-medium text-gray-300">
                  {`${msg.firstName} ${msg.lastName}`}
                </div>
                <div className="bg-slate-600 text-white px-4 py-2 rounded-2xl shadow-md">
                  {msg.text}
                </div>
                <div className="text-xs text-gray-400 mt-1">Seen</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-gray-700 bg-gray-800 flex items-center gap-3 rounded-b-xl">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-600 bg-gray-900 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
