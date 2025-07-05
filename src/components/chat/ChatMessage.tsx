type ChatMessageProps = {
  message: string;
  isUser: boolean;
};

export default function ChatMessage({ message, isUser }: ChatMessageProps) {
  return (
    <div className={`py-5 ${isUser ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex">
        <div className={`flex-shrink-0 mr-4`}>
          <div
            className={`h-8 w-8 rounded-full flex items-center justify-center ${
              isUser ? 'bg-gray-300' : 'bg-green-500'
            }`}
          >
            {isUser ? (
              <span className="text-gray-700 text-sm">U</span>
            ) : (
              <span className="text-white text-sm">AI</span>
            )}
          </div>
        </div>
        <div className="flex-grow">
          <p className="text-gray-800 whitespace-pre-wrap">{message}</p>
        </div>
      </div>
    </div>
  );
}
