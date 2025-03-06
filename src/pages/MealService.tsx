
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Utensils } from 'lucide-react';

const MealService = () => {
  const navigate = useNavigate();

  const handleServe = () => {
    navigate('/flight-status');
  };

  return (
    <div className="min-h-screen bg-black/95 p-6">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <h1 className="text-3xl font-semibold text-white text-center">Select Meal Options</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 bg-black/80 shadow-lg rounded-xl border-[#ea384c]/20">
            <img
              src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
              alt="Meal Option 1"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold text-white mb-2">Business Class Meal</h3>
            <p className="text-gray-300 mb-4">Gourmet selection with wine pairing</p>
          </Card>

          <Card className="p-6 bg-black/80 shadow-lg rounded-xl border-[#ea384c]/20">
            <img
              src="https://images.unsplash.com/photo-1466721591366-2d5fba72006d"
              alt="Meal Option 2"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold text-white mb-2">Premium Economy Meal</h3>
            <p className="text-gray-300 mb-4">Enhanced dining experience</p>
          </Card>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleServe}
            className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90"
          >
            <Utensils className="mr-2 h-4 w-4" />
            Serve Meals
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MealService;
