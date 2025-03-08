
import React from 'react';
import { AudioButton } from './AudioButton';
import { audioButtons } from './audioConfig';

interface AudioButtonGridProps {
  onAudioSelect: (file: string) => void;
}

export const AudioButtonGrid = ({ onAudioSelect }: AudioButtonGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {audioButtons.map((button, index) => (
        <AudioButton
          key={`${button.file}-${index}`}
          icon={button.icon}
          label={button.label}
          onClick={() => onAudioSelect(button.file)}
        />
      ))}
    </div>
  );
};
