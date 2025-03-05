
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Navigation, PlaneTakeoff, ArrowDown, MapPin } from 'lucide-react';
import type { FlightPhase, FlightStatus } from '@/types/flight';

const flightPhases: FlightPhase[] = [
  { id: 'boarding', label: 'Boarding', icon: Users },
  { id: 'taxi-out', label: 'Taxi Out', icon: Navigation },
  { id: 'departure', label: 'Departure', icon: PlaneTakeoff },
  { id: 'cruise', label: 'Cruise', icon: Navigation },
  { id: 'descent', label: 'Descent', icon: ArrowDown },
  { id: 'approach', label: 'Approach', icon: PlaneTakeoff },
  { id: 'taxi-in', label: 'Taxi In', icon: Navigation },
  { id: 'parked', label: 'Parked', icon: MapPin },
  { id: 'deboarding', label: 'Deboarding', icon: Users },
];

interface FlightPhasesPanelProps {
  currentStatus: FlightStatus;
  onUpdateStatus: (status: FlightStatus) => void;
}

export const FlightPhasesPanel = ({ currentStatus, onUpdateStatus }: FlightPhasesPanelProps) => {
  const getStatusColor = (status: FlightStatus) => {
    const phases = flightPhases.map(phase => phase.id);
    const currentIndex = phases.indexOf(currentStatus);
    const statusIndex = phases.indexOf(status);

    if (status === currentStatus) return "bg-[#ea384c] text-black font-bold";
    if (statusIndex < currentIndex) return "bg-black/90 text-[#ea384c] font-bold";
    return "bg-gray-600/40 text-black font-bold";
  };

  return (
    <Card className="p-6 bg-black/80 shadow-lg rounded-xl border-[#ea384c]/20">
      <div className="grid grid-cols-3 gap-4">
        {flightPhases.map((phase) => (
          <Button
            key={phase.id}
            onClick={() => onUpdateStatus(phase.id)}
            className={`h-24 flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
              getStatusColor(phase.id)
            }`}
          >
            <phase.icon className="h-6 w-6" />
            <span className="text-sm font-medium">{phase.label}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
};

export { flightPhases };
