"use client";

import { useEffect, useRef } from "react";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

export default function ChatField() {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const isLoading = useSelector((state: RootState) => state.chat.isLoading);
  const bottomBorder = useRef<HTMLDivElement | null>(null);

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
      {isLoading && (
        <div className="ml-2 p-2 rounded bg-gray-700 text-sm italic text-gray-300">
          Спорщик думает<span className="typing"></span>
        </div>
      )}
      {/* пустой элемент-закладка для автоскролла */}
      <div ref={bottomBorder} />
    </div>
  );
}
