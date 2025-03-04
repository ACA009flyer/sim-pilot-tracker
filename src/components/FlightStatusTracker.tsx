import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Timer, PlaneTakeoff, Navigation, ArrowDown, MapPin, Check, Users } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { useLocation, Navigate } from 'react-router-dom';

type FlightStatus = 'boarding' | 'taxi-out' | 'departure' | 'cruise' | 'descent' | 'approach' | 'taxi-in' | 'parked' | 'deboarding';

interface FlightPhase {
  id: FlightStatus;
  label: string;
  icon: React.ElementType;
  time?: Date;
}

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

export const FlightStatusTracker = () => {
  const location = useLocation();
  const { departure, arrival } = location.state || {};

  if (!departure || !arrival) {
    return <Navigate to="/" replace />;
  }

  const [currentStatus, setCurrentStatus] = useState<FlightStatus>('boarding');
  const [flightStartTime, setFlightStartTime] = useState<Date | null>(null);
  const [flightEndTime, setFlightEndTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState<string>('00:00');
  const { toast } = useToast();

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (flightStartTime && !flightEndTime) {
      intervalId = setInterval(() => {
        const now = new Date();
        const diff = now.getTime() - flightStartTime.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setElapsedTime(
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
        );
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [flightStartTime, flightEndTime]);

  const updateStatus = (newStatus: FlightStatus) => {
    setCurrentStatus(newStatus);
    const phase = flightPhases.find(phase => phase.id === newStatus);
    
    if (newStatus === 'taxi-out' && !flightStartTime) {
      setFlightStartTime(new Date());
      toast({
        title: "Flight Timer Started",
        description: "The flight timer has begun.",
      });
    } else if (newStatus === 'parked') {
      setFlightEndTime(new Date());
      toast({
        title: "Flight Complete",
        description: `Total flight time: ${elapsedTime}`,
      });
    }

    toast({
      title: "Flight Status Updated",
      description: `Current phase: ${phase?.label}`,
    });
  };

  const getStatusColor = (status: FlightStatus) => {
    const phases = flightPhases.map(phase => phase.id);
    const currentIndex = phases.indexOf(currentStatus);
    const statusIndex = phases.indexOf(status);

    if (status === currentStatus) return "bg-[#ea384c] text-white";
    if (statusIndex < currentIndex) return "bg-black/90 text-white";
    return "bg-gray-600/40 text-white/80";
  };

  const isFlightActive = flightStartTime && !flightEndTime;

  return (
    <div className="min-h-screen bg-black/95 p-6">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold text-white">Air Canada Flight Status</h1>
          <div className="text-[#ea384c] space-y-1">
            <p>From: {departure} - To: {arrival}</p>
            <p>Current Phase: {flightPhases.find(phase => phase.id === currentStatus)?.label}</p>
          </div>
        </div>

        <Card className="p-6 bg-black/80 shadow-lg rounded-xl border-[#ea384c]/20">
          <div className="grid grid-cols-3 gap-4">
            {flightPhases.map((phase) => (
              <Button
                key={phase.id}
                onClick={() => updateStatus(phase.id)}
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

        <Card className="p-6 bg-black/80 shadow-lg rounded-xl border-[#ea384c]/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Timer className="h-5 w-5 text-[#ea384c]" />
              <span className="text-sm text-white">
                {flightEndTime ? 'Total Flight Time: ' : 'Flight Time: '}{elapsedTime}
              </span>
            </div>
            {isFlightActive ? (
              <Badge 
                variant="outline" 
                className="text-[#ea384c] border-[#ea384c]"
              >
                Active Flight
              </Badge>
            ) : null}
          </div>
        </Card>
      </div>
    </div>
  );
};
