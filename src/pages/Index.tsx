
import React, { useState } from "react";
import { ChatHistory, type Message } from "@/components/ChatHistory";
import { VideoDisplay } from "@/components/VideoDisplay";
import { ControlPanel } from "@/components/ControlPanel";
import { InputArea } from "@/components/InputArea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Index = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "你好！我是你的数字人助手。有什么我可以帮你的吗？" }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | undefined>(undefined);
  const [chunkSize, setChunkSize] = useState(5);
  const [avatar, setAvatar] = useState("avatar1");
  const [mode, setMode] = useState("single");
  const [ttsModule, setTtsModule] = useState("gpt-sovits");
  const [voice, setVoice] = useState("longwan");
  
  const handleSendMessage = (content: string) => {
    if (isGenerating) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: "user", content }]);
    
    // Simulate AI response
    setIsGenerating(true);
    setIsStreaming(true);
    
    // This would normally be an API call to your backend
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { 
          role: "ai", 
          content: "这是一个模拟回复。在实际应用中，这会连接到你的AI后端和数字人渲染服务。" 
        }
      ]);
      setIsGenerating(false);
      setIsStreaming(false);
      
      // Notify the user this is a demo
      toast({
        title: "演示模式",
        description: "这是前端演示。连接到后端服务以启用完整功能。",
      });
    }, 2000);
  };

  const handleStopGeneration = () => {
    setIsGenerating(false);
    setIsStreaming(false);
    
    toast({
      title: "生成已停止",
      description: "响应生成已被取消。",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background py-6">
      <div className="container max-w-[1400px] mx-auto px-4">
        <header className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            数字人对话工作室
          </h1>
          <Button variant="outline" asChild>
            <Link to="/audio">
              <Mic className="mr-2 h-4 w-4" />
              语音克隆
            </Link>
          </Button>
        </header>
        
        {/* Main video display taking up most of the screen */}
        <div className="w-full h-[70vh] mb-4">
          <Card className="shadow-md border-2 h-full">
            <CardContent className="p-0 h-full">
              <VideoDisplay isStreaming={isStreaming} videoSrc={videoSrc} />
            </CardContent>
          </Card>
        </div>
        
        {/* Bottom controls area */}
        <div className="flex justify-between items-end gap-4">
          {/* Control panel */}
          <Card className="shadow-sm flex-1">
            <CardContent className="p-4">
              <h3 className="text-lg font-medium mb-4">设置</h3>
              <ControlPanel 
                onAvatarChange={setAvatar}
                onModeChange={setMode}
                onChunkSizeChange={(values) => setChunkSize(values[0])}
                onTtsModuleChange={setTtsModule}
                onVoiceChange={setVoice}
                chunkSize={chunkSize}
              />
            </CardContent>
          </Card>
          
          {/* Chat popup trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button size="lg" className="gap-2">
                打开聊天窗口
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>聊天历史</SheetTitle>
                <SheetDescription>
                  与数字人对话
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-6 flex flex-col h-[calc(100vh-200px)]">
                {/* Chat history */}
                <div className="flex-grow overflow-hidden border rounded-md">
                  <ChatHistory messages={messages} />
                </div>
                
                {/* Input area */}
                <div className="mt-4">
                  <InputArea 
                    onSendMessage={handleSendMessage}
                    onStopGeneration={handleStopGeneration}
                    isGenerating={isGenerating}
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Index;
