import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { createSocketConnection } from "../utils/socket";
import { BASE_URL } from "../utils/constants";
import dayjs from "dayjs";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [isTargetOnline, setIsTargetOnline] = useState(false);

  const messagesEndRef = useRef(null);

  // Fetch chat messages
  const fetchChatMessages = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/chat/${targetUserId}`, {
        withCredentials: true,
      });

      const chatMessages = data?.messages.map((msg) => ({
        firstName: msg.senderId?.firstName,
        lastName: msg.senderId?.lastName,
        text: msg.text,
        createdAt: msg.createdAt,
        senderId: msg.senderId?._id,
      }));

      setMessages(chatMessages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize socket
  useEffect(() => {
    if (!userId) return;
    const newSocket = createSocketConnection();
    setSocket(newSocket);

    newSocket.emit("joinChat", { userId, targetUserId });

    newSocket.on(
      "messageReceived",
      ({ senderId, firstName, lastName, text }) => {
        setMessages((prev) => [
          ...prev,
          {
            firstName,
            lastName,
            text,
            createdAt: new Date(),
            senderId,
          },
        ]);
      }
    );

    newSocket.on("userStatus", ({ userId: changedUserId, isOnline }) => {
      if (changedUserId === targetUserId) {
        setIsTargetOnline(isOnline);
      }
    });

    return () => newSocket.disconnect();
  }, [userId, targetUserId]);

  useEffect(() => {
    fetchChatMessages();
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim() || !socket) return;
    socket.emit("sendMessage", { userId, targetUserId, text: newMessage });
    setNewMessage("");
  };

  return (
    <div className="flex flex-col max-w-lg mx-auto my-4 h-[calc(100vh-8rem)] sm:h-[calc(100vh-6rem)] bg-gray-800 shadow-2xl rounded-xl">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 bg-gray-900 text-white text-lg font-semibold rounded-t-xl flex items-center justify-between shadow-md">
        <span>Chat</span>
        <div className="flex items-center gap-2">
          <span
            className={`w-3 h-3 rounded-full ${
              isTargetOnline ? "bg-green-500" : "bg-gray-500"
            }`}
          ></span>
          <span className="text-sm text-gray-300">
            {isTargetOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {messages.map((msg, index) => {
          const isMe = msg.senderId === userId;
          return (
            <div
              key={index}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div className="max-w-[70%] sm:max-w-[60%] break-words">
                {!isMe && (
                  <div className="text-sm font-medium text-gray-300 mb-1">
                    {msg.firstName} {msg.lastName}
                  </div>
                )}
                <div
                  className={`px-4 py-2 rounded-2xl shadow-md text-white break-words ${
                    isMe ? "bg-indigo-600" : "bg-gray-700"
                  }`}
                >
                  {msg.text}
                </div>
                <div
                  className={`text-xs text-gray-400 mt-1 ${
                    isMe ? "text-right" : "text-left"
                  }`}
                >
                  {dayjs(msg.createdAt).format("HH:mm, MMM D")}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex p-4 border-t border-gray-700 bg-gray-900 gap-3">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 transition"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium shadow-md transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
