
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Utensils } from 'lucide-react';

const mealOptions = [
  {
    id: 1,
    name: "Grilled Salmon",
    description: "Fresh Atlantic salmon with seasonal vegetables",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288"
  },
  {
    id: 2,
    name: "Beef Tenderloin",
    description: "Premium cut with truffle mashed potatoes",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947"
  },
  {
    id: 3,
    name: "Vegetarian Buddha Bowl",
    description: "Quinoa base with roasted vegetables",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
  },
  {
    id: 4,
    name: "Asian Fusion Chicken",
    description: "Teriyaki glazed chicken with jasmine rice",
    image: "https://images.unsplash.com/photo-1547496502-affa22d38842"
  },
  {
    id: 5,
    name: "Mediterranean Pasta",
    description: "Fresh pasta with sun-dried tomatoes and olives",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601"
  },
  {
    id: 6,
    name: "Seafood Paella",
    description: "Traditional Spanish rice with mixed seafood",
    image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a"
  },
  {
    id: 7,
    name: "Vegan Wellington",
    description: "Mushroom and vegetable pastry",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d"
  }
];

const MealService = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : mealOptions.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < mealOptions.length - 1 ? prev + 1 : 0));
  };

  const handleServe = () => {
    navigate('/flight-status', { state: { ...location.state } });
  };

  const currentMeal = mealOptions[currentIndex];

  return (
    <div className="min-h-screen bg-black/95 p-6">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <h1 className="text-3xl font-semibold text-white text-center mb-8">Meal Service Options</h1>
        
        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={handlePrevious}
            variant="outline"
            className="bg-[#ea384c]/10 text-white hover:bg-[#ea384c]/20"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <Card className="w-full max-w-2xl p-6 bg-black/80 shadow-lg rounded-xl border-[#ea384c]/20">
            <img
              src={currentMeal.image}
              alt={currentMeal.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-white mb-2">{currentMeal.name}</h3>
            <p className="text-gray-300 mb-4">{currentMeal.description}</p>
          </Card>

          <Button
            onClick={handleNext}
            variant="outline"
            className="bg-[#ea384c]/10 text-white hover:bg-[#ea384c]/20"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>

        <div className="flex justify-center mt-8">
          <Button
            onClick={handleServe}
            className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90 px-8"
          >
            <Utensils className="mr-2 h-5 w-5" />
            Serve Selected Meal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MealService;
