
import React, { useState, useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Video, Music } from 'lucide-react';

interface IFESystemProps {
  isAnnouncement: boolean;
}

export const IFESystem = ({ isAnnouncement }: IFESystemProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMedia, setCurrentMedia] = useState<'movie' | 'music' | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  useEffect(() => {
    if (isAnnouncement && isPlaying) {
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  }, [isAnnouncement]);

  const toggleMedia = (type: 'movie' | 'music') => {
    if (isAnnouncement) return;
    
    if (currentMedia === type && isPlaying) {
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setCurrentMedia(null);
    } else {
      setIsPlaying(true);
      setCurrentMedia(type);
      if (type === 'music' && audioRef.current) {
        audioRef.current.src = '/0306.MP3'; // Using the non-copyright boarding music
        audioRef.current.play().catch(console.error);
      }
    }
  };

  return (
    <Card className="p-6 bg-black/80 shadow-lg rounded-xl border-[#ea384c]/20">
      <h2 className="text-lg font-semibold text-white mb-4">Air Canada Entertainment</h2>
      <audio ref={audioRef} loop />
      
      {isAnnouncement ? (
        <div className="text-center p-4 bg-[#ea384c]/10 rounded-lg">
          <p className="text-white font-medium">Announcement Playing</p>
          <p className="text-sm text-gray-300">Entertainment paused</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => toggleMedia('movie')}
            className={`${
              currentMedia === 'movie' && isPlaying
                ? 'bg-[#ea384c]'
                : 'bg-[#ea384c]/10'
            } text-white hover:bg-[#ea384c]/90`}
          >
            <Video className="mr-2 h-4 w-4" />
            {currentMedia === 'movie' && isPlaying ? 'Pause Movie' : 'Watch Movie'}
          </Button>
          
          <Button
            onClick={() => toggleMedia('music')}
            className={`${
              currentMedia === 'music' && isPlaying
                ? 'bg-[#ea384c]'
                : 'bg-[#ea384c]/10'
            } text-white hover:bg-[#ea384c]/90`}
          >
            <Music className="mr-2 h-4 w-4" />
            {currentMedia === 'music' && isPlaying ? 'Pause Music' : 'Play Music'}
          </Button>
        </div>
      )}
    </Card>
  );
};
