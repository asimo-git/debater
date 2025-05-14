import ChatField from "./components/ChatField";
import InputField from "./components/InputField";

export default function Home() {
  return (
    <main className="p-4 h-screen flex flex-col">
      <InputField />
      <ChatField />
    </main>
  );
}
