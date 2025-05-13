"use client";

import { useState } from "react";
import ChatField from "./components/ChatField";
import { Message } from "./utils/interfaces";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [message, setMessage] = useState<Message | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ role: "user", content: question });

    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: question }),
    });

    const data = await res.json();
    setMessage({ role: "bot", content: data.answer });
  };

  return (
    <main className="p-4 h-screen flex flex-col">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Задай тему спора"
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Отправить
        </button>
      </form>

      <ChatField message={message} />
    </main>
  );
}
