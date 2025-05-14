"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addMessage } from "../store/chatSlice";

export default function InputField() {
  const [question, setQuestion] = useState("");
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.chat.messages);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const prompt =
      messages.length > 0
        ? `Продолжай спорить с моими доводами. Не повторяйся. Я утверждаю: ${question}`
        : `Я утверждаю: ${question} Придумай аргументы против этой идеи. Спорь логично и разумно.`;
    dispatch(addMessage({ role: "user", content: question }));

    console.log(prompt);

    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    dispatch(addMessage({ role: "bot", content: data.answer }));
    setQuestion("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
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
  );
}
