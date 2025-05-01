
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
      title: "Audio Recorded",
      description: "Audio recording received. In a real application, this would be sent for speech-to-text processing.",
    });
  };
  
  const handleAudioUploaded = (file: File) => {
    toast({
      title: "Audio Uploaded",
      description: `File "${file.name}" received. In a real application, this would be sent for processing.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background py-6">
      <div className="container max-w-[800px] mx-auto px-4">
        <header className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Chat
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Audio Controls
          </h1>
        </header>
        
        <Card className="shadow-md border-2 mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Voice Recording & Upload</h2>
            <p className="text-muted-foreground mb-6">
              Record audio or upload audio files to interact with the digital human assistant.
              Recordings will be processed for speech-to-text conversion.
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
            <h2 className="text-xl font-semibold mb-4">Audio Processing Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Recording Tips</h3>
                <ul className="list-disc pl-5 text-muted-foreground">
                  <li>Speak clearly and at a moderate pace</li>
                  <li>Recordings are limited to 10 seconds by default</li>
                  <li>Minimize background noise for better results</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium">Supported Audio Formats</h3>
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
