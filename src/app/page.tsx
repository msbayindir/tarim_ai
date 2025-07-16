"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import MainLayout from "@/components/layout/MainLayout";
import Chat from "@/components/chat/Chat";

type Message = {
  id: string;
  text: string;
  isUser: boolean;
};

type CategoryMessages = {
  biyokimya1: Message[];
  biyokimya2: Message[];
  [key: string]: Message[];
};

function HomeContent() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<string>("biyokimya1");
  const [categoryMessages, setCategoryMessages] = useState<CategoryMessages>({
    biyokimya1: [],
    biyokimya2: [],
  });
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam && ["biyokimya1", "biyokimya2"].includes(categoryParam)) {
      setCategory(categoryParam);
    } else {
      setCategory("biyokimya1");
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
      <div className="flex h-full p-6">
        {/* Chat Section - Full Width */}
        <div className="flex-1">
          <Chat
            key={category}
            category={category}
            messages={categoryMessages[category] || []}
            onMessagesUpdate={updateMessages}
          />
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
