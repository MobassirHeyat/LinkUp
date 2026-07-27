import { useState, useRef, useEffect } from "react";
import { IoCallOutline, IoVideocamOutline, IoSendSharp } from "react-icons/io5";
import { BsThreeDotsVertical, BsEmojiSmile, BsPaperclip } from "react-icons/bs";
import { FiArrowLeft } from "react-icons/fi";
import UserProfile from "../components/chatUi/UserProfile";
import Messages from "../components/chatUi/Messages";

const DEMO_MESSAGES = [
  { id: 1, sender: "other", text: "Hey! What's up? 👋" },
  {
    id: 2,
    sender: "me",
    text: "I'm good! Just working on the LinkUp project.",
  },
  { id: 3, sender: "other", text: "Nice! How's the chat UI coming along?" },
  { id: 4, sender: "me", text: "Almost done, adding the finishing touches." },
  {
    id: 5,
    sender: "other",
    text: "Looking forward to seeing the final version! 🚀",
  },
];

const ChatBox = ({ user, onBack }) => {
  const [messages, setMessages] = useState(DEMO_MESSAGES);
  const [reply, setReply] = useState("");
  const [profileViewOpen, setProfileViewOpen] = useState(false);

  const fileInputRef = useRef(null);
  const bottomRef = useRef(null);

  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const text = reply.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { id: Date.now(), sender: "me", text }]);
    setReply("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "me", text: "", imageUrl },
    ]);
    e.target.value = "";
  };

  return (
    <div className="flex flex-col h-full bg-[#f4f4f7]">
   
      <nav className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 shadow-sm shrink-0">
       
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#1B1B29] transition-all active:scale-90 md:hidden"
        >
          <FiArrowLeft size={20} />
        </button>

        <div className="flex-1">
          <UserProfile
            user={user}
            onAvatarClick={() => setProfileViewOpen(true)}
          />
        </div>

        <div className="flex items-center gap-1">
          <ActionBtn icon={<IoCallOutline size={20} />} label="Call" />
          <ActionBtn icon={<IoVideocamOutline size={20} />} label="Video" />
          <ActionBtn icon={<BsThreeDotsVertical size={18} />} label="More" />
        </div>
      </nav>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-5 no-scrollbar">
        {messages.map((msg, index) => {
          const prev = messages[index - 1];
          const isSameAsPrev = prev && prev.sender === msg.sender;
          const topMargin = !isSameAsPrev && index !== 0 ? "mt-4" : "mt-1";

          return (
            <Messages
              key={msg.id}
              message={msg}
              topMargin={topMargin}
              isSameAsPrev={isSameAsPrev}
              senderAvatar={user.profileImage}
            />
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* ── input foooter  */}
      <div className="bg-white border-t border-gray-100 px-4 py-3 shrink-0">
        <div className="flex items-center gap-3 bg-[#f4f4f7] rounded-2xl px-4 py-2.5">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-[#A4A4B2] hover:text-[#FB4E66] transition-colors shrink-0"
            aria-label="Send image"
          >
            <BsPaperclip size={19} />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          <input
            type="text"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 bg-transparent outline-none text-sm text-[#1B1B29] placeholder:text-[#A4A4B2]"
          />

          <button className="text-[#A4A4B2] hover:text-[#FB4E66] transition-colors shrink-0">
            <BsEmojiSmile size={19} />
          </button>

          <button
            onClick={handleSend}
            disabled={!reply.trim()}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#FB4E66] text-white shrink-0 hover:bg-[#E2364D] active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
          >
            <IoSendSharp size={15} />
          </button>
        </div>
      </div>


      {profileViewOpen && (
        <ProfileImageViewer
          user={user}
          onClose={() => setProfileViewOpen(false)}
        />
      )}
    </div>
  );
};

const ActionBtn = ({ icon, label }) => (
  <button
    aria-label={label}
    className="w-9 h-9 flex items-center justify-center rounded-full text-[#6B6B7B] hover:bg-gray-100 hover:text-[#FB4E66] transition-all active:scale-90"
  >
    {icon}
  </button>
);

const ProfileImageViewer = ({ user, onClose }) => (
  <div
    className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-sm"
    onClick={onClose}
  >
    <div
      className="flex items-center gap-4 px-4 py-4 shrink-0"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
      >
        <FiArrowLeft size={20} />
      </button>
      <div>
        <p className="text-white font-semibold text-sm">{user.name}</p>
        <p className="text-white/50 text-xs">Profile photo</p>
      </div>
    </div>

    <div
      className="flex-1 flex items-center justify-center p-6"
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src={user.profileImage}
        alt={user.name}
        className="max-w-full max-h-full rounded-2xl object-contain shadow-2xl"
        onError={(e) => {
          e.target.src = `https://ui-avatars.com/api/?name=${user.name}&background=FB4E66&color=fff&size=400`;
        }}
      />
    </div>

    <div
      className="shrink-0 text-center pb-8"
      onClick={(e) => e.stopPropagation()}
    >
      <p className="text-white font-semibold">{user.name}</p>
      <p className="text-white/50 text-xs mt-1">
        {user.isOnline ? "● Online" : "Last seen recently"}
      </p>
    </div>
  </div>
);

export default ChatBox;