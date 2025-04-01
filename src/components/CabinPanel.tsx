
import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface CabinPanelProps {
  flightType: string;
}

export const CabinPanel = ({ flightType }: CabinPanelProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const toggleSafetyAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(error => {
          console.error("Audio playback error:", error);
          toast({
            title: "Playback Error",
            description: "There was an error playing the audio.",
            variant: "destructive",
          });
        });
        setIsPlaying(true);
      }
    }
  };

  return (
    <Card className="p-6 bg-black/80 shadow-lg rounded-xl border-[#ea384c]/20">
      <div className="flex flex-col space-y-4">
        <h2 className="text-lg font-semibold text-white">Cabin Safety Panel</h2>
        
        <div className="flex gap-2">
          <Button
            onClick={toggleSafetyAudio}
            className="flex-1 bg-[#ea384c] hover:bg-[#ea384c]/90 text-white"
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
        </div>
        
        <audio ref={audioRef} src="/0314.MP3" />
        <p className="text-sm text-white/80">Flight Type: {flightType}</p>
      </div>
    </Card>
  );
};
