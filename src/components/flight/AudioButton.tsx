
import React from 'react';
import { Button } from "@/components/ui/button";
import { LucideIcon } from 'lucide-react';

interface AudioButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  className?: string;
}

export const AudioButton = ({ icon: Icon, label, onClick, className }: AudioButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={`bg-[#ea384c] text-white hover:bg-[#ea384c]/90 h-auto py-4 px-3 text-sm ${className}`}
    >
      <Icon className="shrink-0 mr-2 h-4 w-4" />
      <span className="text-xs">{label}</span>
    </Button>
  );
};
