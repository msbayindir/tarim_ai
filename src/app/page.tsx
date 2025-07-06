"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import Chat from "@/components/chat/Chat";

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

export default function Home() {
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
      <Chat
        key={category}
        category={category}
        messages={categoryMessages[category] || []}
        onMessagesUpdate={updateMessages}
      />
    </MainLayout>
  );
}
