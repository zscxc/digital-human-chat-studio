
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
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
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
    <div className="min-h-screen flex flex-col bg-background pb-0">
      <div className="container max-w-[1400px] mx-auto px-4 flex flex-col h-screen">
        <header className="py-4 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            数字人对话工作室
          </h1>
          <Button variant="outline" asChild>
            <Link to="/audio">
              <Mic className="mr-2 h-4 w-4" />
              语音克隆
            </Link>
          </Button>
        </header>
        
        <div className="flex flex-1 gap-4 overflow-hidden">
          {/* Main video display taking up most of the screen - left side */}
          <div className="w-full md:w-2/3 h-full">
            <Card className="shadow-md border-2 h-full">
              <CardContent className="p-0 h-full">
                <VideoDisplay isStreaming={isStreaming} videoSrc={videoSrc} />
              </CardContent>
            </Card>
          </div>
          
          {/* Right side panel with chat and controls */}
          <div className="hidden md:flex md:w-1/3 flex-col gap-4 h-full">
            {/* Chat history always visible on desktop */}
            <Card className="shadow-sm flex-grow overflow-hidden">
              <CardContent className="p-2 h-full">
                <div className="flex flex-col h-full">
                  <div className="text-center py-2 bg-card shadow-sm border-b">
                    <h3 className="text-lg font-medium">聊天历史</h3>
                  </div>
                  <div className="flex-grow overflow-hidden">
                    <ChatHistory messages={messages} />
                  </div>
                  <div className="mt-2">
                    <InputArea 
                      onSendMessage={handleSendMessage}
                      onStopGeneration={handleStopGeneration}
                      isGenerating={isGenerating}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Control panel at the bottom */}
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <h3 className="text-lg font-medium mb-3">设置</h3>
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
          </div>
          
          {/* Mobile chat button that shows at the bottom of the screen */}
          {isMobile && (
            <div className="fixed bottom-4 right-4 z-50">
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="lg" className="rounded-full shadow-lg h-14 w-14 p-0">
                    <span className="sr-only">打开聊天窗口</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[90%] sm:w-[540px] h-[80%]">
                  <SheetHeader>
                    <SheetTitle>聊天对话</SheetTitle>
                    <SheetDescription>
                      与数字人对话
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="mt-6 flex flex-col h-[calc(100%-100px)]">
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
          )}
          
          {/* Mobile settings drawer at the bottom */}
          {isMobile && (
            <div className="fixed bottom-4 left-4 z-50">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="lg" className="rounded-full shadow-lg h-14 w-14 p-0">
                    <span className="sr-only">打开设置</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[60%]">
                  <SheetHeader>
                    <SheetTitle>设置</SheetTitle>
                  </SheetHeader>
                  
                  <div className="mt-4">
                    <ControlPanel 
                      onAvatarChange={setAvatar}
                      onModeChange={setMode}
                      onChunkSizeChange={(values) => setChunkSize(values[0])}
                      onTtsModuleChange={setTtsModule}
                      onVoiceChange={setVoice}
                      chunkSize={chunkSize}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
