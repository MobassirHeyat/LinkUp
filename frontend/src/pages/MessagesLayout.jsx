import { useState } from "react";
import { FiSend } from "react-icons/fi";
import ChattingPage from "./ChattingPage";
import ChatBox from "./ChatBox";

const MessagesLayout = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div
      className="flex h-screen bg-white overflow-hidden"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
 
      <div
        className={`
          ${selectedChat ? "hidden md:flex" : "flex"}
          md:w-[380px] w-full flex-col
          border-r border-gray-100
          shrink-0
        `}
      >
        <ChattingPage
          onSelectChat={setSelectedChat}
          selectedChatId={selectedChat?.id}
        />
      </div>

  
      <div
        className={`
          ${selectedChat ? "flex" : "hidden md:flex"}
          flex-1 flex-col
        `}
      >
        {selectedChat ? (
          <ChatBox user={selectedChat} onBack={() => setSelectedChat(null)} />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};


const EmptyState = () => (
  <div className="flex-1 flex flex-col items-center justify-center gap-4 bg-white">
    <div className="w-20 h-20 rounded-full border-2 border-[#1B1B29] flex items-center justify-center">
      <FiSend size={32} className="text-[#1B1B29]" />
    </div>
    <div className="text-center">
      <p className="text-lg font-semibold text-[#1B1B29]">Your messages</p>
      <p className="text-sm text-[#A4A4B2] mt-1 max-w-[220px] leading-relaxed">
        Send private photos and messages to a friend or group.
      </p>
    </div>
    <button className="mt-2 px-6 py-2.5 bg-[#FB4E66] text-white text-sm font-semibold rounded-full hover:bg-[#E2364D] active:scale-95 transition-all duration-200">
      Send message
    </button>
  </div>
);

export default MessagesLayout;
