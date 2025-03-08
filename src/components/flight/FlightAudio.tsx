import React, { useState, useRef, useEffect } from 'react';
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
  MapPin,
  HeadphonesIcon,
  Video
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FlightAudioProps {
  currentStatus: string;
  onAudioPlay: (isPlaying: boolean) => void;
}

export const FlightAudio = ({ currentStatus, onAudioPlay }: FlightAudioProps) => {
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const handleAudioPlay = (audioFile: string) => {
    if (audioRef.current) {
      if (currentAudio === audioFile && !audioRef.current.paused) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setCurrentAudio(null);
        onAudioPlay(false);
      } else {
        audioRef.current.src = `/${audioFile}`;
        audioRef.current.play().catch(console.error);
        setCurrentAudio(audioFile);
        onAudioPlay(audioFile !== '0306.MP3');
      }
    }
  };

  const handleMealService = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    navigate('/meal-service', { state: { previousStatus: currentStatus } });
  };

  return (
    <Card className="p-6 bg-black/80 shadow-lg rounded-xl border-[#ea384c]/20">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Button
          onClick={() => handleAudioPlay('0302.MP3')}
          className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90 h-auto py-4 px-3 text-sm"
        >
          <Navigation className="shrink-0 mr-2 h-4 w-4" />
          <span className="text-xs">Gate Departure</span>
        </Button>

        <Button
          onClick={() => handleAudioPlay('0303.MP3')}
          className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90 h-auto py-4 px-3 text-sm"
        >
          <Plane className="shrink-0 mr-2 h-4 w-4" />
          <span className="text-xs">Pre-pushback</span>
        </Button>

        <Button
          onClick={() => handleAudioPlay('0314.MP3')}
          className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90 h-auto py-4 px-3 text-sm"
        >
          <Video className="shrink-0 mr-2 h-4 w-4" />
          <span className="text-xs">Safety Video</span>
        </Button>

        <Button
          onClick={() => handleAudioPlay('0306.MP3')}
          className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90 h-auto py-4 px-3 text-sm"
        >
          <Music2 className="shrink-0 mr-2 h-4 w-4" />
          <span className="text-xs">Boarding Music</span>
        </Button>

        <Button
          onClick={() => handleAudioPlay('Cabin Safety Instruction Sound (1).mp3')}
          className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90 h-auto py-4 px-3 text-sm"
        >
          <HeadphonesIcon className="shrink-0 mr-2 h-4 w-4" />
          <span className="text-xs">Safety Instructions</span>
        </Button>

        <Button
          onClick={() => handleAudioPlay('0303.MP3')}
          className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90 h-auto py-4 px-3 text-sm"
        >
          <Plane className="shrink-0 mr-2 h-4 w-4" />
          <span className="text-xs">Pre-pushback</span>
        </Button>

        <Button
          onClick={() => handleAudioPlay('0302.MP3')}
          className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90 h-auto py-4 px-3 text-sm"
        >
          <Navigation className="shrink-0 mr-2 h-4 w-4" />
          <span className="text-xs">Gate Departure</span>
        </Button>

        <Button
          onClick={() => handleAudioPlay('0304.MP3')}
          className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90 h-auto py-4 px-3 text-sm"
        >
          <Plane className="shrink-0 mr-2 h-4 w-4" />
          <span className="text-xs">Pre-takeoff</span>
        </Button>

        <Button
          onClick={() => handleAudioPlay('0305.MP3')}
          className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90 h-auto py-4 px-3 text-sm"
        >
          <CloudSun className="shrink-0 mr-2 h-4 w-4" />
          <span className="text-xs">Climb</span>
        </Button>

        <Button
          onClick={() => handleAudioPlay('0313.MP3')}
          className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90 h-auto py-4 px-3 text-sm"
        >
          <Compass className="shrink-0 mr-2 h-4 w-4" />
          <span className="text-xs">Cruise</span>
        </Button>

        <Button
          onClick={() => handleAudioPlay('0301.MP3')}
          className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90 h-auto py-4 px-3 text-sm"
        >
          <Wind className="shrink-0 mr-2 h-4 w-4" />
          <span className="text-xs">Turbulence</span>
        </Button>

        <Button
          onClick={() => handleAudioPlay('0308.MP3')}
          className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90 h-auto py-4 px-3 text-sm"
        >
          <AlertTriangle className="shrink-0 mr-2 h-4 w-4" />
          <span className="text-xs">Beginning Descent</span>
        </Button>

        <Button
          onClick={() => handleAudioPlay('0309.MP3')}
          className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90 h-auto py-4 px-3 text-sm"
        >
          <Plane className="shrink-0 mr-2 h-4 w-4" />
          <span className="text-xs">Approach</span>
        </Button>

        <Button
          onClick={() => handleAudioPlay('0310.MP3')}
          className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90 h-auto py-4 px-3 text-sm"
        >
          <Plane className="shrink-0 mr-2 h-4 w-4" />
          <span className="text-xs">On Final</span>
        </Button>

        <Button
          onClick={() => handleAudioPlay('0311.MP3')}
          className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90 h-auto py-4 px-3 text-sm"
        >
          <Navigation className="shrink-0 mr-2 h-4 w-4" />
          <span className="text-xs">Taxi to Gate</span>
        </Button>

        <Button
          onClick={() => handleAudioPlay('0306.MP3')}
          className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90 h-auto py-4 px-3 text-sm"
        >
          <Music2 className="shrink-0 mr-2 h-4 w-4" />
          <span className="text-xs">Taxi Music</span>
        </Button>

        <Button
          onClick={() => handleAudioPlay('0312.MP3')}
          className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90 h-auto py-4 px-3 text-sm"
        >
          <MapPin className="shrink-0 mr-2 h-4 w-4" />
          <span className="text-xs">Parking</span>
        </Button>

        {currentStatus === 'cruise' && (
          <Button
            onClick={handleMealService}
            className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90 h-auto py-4 px-3 text-sm col-span-2 md:col-span-3"
          >
            <Utensils className="shrink-0 mr-2 h-4 w-4" />
            <span className="text-xs">Start Meal Service</span>
          </Button>
        )}
      </div>
      <audio ref={audioRef} preload="auto" />
    </Card>
  );
};
