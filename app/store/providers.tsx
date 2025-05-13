"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { useEffect } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    try {
      const savedState = localStorage.getItem("chat_history");
      if (savedState) {
        store.dispatch({
          type: "chat/hydrate",
          payload: JSON.parse(savedState),
        });
      }

      const unsubscribe = store.subscribe(() => {
        localStorage.setItem(
          "chat_history",
          JSON.stringify(store.getState().chat)
        );
      });

      return () => unsubscribe();
    } catch (e) {
      console.error("Error with localStorage:", e);
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
