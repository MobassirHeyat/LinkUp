import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { VscDeviceCameraVideo } from "react-icons/vsc";
import Status from "../components/chatUi/Status";
import Inbox from "../components/chatUi/Inbox";



const stories = [
  { name: "Steve", imgUrl: "https://randomuser.me/api/portraits/men/1.jpg" },
  { name: "Daisy", imgUrl: "https://randomuser.me/api/portraits/women/2.jpg" },
  { name: "Stan", imgUrl: "https://randomuser.me/api/portraits/men/3.jpg" },
  { name: "Mia", imgUrl: "https://randomuser.me/api/portraits/women/4.jpg" },
];

const chatProfiles = [
  {
    id: 1,
    profileUrl: "https://randomuser.me/api/portraits/women/2.jpg",
    name: "Daisy",
    message: "Hey, are we still on for tomorrow?",
    time: "10:45 AM",
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: 2,
    profileUrl: "https://randomuser.me/api/portraits/men/5.jpg",
    name: "Starc",
    message: "Finished the project draft, check it out!",
    time: "Yesterday",
    unreadCount: 5,
    isOnline: true,
  },
  {
    id: 3,
    profileUrl: "https://randomuser.me/api/portraits/men/6.jpg",
    name: "Phoenix",
    message: "Can we schedule a quick call?",
    time: "Mon",
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: 4,
    profileUrl: "https://randomuser.me/api/portraits/women/7.jpg",
    name: "Sophia",
    message: "Loved your presentation today! 🔥",
    time: "Wed",
    unreadCount: 1,
    isOnline: true,
  },
  {
    id: 5,
    profileUrl: "https://randomuser.me/api/portraits/men/8.jpg",
    name: "Marcus",
    message: "Are you free this weekend?",
    time: "Tue",
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: 6,
    profileUrl: "https://randomuser.me/api/portraits/women/9.jpg",
    name: "Aria",
    message: "Just sent you the files 📎",
    time: "Mon",
    unreadCount: 3,
    isOnline: true,
  },
  {
    id: 7,
    profileUrl: "https://randomuser.me/api/portraits/men/10.jpg",
    name: "Jordan",
    message: "Let me know when you are done.",
    time: "Sun",
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: 8,
    profileUrl: "https://randomuser.me/api/portraits/women/11.jpg",
    name: "Alice",
    message: "Looking forward to seeing the final version! 🚀",
    time: "Sun",
    unreadCount: 0,
    isOnline: true,
  },
];

const TABS = ["Chats", "Status", "Group"];

/* ── Component ───────────────────────────────────────────── */

const ChattingPage = ({ onSelectChat, selectedChatId }) => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Primary");

  const filtered = chatProfiles.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.message.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col h-full bg-white">
      {/* ── Header ───────────────────────────── */}
      <div className="px-5 pt-6 shrink-0">
        {/* top row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {/* avatar placeholder — real app me logged-in user ka avatar */}
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="me"
              className="w-8 h-8 rounded-full object-cover"
            />
            <p className="font-bold text-[15px] text-[#1B1B29]">mr_saifu_a8</p>
          </div>
          <div className="flex items-center gap-1">
            <NavBtn icon={<VscDeviceCameraVideo size={20} />} label="Camera" />
            <NavBtn icon={<FiEdit size={18} />} label="New Chat" />
          </div>
        </div>

        {/* ── Tabs — Primary / General / Requests ── */}
        <div className="flex border-b border-gray-100 mb-4">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                flex-1 py-2.5 text-sm font-semibold transition-all duration-200
                ${
                  activeTab === tab
                    ? "text-[#1B1B29] border-b-2 border-[#1B1B29]"
                    : "text-[#A4A4B2] border-b-2 border-transparent hover:text-[#6B6B7B]"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Search bar ───────────────────────── */}
        <div className="flex items-center gap-2.5 bg-[#f4f4f7] rounded-xl px-4 py-2.5 mb-5">
          <CiSearch
            size={19}
            className="text-[#A4A4B2] shrink-0 stroke-[0.5]"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="flex-1 bg-transparent outline-none text-sm text-[#1B1B29] placeholder:text-[#A4A4B2]"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-[#A4A4B2] hover:text-[#FB4E66] text-xs transition-colors"
            >
              ✕
            </button>
          )}
        </div>

        {/* ── Stories ──────────────────────────── */}
        {!search && activeTab === "Primary" && (
          <div className="mb-4">
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
              {stories.map((s, i) => (
                <Status key={i} story={s} />
              ))}
            </div>
          </div>
        )}

        {/* ── Section label ─────────────────── */}
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-[#A4A4B2] uppercase tracking-widest">
            {search
              ? `${filtered.length} result${filtered.length !== 1 ? "s" : ""}`
              : "Messages"}
          </p>
        </div>
      </div>

      {/* ── Inbox List ───────────────────────────── */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-3 pb-4">
        {filtered.length > 0 ? (
          <div className="flex flex-col gap-0.5">
            {filtered.map((item) => (
              <Inbox
                key={item.id}
                item={item}
                isActive={selectedChatId === item.id}
                onClick={() =>
                  onSelectChat?.({
                    id: item.id,
                    name: item.name,
                    profileImage: item.profileUrl,
                    isOnline: item.isOnline,
                  })
                }
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 gap-2">
            <p className="text-sm font-semibold text-[#1B1B29]">No results</p>
            <p className="text-xs text-[#A4A4B2]">Try a different name</p>
          </div>
        )}
      </div>
    </div>
  );
};

const NavBtn = ({ icon, label }) => (
  <button
    aria-label={label}
    className="w-9 h-9 flex items-center justify-center rounded-full text-[#6B6B7B] hover:bg-gray-100 hover:text-[#FB4E66] transition-all active:scale-90"
  >
    {icon}
  </button>
);

export default ChattingPage;