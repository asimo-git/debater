import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatState, Message } from "../utils/interfaces";

const initialState: ChatState = {
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
      localStorage.setItem("chat_history", JSON.stringify(state.messages));
    },
    resetChat: (state) => {
      state.messages = [];
      localStorage.removeItem("chat_history");
    },
    hydrate: (state, action: PayloadAction<Message[]>) => {
      return {
        messages: Array.isArray(action.payload) ? action.payload : [],
      };
    },
  },
});

export const { addMessage, resetChat } = chatSlice.actions;
export default chatSlice.reducer;
