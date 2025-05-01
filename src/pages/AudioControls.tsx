
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AudioRecorder } from "@/components/AudioRecorder";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const AudioControls = () => {
  const { toast } = useToast();

  const handleAudioRecorded = (audioBlob: Blob) => {
    // Here you would normally send the audio to your backend for STT
    toast({
      title: "音频已录制",
      description: "已收到音频录制。在实际应用中，这将被发送进行语音转文本处理。",
    });
  };
  
  const handleAudioUploaded = (file: File) => {
    toast({
      title: "音频已上传",
      description: `文件"${file.name}"已收到。在实际应用中，这将被发送进行处理。`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background py-6">
      <div className="container max-w-[800px] mx-auto px-4">
        <header className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回聊天
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            语音克隆
          </h1>
        </header>
        
        <Card className="shadow-md border-2 mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">语音录制与上传</h2>
            <p className="text-muted-foreground mb-6">
              录制音频或上传音频文件，以与数字人助手互动。
              录音将进行语音转文本处理。
            </p>
            
            <AudioRecorder 
              onRecordingComplete={handleAudioRecorded}
              onFileUpload={handleAudioUploaded}
              className="w-full"
            />
          </CardContent>
        </Card>
        
        <Card className="shadow-md border-2">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">音频处理信息</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">录音提示</h3>
                <ul className="list-disc pl-5 text-muted-foreground">
                  <li>清晰地说话，语速适中</li>
                  <li>录音默认限制为10秒</li>
                  <li>尽量减少背景噪音以获得更好的结果</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium">支持的音频格式</h3>
                <ul className="list-disc pl-5 text-muted-foreground">
                  <li>WAV (.wav)</li>
                  <li>MP3 (.mp3)</li>
                  <li>OGG (.ogg)</li>
                  <li>M4A (.m4a)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AudioControls;
