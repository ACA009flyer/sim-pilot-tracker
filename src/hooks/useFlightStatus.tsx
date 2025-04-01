
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import type { FlightStatus } from '../components/flight/FlightPhases';

export const useFlightStatus = () => {
  const [currentStatus, setCurrentStatus] = useState<FlightStatus>('boarding');
  const [flightStarted, setFlightStarted] = useState(false);
  const [flightStartTime, setFlightStartTime] = useState<Date | null>(null);
  const [flightEndTime, setFlightEndTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState<string>('00:00');
  const { toast } = useToast();

  // Handle flight timer
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

  // Play boarding music when flight starts
  useEffect(() => {
    if (flightStarted && currentStatus === 'boarding') {
      const boardingMusic = new Audio('/0306.MP3');
      boardingMusic.play().catch(console.error);
      
      const timer = setTimeout(() => {
        boardingMusic.pause();
      }, 30000); // Play for 30 seconds
      
      return () => {
        clearTimeout(timer);
        boardingMusic.pause();
      };
    }
  }, [flightStarted, currentStatus]);

  const startFlight = () => {
    setFlightStarted(true);
  };

  const updateStatus = (newStatus: FlightStatus) => {
    setCurrentStatus(newStatus);
    const phase = flightPhases.find(phase => phase.id === newStatus);
    
    if (newStatus === 'taxi-out') {
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

  return {
    currentStatus,
    flightStarted,
    flightStartTime,
    flightEndTime,
    elapsedTime,
    startFlight,
    updateStatus
  };
};

// This is needed in the hook file to avoid circular dependencies
const flightPhases = [
  { id: 'boarding', label: 'Boarding', icon: null },
  { id: 'taxi-out', label: 'Taxi Out', icon: null },
  { id: 'departure', label: 'Departure', icon: null },
  { id: 'cruise', label: 'Cruise', icon: null },
  { id: 'descent', label: 'Descent', icon: null },
  { id: 'approach', label: 'Approach', icon: null },
  { id: 'taxi-in', label: 'Taxi In', icon: null },
  { id: 'parked', label: 'Parked', icon: null },
  { id: 'deboarding', label: 'Deboarding', icon: null },
];
