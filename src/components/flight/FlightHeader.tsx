
import { Music2, VolumeX } from 'lucide-react';
import { Button } from "@/components/ui/button";

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
        src="/Cabin Safety Instruction Sound (1).mp3"
      />
    </div>
  );
};
