import React, { useState, useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useLocation, Navigate } from 'react-router-dom';
import { CabinPanel } from "@/components/CabinPanel";
import { FlightHeader } from './flight/FlightHeader';
import { FlightPhases, type FlightStatus, flightPhases } from './flight/FlightPhases';
import { FlightTimer } from './flight/FlightTimer';
import { ListCheck, Check } from 'lucide-react';

export const FlightStatusTracker = () => {
  const location = useLocation();
  const { departure, arrival, flightType } = location.state || {};
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [flightStarted, setFlightStarted] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<FlightStatus>('boarding');
  const [flightStartTime, setFlightStartTime] = useState<Date | null>(null);
  const [flightEndTime, setFlightEndTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState<string>('00:00');
  const { toast } = useToast();

  if (!departure || !arrival) {
    return <Navigate to="/" replace />;
  }

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
      setFlightStarted(true);
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

  const currentPhase = flightPhases.find(phase => phase.id === currentStatus)?.label || '';
  const isFlightActive = flightStartTime && !flightEndTime;

  return (
    <div className="min-h-screen bg-black/95 p-6">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <FlightHeader 
          departure={departure}
          arrival={arrival}
          flightType={flightType}
          currentPhase={currentPhase}
          isPlaying={isPlaying}
          onTogglePlay={togglePlay}
        />

        {flightStarted && (
          <>
            <FlightPhases
              currentStatus={currentStatus}
              onUpdateStatus={updateStatus}
            />

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 bg-black/80 shadow-lg rounded-xl border-[#ea384c]/20">
                <CabinPanel flightType={flightType} />
              </Card>

              <Card className="p-6 bg-black/80 shadow-lg rounded-xl border-[#ea384c]/20">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <ListCheck className="h-5 w-5 text-[#ea384c]" />
                    Flight Check List
                  </h2>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/80">
                    <Check className="h-4 w-4 text-[#ea384c]" />
                    <span>Pre-flight checks complete</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Check className="h-4 w-4 text-[#ea384c]" />
                    <span>Safety briefing completed</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Check className="h-4 w-4 text-[#ea384c]" />
                    <span>Cabin secured</span>
                  </div>
                </div>
              </Card>
            </div>

            <FlightTimer
              elapsedTime={elapsedTime}
              isFlightActive={isFlightActive}
            />
          </>
        )}

        {!flightStarted && (
          <Card className="p-6 bg-black/80 shadow-lg rounded-xl border-[#ea384c]/20">
            <div className="text-center">
              <Button
                onClick={() => updateStatus('taxi-out')}
                className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90"
              >
                Start Flight
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
