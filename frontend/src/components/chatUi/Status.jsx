const Status = ({ story }) => {
  return (
    <button className="flex flex-col items-center gap-1.5 shrink-0 group">

      <div className="p-[2px] rounded-full bg-gradient-to-tr from-[#FB4E66] to-[#FFB7C2]">
        <div className="p-[2px] bg-white rounded-full">
          <img
            src={story.imgUrl}
            alt={story.name}
            className="w-12 h-12 rounded-full object-cover group-hover:scale-105 transition-transform duration-200"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${story.name}&background=FB4E66&color=fff`
            }}
          />
        </div>
      </div>


      <span className="text-[11px] text-[#6B6B7B] font-medium max-w-[52px] truncate">
        {story.name}
      </span>

    </button>
  )
}

export default Status