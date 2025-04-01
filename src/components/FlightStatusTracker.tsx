
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { FlightHeader } from './flight/FlightHeader';
import { FlightPhases } from './flight/FlightPhases';
import { FlightTimer } from './flight/FlightTimer';
import { FlightAudio } from './flight/FlightAudio';
import { IFESystem } from './flight/IFESystem';
import { CheckList } from './flight/CheckList';
import { MealButton } from './flight/MealButton';
import { MealService } from './flight/MealService';
import { StartFlightButton } from './flight/StartFlightButton';
import { useMealService, mealOptions, drinkOptions } from '@/hooks/useMealService';
import { useFlightStatus } from '@/hooks/useFlightStatus';

export const FlightStatusTracker = () => {
  const location = useLocation();
  const { departure, arrival, flightType } = location.state || {};
  const [isAnnouncement, setIsAnnouncement] = useState(false);

  const { 
    currentStatus, 
    flightStarted, 
    flightStartTime, 
    flightEndTime,
    elapsedTime, 
    startFlight, 
    updateStatus 
  } = useFlightStatus();

  const {
    showMealService,
    servingMeal,
    mealTimeLeft,
    mealDetails,
    canServeMeal,
    servingMealAudio,
    handleShowMealService,
    handleCancelMealService,
    handleServeMeal,
    clearMealService
  } = useMealService(setIsAnnouncement);

  const handleAudioPlayback = (isPlaying: boolean) => {
    setIsAnnouncement(isPlaying);
  };

  if (!departure || !arrival) {
    return <Navigate to="/" replace />;
  }

  const currentPhase = flightPhases.find(phase => phase.id === currentStatus)?.label || '';
  const isFlightActive = flightStartTime && !flightEndTime;
  const showMealButton = currentStatus === 'cruise' && !servingMeal && !showMealService && canServeMeal;

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {showMealButton && (
                <MealButton onClick={handleShowMealService} />
              )}
            </div>

            <MealService 
              showMealService={showMealService}
              servingMeal={servingMeal}
              mealTimeLeft={mealTimeLeft}
              mealDetails={mealDetails}
              mealOptions={mealOptions}
              drinkOptions={drinkOptions}
              onCancel={handleCancelMealService}
              onServeMeal={handleServeMeal}
              onClearService={clearMealService}
              servingMealAudio={servingMealAudio}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FlightAudio 
                currentStatus={currentStatus}
                onAudioPlay={handleAudioPlayback}
              />
              <IFESystem isAnnouncement={isAnnouncement} />
            </div>

            <CheckList currentStatus={currentStatus} />

            <FlightTimer
              elapsedTime={elapsedTime}
              isFlightActive={isFlightActive}
            />
          </>
        )}

        {!flightStarted && (
          <StartFlightButton onStartFlight={startFlight} />
        )}
      </div>
    </div>
  );
};

// Using this here to avoid circular dependencies
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
