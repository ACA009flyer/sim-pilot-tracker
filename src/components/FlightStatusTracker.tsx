
import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Timer, PlaneTakeoff, Navigation, ArrowDown, MapPin, Check, Users } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

type FlightStatus = 'boarding' | 'departure' | 'cruise' | 'descent' | 'approach' | 'taxi' | 'parked' | 'deboarding';

interface FlightPhase {
  id: FlightStatus;
  label: string;
  icon: React.ElementType;
  time?: Date;
}

const flightPhases: FlightPhase[] = [
  { id: 'boarding', label: 'Boarding', icon: Users },
  { id: 'departure', label: 'Departure', icon: PlaneTakeoff },
  { id: 'cruise', label: 'Cruise', icon: Navigation },
  { id: 'descent', label: 'Descent', icon: ArrowDown },
  { id: 'approach', label: 'Approach', icon: PlaneTakeoff },
  { id: 'taxi', label: 'Taxi', icon: Navigation },
  { id: 'parked', label: 'Parked', icon: MapPin },
  { id: 'deboarding', label: 'Deboarding', icon: Users },
];

export const FlightStatusTracker = () => {
  const [currentStatus, setCurrentStatus] = useState<FlightStatus>('boarding');
  const [startTime, setStartTime] = useState<Date>(new Date());
  const { toast } = useToast();

  const updateStatus = (newStatus: FlightStatus) => {
    setCurrentStatus(newStatus);
    const phase = flightPhases.find(phase => phase.id === newStatus);
    toast({
      title: "Flight Status Updated",
      description: `Current phase: ${phase?.label}`,
    });
  };

  const getStatusColor = (status: FlightStatus) => {
    const phases = flightPhases.map(phase => phase.id);
    const currentIndex = phases.indexOf(currentStatus);
    const statusIndex = phases.indexOf(status);

    if (status === currentStatus) return "bg-flight-active text-white";
    if (statusIndex < currentIndex) return "bg-flight-completed text-white";
    return "bg-flight-pending text-white/80";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold text-gray-900">Flight Status Tracker</h1>
          <p className="text-gray-500">Current Phase: {flightPhases.find(phase => phase.id === currentStatus)?.label}</p>
        </div>

        <Card className="p-6 bg-white shadow-lg rounded-xl">
          <div className="grid grid-cols-4 gap-4">
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

        <Card className="p-6 bg-white shadow-lg rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Timer className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-500">Flight started at: {startTime.toLocaleTimeString()}</span>
            </div>
            <Badge variant="outline" className="text-flight-active border-flight-active">
              Active Flight
            </Badge>
          </div>
        </Card>
      </div>
    </div>
  );
};
