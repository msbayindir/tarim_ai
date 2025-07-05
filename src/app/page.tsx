'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Chat from '@/components/chat/Chat';

export default function Home() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<string>('elma');
  
  useEffect(() => {
    // Get the category from URL parameters or use default
    const categoryParam = searchParams.get('category');
    if (categoryParam && ['elma', 'çay', 'fındık'].includes(categoryParam)) {
      setCategory(categoryParam);
    }
  }, [searchParams]);

  return (
    <MainLayout>
      <Chat category={category} />
    </MainLayout>
  );
}
