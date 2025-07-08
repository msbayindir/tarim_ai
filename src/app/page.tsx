"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import MainLayout from "@/components/layout/MainLayout";
import Chat from "@/components/chat/Chat";
import ImageAnalysis from "@/components/image/ImageAnalysis";

type Message = {
  id: string;
  text: string;
  isUser: boolean;
};

type CategoryMessages = {
  elma: Message[];
  cay: Message[];
  findik: Message[];
  [key: string]: Message[];
};

function HomeContent() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<string>("elma");
  const [categoryMessages, setCategoryMessages] = useState<CategoryMessages>({
    elma: [],
    cay: [],
    findik: [],
  });
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam && ["elma", "cay", "findik"].includes(categoryParam)) {
      setCategory(categoryParam);
    } else {
      setCategory("elma");
    }
  }, [searchParams]);

  const updateMessages = (newMessages: Message[]) => {
    setCategoryMessages((prev) => ({
      ...prev,
      [category]: newMessages,
    }));
  };

  return (
    <MainLayout>
      <div className="flex h-full gap-6 p-6">
        {/* Chat Section */}
        <div className="flex-1">
          <Chat
            key={category}
            category={category}
            messages={categoryMessages[category] || []}
            onMessagesUpdate={updateMessages}
          />
        </div>
        
        {/* Image Analysis Section */}
        <div className="w-96">
          <ImageAnalysis category={category} />
        </div>
      </div>
    </MainLayout>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Yükleniyor...</div>}>
      <HomeContent />
    </Suspense>
  );
}
