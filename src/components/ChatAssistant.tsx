
// "use client";

// import { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Send, Bot, User } from "lucide-react";
// import { generateLivestockCareAnswers } from "@/ai/flows/generate-livestock-care-answers";

// // ✅ Define Type Once (Fixes your error)
// type ChatMessage = {
//   role: "user" | "assistant";
//   content: string;
// };

// export default function ChatAssistant() {
//   const [open, setOpen] = useState(false);
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const [loading, setLoading] = useState(false);
//   const scrollRef = useRef<HTMLDivElement>(null);

//   // Auto Scroll
//   useEffect(() => {
//     if (!scrollRef.current) return;
//     scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//   }, [messages]);

//   // Send Message
//   const sendMessage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const userMsg: ChatMessage = { role: "user", content: input };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput("");
//     setLoading(true);

//     try {
//       const { answer } = await generateLivestockCareAnswers({
//         question: userMsg.content,
//       });

//       const botMsg: ChatMessage = { role: "assistant", content: answer };

//       setMessages((prev) => [...prev, botMsg]);
//     } catch {
//       setMessages((prev) => [
//         ...prev,
//         { role: "assistant", content: "Something went wrong!" },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* Floating Circular Button */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-xl border border-white/10 bg-white/20 backdrop-blur-lg flex items-center justify-center hover:scale-110 transition-all"
//       >
//        <Image 
//   src="/images/ai-avatar.png"
//   width={48}
//   height={48}
//   alt="AI Avatar"
//   className="rounded-full"
// />

//       </button>

//       {/* Chat Window */}
//       {open && (
//         <div className="fixed bottom-24 right-6 w-80 sm:w-96 z-50">
//           <Card className="shadow-2xl border border-white/20 bg-black/70 backdrop-blur-xl text-white">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Bot className="w-6 h-6" /> AI Assistant
//               </CardTitle>
//             </CardHeader>

//             <CardContent>
//               <ScrollArea className="h-64 pr-2">
//                 <div ref={scrollRef} className="space-y-3 pb-4">
//                   {messages.map((msg, i) => (
//                     <div
//                       key={i}
//                       className={`flex gap-2 ${
//                         msg.role === "user" ? "justify-end" : ""
//                       }`}
//                     >
//                       {/* Bot Icon */}
//                       {msg.role === "assistant" && (
//                         <Bot className="w-6 h-6 mt-1" />
//                       )}

//                       <div
//                         className={`p-2 rounded-lg max-w-xs ${
//                           msg.role === "user"
//                             ? "bg-green-600 text-white"
//                             : "bg-white/10"
//                         }`}
//                       >
//                         {msg.content}
//                       </div>

//                       {/* User Icon */}
//                       {msg.role === "user" && (
//                         <User className="w-6 h-6 mt-1" />
//                       )}
//                     </div>
//                   ))}

//                   {loading && (
//                     <div className="flex gap-2 items-center">
//                       <Bot className="w-6 h-6 animate-pulse" />
//                       <p className="text-sm text-gray-300">Thinking...</p>
//                     </div>
//                   )}
//                 </div>
//               </ScrollArea>

//               {/* Input */}
//               <form onSubmit={sendMessage} className="flex gap-2 mt-4">
//                 <Input
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   placeholder="Type your message..."
//                   className="bg-white/10 text-white border-white/20"
//                 />
//                 <Button
//                   type="submit"
//                   disabled={loading}
//                   className="bg-green-600"
//                 >
//                   <Send className="w-4 h-4" />
//                 </Button>
//               </form>
//             </CardContent>
//           </Card>
//         </div>
//       )}
//     </>
//   );
// }
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User } from "lucide-react";
import { generateLivestockCareAnswers } from "@/ai/flows/generate-livestock-care-answers";

// Message Type
type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  // Handle Send
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const { answer } = await generateLivestockCareAnswers({
        question: userMsg.content,
      });

      const botMsg: ChatMessage = { role: "assistant", content: answer };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Large Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-24 h-24 rounded-full shadow-xl border border-white/10 
        bg-white/30 backdrop-blur-lg flex items-center justify-center hover:scale-110 transition-all"
      >
        <Image
          src="/images/ai-avatar.png"
          width={72}
          height={72}
          alt="AI Avatar"
          className="rounded-full"
        />
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-32 right-6 w-80 sm:w-96 z-50">
          <Card className="shadow-2xl border border-white/20 bg-black/70 backdrop-blur-xl text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-6 h-6" /> AI Assistant
              </CardTitle>
            </CardHeader>

            <CardContent>
              {/* Chat Messages */}
              <ScrollArea className="h-64 pr-2">
                <div ref={scrollRef} className="space-y-3 pb-4">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex gap-2 ${
                        msg.role === "user" ? "justify-end" : ""
                      }`}
                    >
                      {msg.role === "assistant" && (
                        <Bot className="w-6 h-6 mt-1" />
                      )}

                      <div
                        className={`p-2 rounded-lg max-w-xs ${
                          msg.role === "user"
                            ? "bg-green-600 text-white"
                            : "bg-white/10"
                        }`}
                      >
                        {msg.content}
                      </div>

                      {msg.role === "user" && (
                        <User className="w-6 h-6 mt-1" />
                      )}
                    </div>
                  ))}

                  {loading && (
                    <div className="flex gap-2 items-center">
                      <Bot className="w-6 h-6 animate-pulse" />
                      <p className="text-sm text-gray-300">Thinking...</p>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Box */}
              <form onSubmit={sendMessage} className="flex gap-2 mt-4">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="bg-white/10 text-white border-white/20"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
