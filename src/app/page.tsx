'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Chat from '@/components/chat/Chat';

type Message = {
  id: string;
  text: string;
  isUser: boolean;
};

type CategoryMessages = {
  [key: string]: Message[];
};

export default function Home() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<string>('elma');
  const [categoryMessages, setCategoryMessages] = useState<CategoryMessages>({
    elma: [
      {
        id: '1',
        text: 'Merhaba! Size elma hakkında nasıl yardımcı olabilirim?',
        isUser: false,
      },
    ],
    'çay': [
      {
        id: '1',
        text: 'Merhaba! Size çay hakkında nasıl yardımcı olabilirim?',
        isUser: false,
      },
    ],
    'fındık': [
      {
        id: '1',
        text: 'Merhaba! Size fındık hakkında nasıl yardımcı olabilirim?',
        isUser: false,
      },
    ],
  });
  
  useEffect(() => {
    // Get the category from URL parameters or use default
    const categoryParam = searchParams.get('category');
    if (categoryParam && ['elma', 'çay', 'fındık'].includes(categoryParam)) {
      setCategory(categoryParam);
    }
  }, [searchParams]);

  // Function to update messages for the current category
  const updateMessages = (newMessages: Message[]) => {
    setCategoryMessages(prev => ({
      ...prev,
      [category]: newMessages
    }));
  };

  return (
    <MainLayout>
      <Chat 
        key={category} // This forces the component to remount when category changes
        category={category} 
        messages={categoryMessages[category] || []} 
        onMessagesUpdate={updateMessages} 
      />
    </MainLayout>
  );
}
