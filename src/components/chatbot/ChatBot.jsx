import { useState } from "react";
import { BiSidebar } from "react-icons/bi";
import { LuPenSquare } from "react-icons/lu";
import { FaArrowUp } from "react-icons/fa";
import Logo from "../../assets/chatbotlogo.png";

function ChatBot() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isStartChat, setIsStartChat] = useState(false);

  const suggestedQuestions = [
    "Who is Cristiano Ronaldo?",
    "Where was Cristiano Ronaldo born?",
    "Where can Cristiano Ronaldo play?",
    "What club does Cristiano Ronaldo play for?",
    "Is Cristiano Ronaldo GOAT of Football?",
  ];

  // Message mẫu
  const [messages, setMessages] = useState([
    { type: "answer", text: "Welcome to Football players Chatbot!" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleSendMessage = async (question) => {
    const updatedMessages = [...messages, { type: "question", text: question }];
    // Gọi API để lấy câu trả lời từ chatbot
    const response = await fetch("https://ca5d-34-83-234-130.ngrok-free.app/ask", { // This link changes each time we run the model server on kaggle
      method: "POST",
      body: JSON.stringify({ text: question }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    const data = await response.json();

    setMessages([...updatedMessages, { type: "answer", text: data.answer }]);
  };

  const handleSuggestedQuestionClick = (question) => {
    setIsStartChat(true);
    const updatedMessages = [...messages, { type: "question", text: newMessage }];
    setMessages(updatedMessages);
    setNewMessage("");
    handleSendMessage(question);
  }

  return (
    <div
      className={`grid pt-8 gap-x-8 max-w-[120rem] mx-auto border border-x-2 border-gray-200 transition-all duration-500 ease-in-out ${isSidebarVisible ? "grid-cols-[0.5fr_9.5fr]" : "grid-cols-[3fr_7fr]"
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
              onClick={() => { }}
            />
          </div>

          <p className="text-red-600 mx-10 font-semibold text-4xl py-5 select-none">
            Suggested Questions
          </p>

          <div className="h-[80%] flex flex-col mt-10 w-[100%] select-none">
            {suggestedQuestions.map((question, index) => (
              <div
                key={index}
                className="mb-3 py-2 hover:bg-red-500 hover:cursor-pointer w-full"
                onClick={() => handleSuggestedQuestionClick(question)}
              >
                <p className="text-gray-100 text-3xl pl-10 py-2">{question}</p>
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
            onClick={() => { }}
          />
        </div>
      )}

      {!isStartChat && (
        <div className="flex flex-col items-center justify-center select-none">
          <div className="flex flex-row items-center">
            <img src={Logo} alt="Chatbot logo" className="w-20 h-20" />
            <p className="text-red-600 text-4xl font-semibold mx-10">
              Ask about football players
            </p>
          </div>
          <div className="w-[90%] mt-8 flex flex-row items-center">
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
              onClick={() => {
                setIsStartChat(true);

                if (newMessage.trim() !== "") {
                  const updatedMessages = [...messages, { type: "question", text: newMessage }];
                  setMessages(updatedMessages);
                  setNewMessage("");
                  handleSendMessage(newMessage)
                }
              }}
            >
              <FaArrowUp />
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
                className={`mb-6 p-4 rounded-2xl ${message.type === "question"
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
            className={`fixed bottom-0 p-4 ${isSidebarVisible ? "w-[60%]" : "w-[50%]"
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
                onClick={() => {
                  if (!isStartChat) {
                    setIsStartChat(true);
                  }

                  if (newMessage.trim() !== "") {
                    const updatedMessages = [...messages, { type: "question", text: newMessage }];
                    setMessages(updatedMessages);
                    setNewMessage("");
                    handleSendMessage(newMessage)
                  }
                }}
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
