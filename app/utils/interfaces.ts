export interface Message {
  role: "user" | "bot";
  content: string;
}

export interface ChatState {
  messages: Message[];
}
