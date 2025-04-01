
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useLocation } from 'react-router-dom';

interface MealOption {
  id: number;
  name: string;
  description: string;
  image: string;
}

export const mealOptions = [
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

export const drinkOptions = [
  { id: 1, name: "Water" },
  { id: 2, name: "Coffee" },
  { id: 3, name: "Tea" },
  { id: 4, name: "Soft Drink" },
  { id: 5, name: "Juice" },
];

export const useMealService = (onAnnouncement: (isPlaying: boolean) => void) => {
  const location = useLocation();
  const [showMealService, setShowMealService] = useState(false);
  const [servingMeal, setServingMeal] = useState(!!location.state?.servingMeal);
  const [mealDetails, setMealDetails] = useState(location.state?.mealDetails);
  const [mealTimeLeft, setMealTimeLeft] = useState(600); // 10 minutes in seconds
  const [canServeMeal, setCanServeMeal] = useState(true);
  const [servingMealAudio, setServingMealAudio] = useState(false);
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Create audio element for meal service
    const audio = new Audio('/0307.MP3');
    setAudioRef(audio);
    
    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, []);
  
  // Handle meal service timer
  useEffect(() => {
    let mealTimer: NodeJS.Timeout;
    if (servingMeal && mealTimeLeft > 0) {
      mealTimer = setInterval(() => {
        setMealTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (mealTimeLeft === 0 && servingMeal) {
      toast({
        title: "Service Complete",
        description: "Please clear the served meals.",
      });
    }
    return () => clearInterval(mealTimer);
  }, [servingMeal, mealTimeLeft, toast]);

  const handleShowMealService = () => {
    setShowMealService(true);
  };

  const handleCancelMealService = () => {
    setShowMealService(false);
  };

  const handleServeMeal = (meal: MealOption, drink: string) => {
    // Play meal service announcement
    if (audioRef) {
      audioRef.currentTime = 0;
      audioRef.play().catch(console.error);
      setServingMealAudio(true);
      
      // Set announcement state temporarily
      onAnnouncement(true);
      
      // Clear the announcement state after audio ends
      audioRef.onended = () => {
        setServingMealAudio(false);
        onAnnouncement(false);
      };
    }

    const newState = { ...location.state, servingMeal: true, mealDetails: {
      meal,
      drink,
      startTime: new Date()
    }};
    window.history.replaceState({}, '', window.location.pathname);
    window.history.pushState(newState, '', window.location.pathname);
    setMealDetails(newState.mealDetails);
    setServingMeal(true);
    setShowMealService(false);
    setCanServeMeal(false);
  };

  const clearMealService = () => {
    const newState = { ...location.state };
    delete newState.servingMeal;
    delete newState.mealDetails;
    window.history.replaceState({}, '', window.location.pathname);
    window.history.pushState(newState, '', window.location.pathname);
    setMealTimeLeft(600);
    setServingMeal(false);
    setMealDetails(undefined);
    setCanServeMeal(true);
    toast({
      title: "Meal Service Cleared",
      description: "You can now start a new meal service.",
    });
  };

  return {
    showMealService,
    servingMeal,
    mealTimeLeft,
    mealDetails,
    canServeMeal,
    servingMealAudio,
    handleShowMealService,
    handleCancelMealService,
    handleServeMeal,
    clearMealService
  };
};
