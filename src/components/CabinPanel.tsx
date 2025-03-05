
import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, Upload } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface CabinPanelProps {
  flightType: string;
}

export const CabinPanel = ({ flightType }: CabinPanelProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        const url = URL.createObjectURL(file);
        setAudioUrl(url);
        toast({
          title: "Audio Uploaded",
          description: "Safety briefing audio has been uploaded successfully.",
        });
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload an audio file.",
          variant: "destructive",
        });
      }
    }
  };

  const toggleSafetyAudio = () => {
    if (!audioUrl) {
      toast({
        title: "No Audio Available",
        description: "Please upload a safety briefing audio file first.",
        variant: "destructive",
      });
      return;
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Card className="p-6 bg-black/80 shadow-lg rounded-xl border-[#ea384c]/20">
      <div className="flex flex-col space-y-4">
        <h2 className="text-lg font-semibold text-white">Cabin Safety Panel</h2>
        
        <div className="flex gap-2">
          <Button
            onClick={toggleSafetyAudio}
            className="flex-1 bg-[#ea384c] hover:bg-[#ea384c]/90 text-white"
            disabled={!audioUrl}
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Pause Safety Briefing
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Play Safety Briefing
              </>
            )}
          </Button>

          <input
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            className="hidden"
            id="safety-audio-upload"
          />
          <label
            htmlFor="safety-audio-upload"
            className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-[#ea384c] text-white rounded-md hover:bg-[#ea384c]/90"
          >
            <Upload className="h-4 w-4" />
          </label>
        </div>
        
        <audio ref={audioRef} src={audioUrl || ''} />
        <p className="text-sm text-white/80">Flight Type: {flightType}</p>
      </div>
    </Card>
  );
};
