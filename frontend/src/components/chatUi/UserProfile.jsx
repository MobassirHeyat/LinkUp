const UserProfile = ({ user, onAvatarClick }) => {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onAvatarClick}
        className="relative shrink-0 focus:outline-none group"
        aria-label="View profile photo"
      >
        <img
          src={user.profileImage}
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover ring-2 ring-[#FFE3E8] group-hover:ring-[#FB4E66] transition-all duration-200"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${user.name}&background=FB4E66&color=fff`
          }}
        />
        {user.isOnline && (
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
        )}
      </button>

      <div className="leading-tight">
        <p className="text-sm font-semibold text-[#1B1B29]">{user.name}</p>
        <p className="text-xs text-emerald-500 font-medium">
          {user.isOnline ? '● Online' : 'Last seen recently'}
        </p>
      </div>
    </div>
  )
}

export default UserProfile