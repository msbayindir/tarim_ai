import { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';

type Message = {
  id: string;
  text: string;
  isUser: boolean;
};

type ChatProps = {
  category: string;
  messages: Message[];
  onMessagesUpdate: (messages: Message[]) => void;
};

export default function Chat({ category, messages, onMessagesUpdate }: ChatProps) {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  // Add subtle animation when category changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.classList.add('fade-in');
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.classList.remove('fade-in');
        }
      }, 300);
    }
  }, [category]);

  // Auto-focus input when not typing
  useEffect(() => {
    if (!isTyping && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
    };
    
    const updatedMessages = [...messages, userMessage];
    onMessagesUpdate(updatedMessages);
    setInput('');
    setIsTyping(true);

    // Simulate AI response (this would be replaced with an API call)
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getResponseForCategory(category, input),
        isUser: false,
      };
      onMessagesUpdate([...updatedMessages, aiResponse]);
    }, 1500);
  };

  const getResponseForCategory = (category: string, userInput: string): string => {
    // This is just for demo purposes - in reality this would be handled by the AI backend
    const lowercaseInput = userInput.toLowerCase();
    
    if (category === 'elma') {
      if (lowercaseInput.includes('fiyat') || lowercaseInput.includes('fiyatı')) {
        return 'Elma fiyatları, türüne göre değişmekle birlikte şu anda kilogram başına 15-25 TL arasındadır. Starking elmaları genellikle daha yüksek fiyatlardan satılmaktadır.';
      } else if (lowercaseInput.includes('yetiştir') || lowercaseInput.includes('nasıl')) {
        return 'Elma yetiştirmek için güneşli bir alan, iyi drene edilen toprak ve düzenli sulama gerekir. Ağaçlar, ilkbaharda ekilmeli ve düzenli olarak budağı yapılmalıdır.';
      }
      return 'Elmalar, Türkiye\'nin önemli tarım ürünlerinden biridir ve Isparta, Karaman ve Niğde gibi bölgelerde yaygın olarak yetiştirilmektedir. Daha fazla bilgi için sorularınızı sorabilirsiniz.';
    } else if (category === 'çay') {
      if (lowercaseInput.includes('fiyat') || lowercaseInput.includes('fiyatı')) {
        return 'Çay fiyatları, kalitesine göre değişmekle birlikte şu anda kilogram başına 120-200 TL arasındadır. Yüksek kaliteli Rize çayları daha yüksek fiyatlarla satılmaktadır.';
      } else if (lowercaseInput.includes('yetiştir') || lowercaseInput.includes('nasıl')) {
        return 'Çay, özellikle Karadeniz bölgesindeki nemli ve yağışlı iklimlerde iyi yetişir. Asitli toprakları sever ve düzenli hasat gerektirir. Genellikle ilkbahar ve yaz aylarında toplanır.';
      }
      return 'Çay, Türkiye\'nin Karadeniz bölgesinde, özellikle Rize ve Trabzon illerinde yaygın olarak yetiştirilen önemli bir tarım ürünüdür. Daha fazla bilgi için sorularınızı sorabilirsiniz.';
    } else {
      if (lowercaseInput.includes('fiyat') || lowercaseInput.includes('fiyatı')) {
        return 'Fındık fiyatları, piyasa koşullarına bağlı olarak değişmekle birlikte şu anda kilogram başına 160-200 TL arasındadır. Levant kalite fındıklar genellikle daha değerlidir.';
      } else if (lowercaseInput.includes('yetiştir') || lowercaseInput.includes('nasıl')) {
        return 'Fındık, hafif eğimli arazilerde ve iyi drene edilen topraklarda iyi yetişir. Ağaçların dikilmesinden sonra verime gelmesi 3-5 yıl alabilir ve düzenli budama gerektirirler.';
      }
      return 'Fındık, Türkiye\'nin Karadeniz bölgesinde, özellikle Ordu, Giresun ve Samsun illerinde yetiştirilen önemli bir ihracat ürünüdür. Türkiye, dünya fındık üretiminin yaklaşık %70\'ini karşılamaktadır.';
    }
  };

  return (
    <div ref={chatContainerRef} className="flex flex-col h-full bg-slate-50 transition-opacity duration-300 ease-in-out">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-sm">
            <span className="text-xl">
              {category === 'elma' && '🍎'}
              {category === 'çay' && '🍃'}
              {category === 'fındık' && '🌰'}
            </span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-900 capitalize">{category} Uzmanı</h1>
            <p className="text-sm text-slate-500">Size yardımcı olmak için burada</p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-96 text-slate-400">
              <div className="h-20 w-20 rounded-3xl bg-slate-100 flex items-center justify-center mb-4">
                <span className="text-3xl">
                  {category === 'elma' && '🍎'}
                  {category === 'çay' && '🍃'}
                  {category === 'fındık' && '🌰'}
                </span>
              </div>
              <h3 className="text-lg font-medium text-slate-600 mb-2">Merhaba!</h3>
              <p className="text-center text-slate-500 max-w-md">
                {category} konusunda size nasıl yardımcı olabilirim? Sorularınızı sormaktan çekinmeyin.
              </p>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage 
                  key={message.id} 
                  message={message.text} 
                  isUser={message.isUser} 
                />
              ))}
              {isTyping && (
                <div className="flex items-start space-x-3">
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center shadow-sm">
                    <span className="text-white text-xs font-medium">AI</span>
                  </div>
                  <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-slate-200">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input */}
      <footer className="bg-white border-t border-slate-200 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="flex items-end space-x-3">
            <div className="flex-1">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`${category} hakkında bir şey sorun...`}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-slate-900 placeholder-slate-500"
                disabled={isTyping}
              />
            </div>
            <button
              type="submit"
              disabled={isTyping || !input.trim()}
              className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                isTyping || !input.trim()
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
}
