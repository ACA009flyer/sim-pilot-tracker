
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Utensils } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const mealOptions = [
  {
    id: 1,
    name: "Chicken with Rice",
    description: "Grilled chicken breast with steamed rice and vegetables",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288"
  },
  {
    id: 2,
    name: "Pasta Primavera",
    description: "Vegetarian pasta with seasonal vegetables",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601"
  },
];

const drinkOptions = [
  { id: 1, name: "Water" },
  { id: 2, name: "Coffee" },
  { id: 3, name: "Tea" },
  { id: 4, name: "Soft Drink" },
  { id: 5, name: "Juice" },
];

const MealService = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDrink, setSelectedDrink] = useState("");
  const [isServing, setIsServing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();
  const { previousStatus, ...otherState } = location.state || {};

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isServing && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isServing) {
      toast({
        title: "Service Complete",
        description: "Please clear the served meals.",
      });
    }
    return () => clearInterval(timer);
  }, [isServing, timeLeft]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : mealOptions.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < mealOptions.length - 1 ? prev + 1 : 0));
  };

  const handleServe = () => {
    if (!selectedDrink) {
      toast({
        title: "Select a Drink",
        description: "Please select a drink before serving.",
        variant: "destructive",
      });
      return;
    }

    setIsServing(true);
    if (audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
    toast({
      title: "Service Started",
      description: `Serving ${mealOptions[currentIndex].name} with ${selectedDrink}`,
    });
  };

  const handleClear = () => {
    setIsServing(false);
    setTimeLeft(600);
    setSelectedDrink("");
    navigate('/flight-status', { 
      state: { 
        ...otherState,
        currentStatus: previousStatus 
      } 
    });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const currentMeal = mealOptions[currentIndex];

  return (
    <div className="min-h-screen bg-black/95 p-6">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <h1 className="text-3xl font-semibold text-white text-center mb-8">Meal Service</h1>
        
        {!isServing ? (
          <>
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

                <div className="space-y-4">
                  <h4 className="text-white font-medium">Select Drink:</h4>
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
          </>
        ) : (
          <Card className="w-full max-w-2xl mx-auto p-6 bg-black/80 shadow-lg rounded-xl border-[#ea384c]/20">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold text-white">Service in Progress</h2>
              <p className="text-xl text-[#ea384c]">{formatTime(timeLeft)}</p>
              <p className="text-gray-300">
                Serving {currentMeal.name} with {selectedDrink}
              </p>
              {timeLeft === 0 && (
                <Button
                  onClick={handleClear}
                  className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90"
                >
                  Clear Service
                </Button>
              )}
            </div>
          </Card>
        )}
      </div>
      <audio ref={audioRef} src="/0307.MP3" />
    </div>
  );
};

export default MealService;
