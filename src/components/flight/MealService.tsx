
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Utensils } from 'lucide-react';

interface MealOption {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface DrinkOption {
  id: number;
  name: string;
}

interface MealServiceProps {
  showMealService: boolean;
  servingMeal: boolean;
  mealTimeLeft: number;
  mealDetails?: {
    meal: MealOption;
    drink: string;
    startTime: Date;
  };
  mealOptions: MealOption[];
  drinkOptions: DrinkOption[];
  onCancel: () => void;
  onServeMeal: (meal: MealOption, drink: string) => void;
  onClearService: () => void;
  servingMealAudio: boolean;
}

export const MealService = ({
  showMealService,
  servingMeal,
  mealTimeLeft,
  mealDetails,
  mealOptions,
  drinkOptions,
  onCancel,
  onServeMeal,
  onClearService,
  servingMealAudio,
}: MealServiceProps) => {
  const [selectedMeal, setSelectedMeal] = React.useState<MealOption>(mealOptions[0]);
  const [selectedDrink, setSelectedDrink] = React.useState("");
  const { toast } = useToast();

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleServeMeal = () => {
    if (!selectedDrink) {
      toast({
        title: "Select a Drink",
        description: "Please select a drink before serving.",
        variant: "destructive",
      });
      return;
    }

    onServeMeal(selectedMeal, selectedDrink);
  };

  if (servingMeal) {
    return (
      <Card className="p-6 bg-black/80 shadow-lg rounded-xl border-[#ea384c]/20">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-white">Service in Progress</h2>
          <p className="text-xl text-[#ea384c]">{formatTime(mealTimeLeft)}</p>
          <p className="text-gray-300">
            Serving {mealDetails?.meal.name} with {mealDetails?.drink}
          </p>
          {mealTimeLeft === 0 && (
            <Button
              onClick={onClearService}
              className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90"
            >
              <Utensils className="mr-2 h-4 w-4" />
              Clear Service
            </Button>
          )}
        </div>
      </Card>
    );
  }

  if (!showMealService) {
    return null;
  }

  return (
    <Card className="p-6 bg-black/80 shadow-lg rounded-xl border-[#ea384c]/20">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-white text-center">Meal Service</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mealOptions.map((meal) => (
            <div
              key={meal.id}
              onClick={() => setSelectedMeal(meal)}
              className={`cursor-pointer p-4 rounded-lg ${
                selectedMeal.id === meal.id
                  ? "bg-[#ea384c]/20 border-2 border-[#ea384c]"
                  : "bg-black/50"
              }`}
            >
              <img
                src={meal.image}
                alt={meal.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-medium text-white">{meal.name}</h3>
              <p className="text-gray-300">{meal.description}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Select Drink:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {drinkOptions.map((drink) => (
              <Button
                key={drink.id}
                onClick={() => setSelectedDrink(drink.name)}
                variant="outline"
                className={`${
                  selectedDrink === drink.name
                    ? "bg-[#ea384c] text-white"
                    : "bg-[#ea384c]/10 text-white hover:bg-[#ea384c]/20"
                }`}
              >
                {drink.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            onClick={onCancel}
            variant="outline"
            className="bg-[#ea384c]/10 text-white hover:bg-[#ea384c]/20"
          >
            Cancel
          </Button>
          <Button
            onClick={handleServeMeal}
            className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90"
          >
            <Utensils className="mr-2 h-4 w-4" />
            Start Service
          </Button>
        </div>
      </div>
    </Card>
  );
};
