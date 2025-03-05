
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Music2, VolumeX } from 'lucide-react';
import type { FlightInfo } from '@/types/flight';

interface FlightHeaderProps extends FlightInfo {
  currentPhase: string;
}

export const FlightHeader = ({ departure, arrival, flightType, currentPhase }: FlightHeaderProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
    }
  };

  const togglePlay = () => {
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
    <div className="text-center space-y-2">
      <h1 className="text-3xl font-semibold text-white">Air Canada Flight Status</h1>
      <div className="text-[#ea384c] space-y-1">
        <p>From: {departure} - To: {arrival}</p>
        <p>Flight Type: {flightType}</p>
        <p>Current Phase: {currentPhase}</p>
      </div>

      <div className="mt-4 flex justify-center gap-4">
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="hidden"
          id="audio-upload"
        />
        <label
          htmlFor="audio-upload"
          className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-[#ea384c] text-white rounded-md hover:bg-[#ea384c]/90"
        >
          <Music2 className="h-5 w-5" />
          Upload Music
        </label>
        {audioUrl && (
          <Button
            onClick={togglePlay}
            className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90"
          >
            {isPlaying ? <VolumeX className="h-5 w-5" /> : <Music2 className="h-5 w-5" />}
            {isPlaying ? 'Stop Music' : 'Play Music'}
          </Button>
        )}
      </div>
      <audio ref={audioRef} src={audioUrl || ''} />
    </div>
  );
};
