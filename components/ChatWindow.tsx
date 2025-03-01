"use client";

import { Message } from "@/types/chat";

interface ChatWindowProps {
  messages: Message[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  return (
    <div className="flex-1 p-4 overflow-hidden">
      <div className="message-container pb-4">
        {messages.map((message) => (
          <div key={message.id} className={`max-w-3xl ${message.sender === "bot" ? "mr-auto" : "ml-auto"} mb-4`}>
            <div className={`p-3 ${message.sender === "bot" ? "bg-gray-200" : "bg-blue-500 text-white"} rounded-lg`}>
              {message.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
