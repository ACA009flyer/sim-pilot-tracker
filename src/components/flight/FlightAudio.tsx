
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Music2, 
  Plane, 
  Wind, 
  AlertTriangle, 
  Compass, 
  CloudSun, 
  Utensils,
  Navigation,
  MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FlightAudioProps {
  currentStatus: string;
}

export const FlightAudio = ({ currentStatus }: FlightAudioProps) => {
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate();

  const handleAudioPlay = (audioFile: string) => {
    if (audioRef.current) {
      if (currentAudio === audioFile) {
        audioRef.current.pause();
        setCurrentAudio(null);
      } else {
        audioRef.current.src = audioFile;
        audioRef.current.play();
        setCurrentAudio(audioFile);
      }
    }
  };

  const handleMealService = () => {
    navigate('/meal-service');
  };

  return (
    <Card className="p-6 bg-black/80 shadow-lg rounded-xl border-[#ea384c]/20">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Button
          onClick={() => handleAudioPlay('/0306.MP3')}
          className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90"
        >
          <Music2 className="mr-2 h-4 w-4" />
          Boarding Music
        </Button>

        <Button
          onClick={() => handleAudioPlay('/0306 (3)(1).MP3')}
          className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90"
        >
          <Plane className="mr-2 h-4 w-4" />
          Pre-pushback
        </Button>

        <Button
          onClick={() => handleAudioPlay('/0306 (2).MP3')}
          className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90"
        >
          <Navigation className="mr-2 h-4 w-4" />
          Gate Departure
        </Button>

        <Button
          onClick={() => handleAudioPlay('/0306 (4).MP3')}
          className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90"
        >
          <Plane className="mr-2 h-4 w-4" />
          Pre-takeoff
        </Button>

        <Button
          onClick={() => handleAudioPlay('/0306 (5).MP3')}
          className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90"
        >
          <CloudSun className="mr-2 h-4 w-4" />
          Climb
        </Button>

        <Button
          onClick={() => handleAudioPlay('/0306 (6).MP3')}
          className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90"
        >
          <Compass className="mr-2 h-4 w-4" />
          Cruise
        </Button>

        {currentStatus === 'cruise' && (
          <Button
            onClick={handleMealService}
            className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90"
          >
            <Utensils className="mr-2 h-4 w-4" />
            Meal Service
          </Button>
        )}

        <Button
          onClick={() => handleAudioPlay('/0306 (1).MP3')}
          className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90"
        >
          <Wind className="mr-2 h-4 w-4" />
          Turbulence
        </Button>

        <Button
          onClick={() => handleAudioPlay('/0306 (8).MP3')}
          className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90"
        >
          <AlertTriangle className="mr-2 h-4 w-4" />
          Beginning Descent
        </Button>

        <Button
          onClick={() => handleAudioPlay('/0306 (9).MP3')}
          className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90"
        >
          <Plane className="mr-2 h-4 w-4" />
          Approach
        </Button>

        <Button
          onClick={() => handleAudioPlay('/0306 (10).MP3')}
          className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90"
        >
          <Plane className="mr-2 h-4 w-4" />
          On Final
        </Button>

        <Button
          onClick={() => handleAudioPlay('/0306 (11).MP3')}
          className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90"
        >
          <Navigation className="mr-2 h-4 w-4" />
          Taxi to Gate
        </Button>

        <Button
          onClick={() => handleAudioPlay('/0306 (12).MP3')}
          className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90"
        >
          <MapPin className="mr-2 h-4 w-4" />
          Parking
        </Button>
      </div>
      <audio ref={audioRef} />
    </Card>
  );
};
