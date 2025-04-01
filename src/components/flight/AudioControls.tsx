
import React, { useRef, useEffect } from 'react';

interface AudioControlsProps {
  currentAudio: string | null;
  onAudioPlay: (isPlaying: boolean) => void;
}

export const AudioControls = ({ currentAudio, onAudioPlay }: AudioControlsProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const playAudio = (audioFile: string) => {
    if (audioRef.current) {
      if (currentAudio === audioFile && !audioRef.current.paused) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        onAudioPlay(false);
        return null;
      } else {
        audioRef.current.src = `/${audioFile}`;
        audioRef.current.play().catch(console.error);
        // Only set isAnnouncement to true if it's not boarding music
        onAudioPlay(audioFile !== '0306.MP3');
        return audioFile;
      }
    }
    return null;
  };

  return <audio ref={audioRef} preload="auto" />;
};

export const useAudioControl = () => {
  const [currentAudio, setCurrentAudio] = React.useState<string | null>(null);
  
  const handleAudioPlay = (audioFile: string, onAudioPlay: (isPlaying: boolean) => void) => {
    if (currentAudio === audioFile) {
      setCurrentAudio(null);
      onAudioPlay(false);
    } else {
      setCurrentAudio(audioFile);
      // Only set isAnnouncement to true if it's not boarding music
      onAudioPlay(audioFile !== '0306.MP3');
    }
  };

  return {
    currentAudio,
    handleAudioPlay
  };
};
