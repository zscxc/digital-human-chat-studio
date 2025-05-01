
import React from "react";
import { ChatHistory, type Message } from "@/components/ChatHistory";
import { VideoDisplay } from "@/components/VideoDisplay";
import { ControlPanel } from "@/components/ControlPanel";
import { InputArea } from "@/components/InputArea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { toast } = useToast();
  const [messages, setMessages] = React.useState<Message[]>([
    { role: "ai", content: "Hello! I'm your digital human assistant. How can I help you today?" }
  ]);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [isStreaming, setIsStreaming] = React.useState(false);
  const [videoSrc, setVideoSrc] = React.useState<string | undefined>(undefined);
  const [chunkSize, setChunkSize] = React.useState(5);
  const [avatar, setAvatar] = React.useState("avatar1");
  const [mode, setMode] = React.useState("single");
  const [ttsModule, setTtsModule] = React.useState("gpt-sovits");
  const [voice, setVoice] = React.useState("longwan");
  
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
          content: "This is a simulated response from the digital human. In a real application, this would connect to your AI backend and digital human rendering service." 
        }
      ]);
      setIsGenerating(false);
      setIsStreaming(false);
      
      // Notify the user this is a demo
      toast({
        title: "Demo Mode",
        description: "This is a frontend demo. Connect to your backend services to enable full functionality.",
      });
    }, 2000);
  };

  const handleStopGeneration = () => {
    setIsGenerating(false);
    setIsStreaming(false);
    
    toast({
      title: "Generation Stopped",
      description: "Response generation has been canceled.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background py-6">
      <div className="container max-w-[1400px] mx-auto px-4">
        <header className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Digital Human Chat Studio
          </h1>
          <Button variant="outline" asChild>
            <Link to="/audio">
              <Mic className="mr-2 h-4 w-4" />
              Audio Controls
            </Link>
          </Button>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Digital Human Video */}
          <div className="lg:col-span-7 xl:col-span-8">
            <Card className="shadow-md border-2 h-[650px]">
              <CardContent className="p-0 h-full">
                <VideoDisplay isStreaming={isStreaming} videoSrc={videoSrc} />
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Chat and Controls */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
            {/* Chat History */}
            <Card className="shadow-md border-2 flex-grow">
              <CardContent className="p-0 h-[400px] flex flex-col">
                <ChatHistory messages={messages} />
              </CardContent>
            </Card>
            
            {/* Input Area */}
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <InputArea 
                  onSendMessage={handleSendMessage}
                  onStopGeneration={handleStopGeneration}
                  isGenerating={isGenerating}
                />
              </CardContent>
            </Card>
          
            {/* Controls */}
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <h3 className="text-lg font-medium mb-4">Settings</h3>
                <ControlPanel 
                  onAvatarChange={setAvatar}
                  onModeChange={setMode}
                  onChunkSizeChange={(values) => setChunkSize(values[0])}
                  onTtsModuleChange={setTtsModule}
                  onVoiceChange={setVoice}
                  chunkSize={chunkSize}
                />
                <div className="mt-3 text-xs text-muted-foreground text-center">
                  This is a frontend demo. Connect to your backend for full digital human functionality.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
