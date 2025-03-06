
import { Timer } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface FlightTimerProps {
  elapsedTime: string;
  isFlightActive: boolean;
}

export const FlightTimer = ({ elapsedTime, isFlightActive }: FlightTimerProps) => {
  return (
    <Card className="p-6 bg-black/80 shadow-lg rounded-xl border-[#ea384c]/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Timer className="h-5 w-5 text-[#ea384c]" />
          <span className="text-sm text-white">
            Flight Time: {elapsedTime}
          </span>
        </div>
        {isFlightActive && (
          <Badge 
            variant="outline" 
            className="text-[#ea384c] border-[#ea384c]"
          >
            Active Flight
          </Badge>
        )}
      </div>
    </Card>
  );
};
