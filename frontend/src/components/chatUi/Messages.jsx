const Messages = ({ message, topMargin, isSameAsPrev }) => {
  const isMe = message.sender === 'me'

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} ${topMargin}`}>

      {!isMe && (
        <div className="w-7 shrink-0 mr-2 self-end">
          {!isSameAsPrev && (
            <img
              src="https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg"
              alt="avatar"
              className="w-7 h-7 rounded-full object-cover"
            />
          )}
        </div>
      )}

      <div
        className={`
          inline-block max-w-[65%] sm:max-w-[55%]
          ${message.imageUrl ? 'p-1.5' : 'px-4 py-2.5'}
          text-sm leading-relaxed break-words
          ${isMe
            ? 'bg-[#FB4E66] text-white rounded-2xl rounded-br-none shadow-sm'
            : 'bg-white text-[#1B1B29] rounded-2xl rounded-bl-none shadow-sm'
          }
        `}
      >
        {message.imageUrl && (
          <img
            src={message.imageUrl}
            alt="sent"
            className="rounded-xl max-w-[220px] w-full object-cover"
          />
        )}

        {message.text && (
          <p>{message.text}</p>
        )}

        <p className={`text-[10px] mt-1 ${isMe ? 'text-pink-200 text-right' : 'text-[#A4A4B2] text-left'}`}>
          {getTime()}
        </p>
      </div>

    </div>
  )
}

function getTime() {
  return new Date().toLocaleTimeString('en-US', {
    hour:   '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

export default Messages