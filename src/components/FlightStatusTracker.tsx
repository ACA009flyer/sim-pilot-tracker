import React, { useState, useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useLocation, Navigate } from 'react-router-dom';
import { FlightHeader } from './flight/FlightHeader';
import { FlightPhases, type FlightStatus, flightPhases } from './flight/FlightPhases';
import { FlightTimer } from './flight/FlightTimer';
import { FlightAudio } from './flight/FlightAudio';
import { CheckList } from './flight/CheckList';
import { IFESystem } from './flight/IFESystem';
import { Utensils } from 'lucide-react';

export const FlightStatusTracker = () => {
  const location = useLocation();
  const { departure, arrival, flightType, servingMeal, mealDetails } = location.state || {};
  const [isPlaying, setIsPlaying] = useState(false);
  const [flightStarted, setFlightStarted] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<FlightStatus>('boarding');
  const [flightStartTime, setFlightStartTime] = useState<Date | null>(null);
  const [flightEndTime, setFlightEndTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState<string>('00:00');
  const [isAnnouncement, setIsAnnouncement] = useState(false);
  const [mealTimeLeft, setMealTimeLeft] = useState(600); // 10 minutes in seconds
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

  useEffect(() => {
    let mealTimer: NodeJS.Timeout;
    if (servingMeal && mealTimeLeft > 0) {
      mealTimer = setInterval(() => {
        setMealTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (mealTimeLeft === 0 && servingMeal) {
      toast({
        title: "Service Complete",
        description: "Please clear the served meals.",
      });
    }
    return () => clearInterval(mealTimer);
  }, [servingMeal, mealTimeLeft]);

  const updateStatus = (newStatus: FlightStatus) => {
    setCurrentStatus(newStatus);
    const phase = flightPhases.find(phase => phase.id === newStatus);
    
    if (newStatus === 'taxi-out') {
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

  const handleAudioPlayback = (isPlaying: boolean) => {
    setIsAnnouncement(isPlaying);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const clearMealService = () => {
    const newState = { ...location.state };
    delete newState.servingMeal;
    delete newState.mealDetails;
    window.history.replaceState({}, '', window.location.pathname);
    window.history.pushState(newState, '', window.location.pathname);
    setMealTimeLeft(600);
    toast({
      title: "Meal Service Cleared",
      description: "You can now start a new meal service.",
    });
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
          isPlaying={false}
          onTogglePlay={() => {}}
        />

        {flightStarted && (
          <>
            <FlightPhases
              currentStatus={currentStatus}
              onUpdateStatus={updateStatus}
            />

            {servingMeal && (
              <Card className="p-6 bg-black/80 shadow-lg rounded-xl border-[#ea384c]/20">
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-semibold text-white">Service in Progress</h2>
                  <p className="text-xl text-[#ea384c]">{formatTime(mealTimeLeft)}</p>
                  <p className="text-gray-300">
                    Serving {mealDetails.meal.name} with {mealDetails.drink}
                  </p>
                  {mealTimeLeft === 0 && (
                    <Button
                      onClick={clearMealService}
                      className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90"
                    >
                      <Utensils className="mr-2 h-4 w-4" />
                      Clear Service
                    </Button>
                  )}
                </div>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FlightAudio 
                currentStatus={currentStatus}
                onAudioPlay={handleAudioPlayback}
              />
              <IFESystem isAnnouncement={isAnnouncement} />
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
                onClick={() => setFlightStarted(true)}
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
