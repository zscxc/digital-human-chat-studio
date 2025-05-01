
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export type Message = {
  role: "user" | "ai";
  content: string;
  timestamp?: Date;
};

interface ChatHistoryProps {
  messages: Message[];
}

export function ChatHistory({ messages }: ChatHistoryProps) {
  const bottomRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="text-center py-2 bg-card shadow-sm border-b">
        <h2 className="text-lg font-semibold">Chat History</h2>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No messages yet. Start a conversation!
            </div>
          ) : (
            messages.map((message, i) => (
              <div
                key={i}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "ai" && (
                  <Avatar className="w-8 h-8 border">
                    <div className="bg-primary text-white w-8 h-8 flex items-center justify-center">
                      AI
                    </div>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-[80%]",
                    message.role === "user" ? "chat-message-user" : "chat-message-ai"
                  )}
                >
                  {message.content}
                </div>
                {message.role === "user" && (
                  <Avatar className="w-8 h-8 border">
                    <div className="bg-secondary text-white w-8 h-8 flex items-center justify-center">
                      You
                    </div>
                  </Avatar>
                )}
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>
    </div>
  );
}
