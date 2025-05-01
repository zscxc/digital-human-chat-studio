
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, StopCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputAreaProps {
  onSendMessage: (message: string) => void;
  onStopGeneration: () => void;
  isGenerating: boolean;
  onAudioRecorded?: (audioBlob: Blob) => void;
  onAudioUploaded?: (file: File) => void;
}

export function InputArea({
  onSendMessage,
  onStopGeneration,
  isGenerating
}: InputAreaProps) {
  const [message, setMessage] = React.useState("");
  
  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  return (
    <div>
      <div className="relative">
        <Textarea 
          placeholder="在此输入您的消息..." 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isGenerating}
          className="pr-16 min-h-[60px] resize-none"
        />
        <div className="absolute bottom-2 right-2">
          {isGenerating ? (
            <Button 
              size="sm" 
              variant="destructive"
              onClick={onStopGeneration}
              className="h-8 rounded-full"
            >
              <StopCircle className="h-4 w-4 mr-1" />
              停止
            </Button>
          ) : (
            <Button 
              size="sm" 
              onClick={handleSend}
              disabled={!message.trim()}
              className="h-8 rounded-full"
            >
              <Send className="h-4 w-4 mr-1" />
              发送
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
