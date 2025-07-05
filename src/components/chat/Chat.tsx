import { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';

type Message = {
  id: string;
  text: string;
  isUser: boolean;
};

type ChatProps = {
  category: string;
};

export default function Chat({ category }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Merhaba! Size ${category} hakkında nasıl yardımcı olabilirim?`,
      isUser: false,
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate AI response (this would be replaced with an API call)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `Bu bir ${category} için simüle edilmiş yanıttır. Gerçek API entegrasyonu daha sonra yapılacaktır.`,
        isUser: false,
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto">
        <div className="pb-16">
          {messages.map((message) => (
            <ChatMessage 
              key={message.id} 
              message={message.text} 
              isUser={message.isUser} 
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-gray-200 p-4 bg-white">
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Mesajınızı buraya yazın..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Gönder
          </button>
        </form>
      </div>
    </div>
  );
}
