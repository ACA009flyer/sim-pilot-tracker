import { Music2, VolumeX } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useRef, useEffect } from 'react';

interface FlightHeaderProps {
  departure: string;
  arrival: string;
  flightType: string;
  currentPhase: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const FlightHeader = ({ 
  departure, 
  arrival, 
  flightType, 
  currentPhase,
  isPlaying,
  onTogglePlay 
}: FlightHeaderProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="text-center space-y-2">
      <h1 className="text-3xl font-semibold text-white">Air Canada Flight Status</h1>
      <div className="text-[#ea384c] space-y-1">
        <p>From: {departure} - To: {arrival}</p>
        <p>Flight Type: {flightType}</p>
        <p>Current Phase: {currentPhase}</p>
      </div>

      <div className="mt-4 flex justify-center gap-4">
        <Button
          onClick={onTogglePlay}
          className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90"
        >
          {isPlaying ? <VolumeX className="h-5 w-5" /> : <Music2 className="h-5 w-5" />}
          {isPlaying ? 'Stop Safety Instructions' : 'Play Safety Instructions'}
        </Button>
      </div>
      <audio 
        ref={audioRef}
        src={new URL('/Cabin Safety Instruction Sound (1).mp3', import.meta.url).href}
      />
    </div>
  );
};
