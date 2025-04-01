
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Utensils } from 'lucide-react';

interface MealButtonProps {
  onClick: () => void;
}

export const MealButton = ({ onClick }: MealButtonProps) => {
  return (
    <Card className="p-6 bg-black/80 shadow-lg rounded-xl border-[#ea384c]/20">
      <div className="text-center h-full flex flex-col justify-center">
        <Button
          onClick={onClick}
          className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90"
        >
          <Utensils className="mr-2 h-4 w-4" />
          Start Meal Service
        </Button>
      </div>
    </Card>
  );
};
