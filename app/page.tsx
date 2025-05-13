"use client";

import { useState } from "react";
import ChatField from "./components/ChatField";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "./store/chatSlice";
import { RootState } from "./store/store";

export default function Home() {
  const [question, setQuestion] = useState("");
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.chat.messages);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addMessage({ role: "user", content: question }));

    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: question }),
    });

    const data = await res.json();
    dispatch(addMessage({ role: "bot", content: data.answer }));
  };

  return (
    <main className="p-4 h-screen flex flex-col">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={
            messages.length > 0
              ? "Продолжай спорить!"
              : "Напиши утверждение, с которым я поспорю"
          }
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Отправить
        </button>
      </form>

      <ChatField />
    </main>
  );
}
