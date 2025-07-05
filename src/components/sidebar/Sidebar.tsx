import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Category = 'elma' | 'çay' | 'fındık';

export default function Sidebar() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<Category>('elma');

  const handleCategoryClick = (category: Category) => {
    setActiveCategory(category);
    // In the future, this information will be sent to the backend
    router.push(`/?category=${category}`);
  };

  return (
    <div className="flex flex-col h-full w-64 bg-gray-900 text-white p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold mb-4">Tarım AI Chatbot</h1>
      </div>
      
      <div className="flex flex-col space-y-2">
        <button
          onClick={() => handleCategoryClick('elma')}
          className={`p-3 rounded-md flex items-center ${
            activeCategory === 'elma' ? 'bg-gray-700' : 'hover:bg-gray-800'
          }`}
        >
          <span className="mr-2">🍎</span> Elma
        </button>
        
        <button
          onClick={() => handleCategoryClick('çay')}
          className={`p-3 rounded-md flex items-center ${
            activeCategory === 'çay' ? 'bg-gray-700' : 'hover:bg-gray-800'
          }`}
        >
          <span className="mr-2">☕</span> Çay
        </button>
        
        <button
          onClick={() => handleCategoryClick('fındık')}
          className={`p-3 rounded-md flex items-center ${
            activeCategory === 'fındık' ? 'bg-gray-700' : 'hover:bg-gray-800'
          }`}
        >
          <span className="mr-2">🌰</span> Fındık
        </button>
      </div>

      <div className="mt-auto border-t border-gray-700 pt-4">
        <div className="text-sm text-gray-400">
          © 2025 Tarım AI
        </div>
      </div>
    </div>
  );
}
