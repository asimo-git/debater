"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetChat } from "../store/chatSlice";

export function RemoveChatButton() {
  const [confirming, setConfirming] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (confirming) {
      dispatch(resetChat());
      setConfirming(false);
    } else {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 5000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${
        confirming ? "bg-red-600 px-6 py-3 scale-105" : "bg-blue-500"
      } text-white px-4 py-2 ml-4 rounded transition-all duration-300`}
    >
      {confirming ? "Точно удалить, я уверен" : "Очистить чат"}
    </button>
  );
}
