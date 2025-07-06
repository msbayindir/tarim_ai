type ChatMessageProps = {
  message: string;
  isUser: boolean;
};

export default function ChatMessage({ message, isUser }: ChatMessageProps) {
  return (
    <div className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {/* Avatar */}
      <div className={`h-8 w-8 rounded-full flex items-center justify-center shadow-sm flex-shrink-0 ${
        isUser 
          ? 'bg-slate-600' 
          : 'bg-blue-600'
      }`}>
        <span className="text-white text-xs font-medium">
          {isUser ? 'S' : 'AI'}
        </span>
      </div>
      
      {/* Message */}
      <div className={`max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl ${
        isUser ? 'ml-auto' : 'mr-auto'
      }`}>
        <div className={`rounded-2xl px-4 py-3 shadow-sm border ${
          isUser 
            ? 'bg-blue-600 text-white border-blue-600' 
            : 'bg-white text-slate-900 border-slate-200'
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
