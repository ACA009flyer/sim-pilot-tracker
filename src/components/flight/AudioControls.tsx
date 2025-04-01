
import React, { useRef, useEffect } from 'react';

interface AudioControlsProps {
  currentAudio: string | null;
  onAudioPlay: (isPlaying: boolean) => void;
}

export const AudioControls = ({ currentAudio, onAudioPlay }: AudioControlsProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (currentAudio && audioRef.current) {
      audioRef.current.src = `/${currentAudio}`;
      
      // Set loop property based on whether it's boarding music
      audioRef.current.loop = currentAudio === '0306.MP3';
      
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
        onAudioPlay(false);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [currentAudio, onAudioPlay]);

  useEffect(() => {
    const audioElement = audioRef.current;
    
    if (audioElement) {
      const handleEnded = () => {
        // Only trigger ended for non-looping audio files
        if (!audioElement.loop) {
          onAudioPlay(false);
        }
      };
      
      audioElement.addEventListener('ended', handleEnded);
      
      return () => {
        audioElement.removeEventListener('ended', handleEnded);
      };
    }
  }, [onAudioPlay]);

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
