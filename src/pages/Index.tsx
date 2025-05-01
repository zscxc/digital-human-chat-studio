
import React from "react";
import { ChatHistory, type Message } from "@/components/ChatHistory";
import { VideoDisplay } from "@/components/VideoDisplay";
import { ControlPanel } from "@/components/ControlPanel";
import { InputArea } from "@/components/InputArea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

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
  
  const handleAudioRecorded = (audioBlob: Blob) => {
    // Here you would normally send the audio to your backend for STT
    toast({
      title: "Audio Recorded",
      description: "Audio recording received. In a real application, this would be sent for speech-to-text processing.",
    });
    
    // For demo purposes, simulate a message after recording
    setTimeout(() => {
      handleSendMessage("This is a simulated message from voice input.");
    }, 1000);
  };
  
  const handleAudioUploaded = (file: File) => {
    toast({
      title: "Audio Uploaded",
      description: `File "${file.name}" received. In a real application, this would be sent for processing.`,
    });
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
      <div className="container max-w-6xl mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Digital Human Chat Studio
          </h1>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Column - Chat History */}
          <Card className="lg:col-span-3 shadow-md border-2">
            <CardContent className="p-0 h-[500px] flex flex-col">
              <ChatHistory messages={messages} />
            </CardContent>
          </Card>
          
          {/* Right Column - Video Display */}
          <Card className="lg:col-span-2 shadow-md border-2">
            <CardContent className="p-0 h-[500px]">
              <VideoDisplay isStreaming={isStreaming} videoSrc={videoSrc} />
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-6 space-y-6">
          {/* Controls */}
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Settings</h3>
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
          
          {/* Input Area */}
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <InputArea 
                onSendMessage={handleSendMessage}
                onStopGeneration={handleStopGeneration}
                isGenerating={isGenerating}
                onAudioRecorded={handleAudioRecorded}
                onAudioUploaded={handleAudioUploaded}
              />
              
              <div className="mt-3 text-xs text-muted-foreground text-center">
                This is a frontend demo. Connect to your backend for full digital human functionality.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
