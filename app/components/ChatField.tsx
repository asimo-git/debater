"use client";

import { useEffect, useRef, useState } from "react";
import { Message } from "../utils/interfaces";

export default function ChatField({ message }: { message: Message | null }) {
  const [messages, setMessages] = useState<Message[]>(() => {
    const storedChat = localStorage.getItem("chat_history");
    return storedChat ? JSON.parse(storedChat) : [];
  });

  const bottomBorder = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (message) {
      const updated = [...messages, message];
      setMessages(updated);
      localStorage.setItem("chat_history", JSON.stringify(updated));
    }
  }, [message]);

  useEffect(() => {
    bottomBorder.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="mt-4 p-4 border flex-grow overflow-scroll">
      {messages.map((msg, index) => (
        <div
          key={`${msg.role}-${index}`}
          className={`${
            msg.role === "user" ? "mr-2" : "ml-2"
          } p-2 border rounded ${
            msg.role === "user" ? "bg-amber-800" : "bg-gray-800"
          }`}
        >
          <strong>{msg.role === "bot" && "Спорщик:"}</strong> {msg.content}
        </div>
      ))}
      {/* пустой элемент-закладка для автоскролла */}
      <div ref={bottomBorder} />
    </div>
  );
}
