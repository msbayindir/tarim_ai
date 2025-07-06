'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

type Category = {
  id: string;
  name: string;
  icon: string;
  description: string;
};

const categories: Category[] = [
  { id: 'elma', name: 'Elma', icon: '🍎', description: 'Elma yetiştiriciliği' },
  { id: 'çay', name: 'Çay', icon: '🍃', description: 'Çay üretimi' },
  { id: 'fındık', name: 'Fındık', icon: '🌰', description: 'Fındık tarımı' },
];

export default function Sidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>('elma');

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categories.some(cat => cat.id === categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [searchParams]);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    router.push(`/?category=${categoryId}`);
  };

  return (
    <aside className="w-80 h-full bg-white border-r border-slate-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-900">Tarım AI</h1>
            <p className="text-sm text-slate-500">Akıllı tarım asistanınız</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`w-full group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span className="text-xl mr-3 transition-transform group-hover:scale-110">
                  {category.icon}
                </span>
                <div className="flex-1 text-left">
                  <div className="font-medium">{category.name}</div>
                  <div className={`text-xs mt-0.5 ${
                    isActive ? 'text-blue-600' : 'text-slate-500'
                  }`}>
                    {category.description}
                  </div>
                </div>
                {isActive && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Çevrimiçi</span>
          </div>
          <span>v1.0</span>
        </div>
      </div>
    </aside>
  );
}
