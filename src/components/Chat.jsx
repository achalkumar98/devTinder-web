import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUserId } = useParams();

  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState("");

  const user = useSelector((store) => store.user);

  const userId = user?._id;

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

    socket.on("messageReceived", ({firstName, text}) => {
        console.log(firstName + ":  " + text);
        setMessages((messages) => [...messages, { firstName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
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
            <div key={index} className="chat chat-start">
              <div className="chat-header text-sm font-medium text-gray-300">
                {msg.firstName}
                <time className="text-xs opacity-50 ml-2">2 hours ago</time>
              </div>
              <div className="chat-bubble bg-indigo-600 text-white shadow-md px-4 py-2 rounded-2xl">
                {msg.text}
              </div>
              <div className="chat-footer text-xs text-gray-400 mt-1">Seen</div>
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
