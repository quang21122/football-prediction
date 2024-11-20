import { useState } from "react";
import { BiSidebar } from "react-icons/bi";
import { LuPenSquare } from "react-icons/lu";
import { FaArrowUp } from "react-icons/fa";
import Logo from "../../assets/chatbotlogo.png";

function ChatBot() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isStartChat, setIsStartChat] = useState(false);

  // Message mẫu
  const [messages, setMessages] = useState([
    { type: "question", text: "Hello, how can I help you?" },
    { type: "answer", text: "What are the latest football scores?" },
    { type: "question", text: "Can you predict the next match?" },
    { type: "answer", text: "Sure, let me check the data for you." },
    { type: "question", text: "Show me the league standings." },
    { type: "answer", text: "Here are the current league standings." },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { type: "question", text: newMessage }]);
      setNewMessage("");
    }
  };

  // Chat history mẫu
  const chatHistory = [
    { date: new Date("2024-11-18"), message: "Hello, how can I help you?" },
    { date: new Date("2024-11-18"), message: "What are the latest scores?" },
    {
      date: new Date("2024-10-02"),
      message: "What are the latest football scores?",
    },
    {
      date: new Date("2023-10-03"),
      message: "Can you predict the next match?",
    },
    { date: new Date("2023-10-04"), message: "Show me the league standings." },
  ];

  const sortedChatHistory = chatHistory.sort((a, b) => b.date - a.date);

  const formatDate = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Hôm nay";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Hôm qua";
    } else {
      const monthsDifference =
        (today.getFullYear() - date.getFullYear()) * 12 +
        (today.getMonth() - date.getMonth());
      if (monthsDifference < 12) {
        return `${monthsDifference} tháng trước`;
      } else {
        const yearsDifference = today.getFullYear() - date.getFullYear();
        return `${yearsDifference} năm trước`;
      }
    }
  };

  const groupedChatHistory = sortedChatHistory.reduce((acc, chat) => {
    const date = chat.date.toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(chat);
    return acc;
  }, {});

  return (
    <div
      className={`grid pt-8 gap-x-8 max-w-[120rem] mx-auto border border-x-2 border-gray-200 transition-all duration-500 ease-in-out ${
        isSidebarVisible ? "grid-cols-[0.5fr_9.5fr]" : "grid-cols-[3fr_7fr]"
      }`}
    >
      {!isSidebarVisible && (
        <div className="bg-red-300 h-screen">
          <div className="my-10 flex justify-between items-center mx-10">
            <BiSidebar
              className="text-5xl text-red-600 cursor-pointer"
              onClick={toggleSidebar}
            />
            <LuPenSquare
              className="text-5xl text-red-600 cursor-pointer"
              onClick={() => {}}
            />
          </div>

          <p className="text-red-600 mx-10 font-semibold text-4xl py-5 select-none">
            Lịch sử trò chuyện
          </p>

          <div className="h-[80%] flex flex-col mt-10 w-[100%] select-none">
            {Object.keys(groupedChatHistory).map((date, index) => (
              <div key={index} className="mb-10">
                <p className="text-white font-semibold text-4xl pl-10 pb-4">
                  {formatDate(new Date(date))}
                </p>
                {groupedChatHistory[date].map((chat, chatIndex) => (
                  <div
                    key={chatIndex}
                    className="mb-3 py-2 hover:bg-red-500 hover:cursor-pointer w-full"
                    onClick={() => {}}
                  >
                    <p className="text-gray-100 text-3xl pl-10 py-2">
                      {chat.message}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
      {isSidebarVisible && (
        <div className="mt-10 ml-10 flex h-screen">
          <BiSidebar
            className="text-5xl text-red-600 cursor-pointer mr-14"
            onClick={toggleSidebar}
          />
          <LuPenSquare
            className="text-5xl text-red-600 cursor-pointer"
            onClick={() => {}}
          />
        </div>
      )}

      {!isStartChat && (
        <div className="flex flex-col items-center justify-center select-none">
          <div className="flex flex-row items-center">
            <img src={Logo} alt="Chatbot logo" className="w-20 h-20" />
            <p className="text-red-600 text-4xl font-semibold mx-10">
              Trợ lý bóng đá của bạn
            </p>
          </div>
          <div className="w-[90%] mt-8 flex flex-row items-center">
            {/* Input field */}
            <input
              type="text"
              placeholder="Đặt câu hỏi cho tôi ngay"
              className="border border-red-200 rounded-full p-4 w-full text-red-500 placeholder:text-red-300 focus:outline-none"
            />
            {/* Button */}
            <button
              className="bg-red-200 text-red-500 text-2xl font-semibold rounded-full w-14 h-14 flex justify-center items-center -ml-16 hover:bg-red-400 hover:text-white"
              onClick={() => {}}
            >
              <FaArrowUp />
            </button>
          </div>
          <div className="space-x-16 items-center mt-8">
            <button
              className="bg-red-500 text-2xl px-8 py-4 rounded-2xl text-white hover:cursor-pointer hover:bg-red-300 hover:text-red-500"
              onClick={() => {}}
            >
              Dự đoán
            </button>
            <button
              className="bg-red-500 text-2xl px-8 py-4 rounded-2xl text-white hover:cursor-pointer hover:bg-red-300 hover:text-red-500"
              onClick={() => {}}
            >
              Phân tích
            </button>
            <button
              className="bg-red-500 text-2xl px-8 py-4 rounded-2xl text-white hover:cursor-pointer hover:bg-red-300 hover:text-red-500"
              onClick={() => {}}
            >
              Lịch đấu
            </button>
            <button
              className="bg-red-500 text-2xl px-8 py-4 rounded-2xl text-white hover:cursor-pointer hover:bg-red-300 hover:text-red-500"
              onClick={() => {}}
            >
              Bảng xếp hạng
            </button>
          </div>
        </div>
      )}

      {isStartChat && (
        <div className="flex flex-col justify-between h-screen">
          <div className="flex flex-col overflow-y-auto items-end p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-6 p-4 rounded-2xl ${
                  message.type === "question"
                    ? "bg-red-400 text-white self-end"
                    : "text-black self-start"
                }`}
              >
                <div className="flex flex-row">
                  {message.type === "answer" && (
                    <img src={Logo} alt="Logo" className="w-10 h-10 mr-4" />
                  )}
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div
            className={`fixed bottom-0 p-4 ${
              isSidebarVisible ? "w-[60%]" : "w-[50%]"
            }`}
          >
            <div className="flex items-center w-[90%] mx-auto">
              {/* Input field */}
              <input
                type="text"
                placeholder="Đặt câu hỏi cho tôi ngay"
                className="border border-red-200 rounded-full p-4 w-full text-red-500 placeholder:text-red-300 focus:outline-none"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              {/* Button */}
              <button
                className="bg-red-200 text-red-500 text-2xl font-semibold rounded-full w-14 h-14 flex justify-center items-center -ml-16 hover:bg-red-400 hover:text-white"
                onClick={handleSendMessage}
              >
                <FaArrowUp />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBot;
