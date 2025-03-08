
import React from 'react';
import { Card } from "@/components/ui/card";
import { 
  Music2, 
  Plane, 
  Wind, 
  AlertTriangle, 
  Compass, 
  CloudSun,
  Navigation,
  MapPin,
  Video
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AudioButton } from './AudioButton';
import { AudioControls, useAudioControl } from './AudioControls';

interface FlightAudioProps {
  currentStatus: string;
  onAudioPlay: (isPlaying: boolean) => void;
}

export const FlightAudio = ({ currentStatus, onAudioPlay }: FlightAudioProps) => {
  const navigate = useNavigate();
  const { currentAudio, handleAudioPlay } = useAudioControl();

  const audioButtons = [
    { icon: Navigation, label: 'Gate Departure', file: '0302.MP3' },
    { icon: Plane, label: 'Pre-pushback', file: '0303.MP3' },
    { icon: Video, label: 'Safety Video', file: '0314.MP3' },
    { icon: Music2, label: 'Boarding Music', file: '0306.MP3' },
    { icon: Plane, label: 'Pre-takeoff', file: '0304.MP3' },
    { icon: CloudSun, label: 'Climb', file: '0305.MP3' },
    { icon: Compass, label: 'Cruise', file: '0313.MP3' },
    { icon: Wind, label: 'Turbulence', file: '0301.MP3' },
    { icon: AlertTriangle, label: 'Beginning Descent', file: '0308.MP3' },
    { icon: Plane, label: 'Approach', file: '0309.MP3' },
    { icon: Plane, label: 'On Final', file: '0310.MP3' },
    { icon: Navigation, label: 'Taxi to Gate', file: '0311.MP3' },
    { icon: Music2, label: 'Taxi Music', file: '0306.MP3' },
    { icon: MapPin, label: 'Parking', file: '0312.MP3' },
  ];

  const handleMealService = () => {
    navigate('/meal-service', { state: { previousStatus: currentStatus } });
  };

  return (
    <Card className="p-6 bg-black/80 shadow-lg rounded-xl border-[#ea384c]/20">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {audioButtons.map((button, index) => (
          <AudioButton
            key={`${button.file}-${index}`}
            icon={button.icon}
            label={button.label}
            onClick={() => handleAudioPlay(button.file, onAudioPlay)}
          />
        ))}
      </div>
      <AudioControls currentAudio={currentAudio} onAudioPlay={onAudioPlay} />
    </Card>
  );
};
