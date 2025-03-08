
import React from 'react';
import { Card } from "@/components/ui/card";
import { AudioButtonGrid } from './AudioButtonGrid';
import { AudioControls, useAudioControl } from './AudioControls';

interface FlightAudioProps {
  currentStatus: string;
  onAudioPlay: (isPlaying: boolean) => void;
}

export const FlightAudio = ({ currentStatus, onAudioPlay }: FlightAudioProps) => {
  const { currentAudio, handleAudioPlay } = useAudioControl();

  return (
    <Card className="p-6 bg-black/80 shadow-lg rounded-xl border-[#ea384c]/20">
      <AudioButtonGrid 
        onAudioSelect={(file) => handleAudioPlay(file, onAudioPlay)} 
      />
      <AudioControls currentAudio={currentAudio} onAudioPlay={onAudioPlay} />
    </Card>
  );
};
