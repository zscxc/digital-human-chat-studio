
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";

interface ControlPanelProps {
  onAvatarChange: (value: string) => void;
  onModeChange: (value: string) => void;
  onChunkSizeChange: (value: number[]) => void;
  onTtsModuleChange: (value: string) => void;
  onVoiceChange: (value: string) => void;
  chunkSize: number;
}

export function ControlPanel({
  onAvatarChange,
  onModeChange,
  onChunkSizeChange,
  onTtsModuleChange,
  onVoiceChange,
  chunkSize
}: ControlPanelProps) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
      <div className="space-y-2">
        <Label htmlFor="avatar">Digital Human</Label>
        <Select onValueChange={onAvatarChange} defaultValue="avatar1">
          <SelectTrigger id="avatar">
            <SelectValue placeholder="Select avatar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="avatar1">Avatar1 (通义万相)</SelectItem>
            <SelectItem value="avatar2">Avatar2 (通义万相)</SelectItem>
            <SelectItem value="avatar3">Avatar3 (MuseV)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="mode">Chat Mode</Label>
        <Select onValueChange={onModeChange} defaultValue="single">
          <SelectTrigger id="mode">
            <SelectValue placeholder="Select mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="single">Single Answer</SelectItem>
            <SelectItem value="interactive">Interactive</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="tts">TTS Engine</Label>
        <Select onValueChange={onTtsModuleChange} defaultValue="gpt-sovits">
          <SelectTrigger id="tts">
            <SelectValue placeholder="Select TTS" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gpt-sovits">GPT-SoVits</SelectItem>
            <SelectItem value="cosyvoice">CosyVoice</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="voice">Voice</Label>
        <Select onValueChange={onVoiceChange} defaultValue="longwan">
          <SelectTrigger id="voice">
            <SelectValue placeholder="Select voice" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="longwan">Longwan (CosyVoice)</SelectItem>
            <SelectItem value="longxiaochun">Longxiaochun (CosyVoice)</SelectItem>
            <SelectItem value="longcheng">Longcheng (CosyVoice)</SelectItem>
            <SelectItem value="longhua">Longhua (CosyVoice)</SelectItem>
            <SelectItem value="female-young">Young Female (GPT-SoVits)</SelectItem>
            <SelectItem value="female">Female (GPT-SoVits)</SelectItem>
            <SelectItem value="male-young">Young Male (GPT-SoVits)</SelectItem>
            <SelectItem value="male">Male (GPT-SoVits)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <Label htmlFor="chunk-size">Chunk Size: {chunkSize}</Label>
        </div>
        <Slider
          id="chunk-size"
          defaultValue={[5]}
          min={0}
          max={30}
          step={1}
          onValueChange={onChunkSizeChange}
        />
      </div>
    </div>
  );
}
