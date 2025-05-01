
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface VideoDisplayProps {
  isStreaming: boolean;
  videoSrc?: string;
}

export function VideoDisplay({ isStreaming, videoSrc }: VideoDisplayProps) {
  return (
    <Card className="border-2 border-border h-full">
      <CardContent className="p-0 h-full relative">
        {videoSrc ? (
          <video
            src={videoSrc}
            autoPlay
            muted={false}
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-full bg-muted/30 rounded-md flex flex-col items-center justify-center">
            {isStreaming ? (
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-primary animate-pulse-slow" />
                </div>
                <p className="text-sm text-muted-foreground">Connecting to digital human...</p>
              </div>
            ) : (
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-muted/50 mx-auto flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-4 border-muted-foreground/20" />
                </div>
                <p className="text-base font-medium">Digital Human</p>
                <p className="text-sm text-muted-foreground">Start a conversation to activate</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
