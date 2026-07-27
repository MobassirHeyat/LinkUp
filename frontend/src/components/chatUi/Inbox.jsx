const Inbox = ({ item, isActive, onClick }) => {
  const hasUnread = item.unreadCount > 0;

  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl
        transition-all duration-150 text-left group
        ${
          isActive
            ? "bg-[#FFE3E8]" // selected — brand tint
            : "hover:bg-[#f4f4f7] active:bg-[#FFE3E8]"
        }
      `}
    >

      <div className="relative shrink-0">
        <img
          src={item.profileUrl}
          alt={item.name}
          className="w-12 h-12 rounded-full object-cover"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${item.name}&background=FB4E66&color=fff`;
          }}
        />
        {item.isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white" />
        )}
      </div>

      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <p
            className={`text-sm truncate ${hasUnread ? "font-bold text-[#1B1B29]" : "font-medium text-[#1B1B29]"}`}
          >
            {item.name}
          </p>
          <span
            className={`text-[11px] shrink-0 ml-2 ${hasUnread ? "text-[#FB4E66] font-semibold" : "text-[#A4A4B2]"}`}
          >
            {item.time}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <p
            className={`text-xs truncate max-w-[75%] ${hasUnread ? "text-[#1B1B29] font-medium" : "text-[#A4A4B2]"}`}
          >
            {item.message}
          </p>
          {hasUnread && (
            <span className="shrink-0 min-w-[20px] h-5 px-1.5 flex items-center justify-center bg-[#FB4E66] text-white text-[10px] font-bold rounded-full ml-2">
              {item.unreadCount > 9 ? "9+" : item.unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

export default Inbox;