import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { chatWithAI } from "../services/geminiService";
import { MOCK_JOBS } from "../constants";

// Helper component để hiển thị văn bản có định dạng (Bold, Newlines)
export const FormattedMessage: React.FC<{ text: string; isAI: boolean }> = ({
  text,
  isAI,
}) => {
  // Regex để tìm các đoạn bôi đậm **text**
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return (
    <div
      className={`whitespace-pre-wrap leading-relaxed ${
        isAI ? "text-gray-800" : "text-white"
      }`}
    >
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong
              key={i}
              className={isAI ? "font-bold text-blue-900" : "font-bold"}
            >
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      })}
    </div>
  );
};

const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; text: string }[]
  >([
    {
      role: "ai",
      text: "Xin chào! Tôi là **JobMatch Assistant**. Tôi đã sẵn sàng hỗ trợ bạn tìm việc làm phù hợp với hồ sơ của mình.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsTyping(true);

    const aiResponse = await chatWithAI(userMsg, MOCK_JOBS, user?.cvContent);

    setMessages((prev) => [...prev, { role: "ai", text: aiResponse }]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="bg-white w-[350px] md:w-[450px] h-[600px] rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 origin-bottom-right">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-bold text-lg">
                  ✨
                </div>
                <div>
                  <p className="font-bold text-sm">JobMatch AI</p>
                  <p className="text-[10px] text-blue-100 uppercase tracking-widest font-bold">
                    Chuyên gia tư vấn
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-2 rounded-xl transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-2 mt-2 bg-black/10 rounded-lg px-3 py-1.5 text-[10px] font-medium">
              {user?.cvContent ? (
                <span className="flex items-center gap-1.5 text-emerald-300">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  Hồ sơ đã sẵn sàng
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-yellow-300">
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                  Hãy tải CV lên để AI hiểu bạn hơn
                </span>
              )}
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-5 bg-gray-50/50"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[90%] p-4 rounded-2xl text-sm shadow-sm border ${
                    m.role === "user"
                      ? "bg-blue-600 text-white rounded-tr-none border-blue-500"
                      : "bg-white text-gray-800 border-gray-100 rounded-tl-none"
                  }`}
                >
                  <FormattedMessage text={m.text} isAI={m.role === "ai"} />
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 rounded-tl-none flex gap-1">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex gap-2 items-center bg-gray-100 rounded-2xl px-4 py-1">
              <input
                type="text"
                placeholder="Hỏi về lương, kỹ năng, hoặc CV..."
                className="flex-1 bg-transparent py-3 text-sm outline-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="text-blue-600 disabled:text-gray-400 p-2 hover:bg-blue-50 rounded-xl transition-all"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white w-16 h-16 rounded-2xl shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 group relative"
        >
          {user?.cvContent && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></span>
          )}
          <svg
            className="w-8 h-8 group-hover:rotate-12 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default AIChatBot;
