
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface VideoDisplayProps {
  isStreaming: boolean;
  videoSrc?: string;
}

export function VideoDisplay({ isStreaming, videoSrc }: VideoDisplayProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {videoSrc ? (
        <video
          src={videoSrc}
          autoPlay
          muted={false}
          className="w-full h-full object-contain"
        />
      ) : (
        <div className="w-full h-full bg-muted/30 rounded-md flex flex-col items-center justify-center">
          {isStreaming ? (
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-primary/20 mx-auto flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-primary animate-pulse-slow" />
              </div>
              <p className="text-base text-muted-foreground">正在连接数字人...</p>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-muted/50 mx-auto flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-4 border-muted-foreground/20" />
              </div>
              <p className="text-xl font-medium">数字人</p>
              <p className="text-base text-muted-foreground">开始对话以激活</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
