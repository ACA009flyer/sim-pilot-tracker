
import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause } from 'lucide-react';

interface CabinPanelProps {
  flightType: string;
}

export const CabinPanel = ({ flightType }: CabinPanelProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleSafetyAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Card className="p-6 bg-black/80 shadow-lg rounded-xl border-[#ea384c]/20">
      <div className="flex flex-col space-y-4">
        <h2 className="text-lg font-semibold text-white">Cabin Safety Panel</h2>
        <Button
          onClick={toggleSafetyAudio}
          className="bg-[#ea384c] hover:bg-[#ea384c]/90 text-white"
        >
          {isPlaying ? (
            <>
              <Pause className="h-4 w-4 mr-2" />
              Pause Safety Briefing
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Play Safety Briefing
            </>
          )}
        </Button>
        <audio ref={audioRef} src="/path-to-your-audio.mp3" />
        <p className="text-sm text-white/80">Flight Type: {flightType}</p>
      </div>
    </Card>
  );
};
