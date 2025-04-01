
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StartFlightButtonProps {
  onStartFlight: () => void;
}

export const StartFlightButton = ({ onStartFlight }: StartFlightButtonProps) => {
  return (
    <Card className="p-6 bg-black/80 shadow-lg rounded-xl border-[#ea384c]/20">
      <div className="text-center">
        <Button
          onClick={onStartFlight}
          className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90"
        >
          Start Flight
        </Button>
      </div>
    </Card>
  );
};
