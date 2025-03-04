
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const validateICAO = (code: string) => {
  // ICAO codes are 4 letters
  const icaoRegex = /^[A-Z]{4}$/;
  return icaoRegex.test(code);
};

export const FlightDetailsForm = () => {
  const [departure, setDeparture] = React.useState('');
  const [arrival, setArrival] = React.useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!departure || !arrival) {
      toast({
        title: "Error",
        description: "Please fill in both departure and arrival airports",
        variant: "destructive",
      });
      return;
    }

    if (!validateICAO(departure)) {
      toast({
        title: "Invalid Departure Code",
        description: "Please enter a valid 4-letter ICAO airport code",
        variant: "destructive",
      });
      return;
    }

    if (!validateICAO(arrival)) {
      toast({
        title: "Invalid Arrival Code",
        description: "Please enter a valid 4-letter ICAO airport code",
        variant: "destructive",
      });
      return;
    }

    if (departure === arrival) {
      toast({
        title: "Error",
        description: "Departure and arrival airports cannot be the same",
        variant: "destructive",
      });
      return;
    }

    navigate('/flight-status', { 
      state: { departure, arrival }
    });
  };

  return (
    <div className="min-h-screen bg-black/95 p-6">
      <div className="max-w-md mx-auto">
        <Card className="p-6 bg-black/80 shadow-lg rounded-xl border-[#ea384c]/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold text-white text-center">Flight Details</h1>
              <p className="text-[#ea384c] text-center">Enter ICAO airport codes (4 letters)</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="departure" className="block text-sm font-medium text-white mb-2">
                  Departure Airport (ICAO)
                </label>
                <Input
                  id="departure"
                  placeholder="Enter ICAO code (e.g., KJFK)"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value.toUpperCase())}
                  className="bg-black/50 border-[#ea384c]/20 text-white"
                  maxLength={4}
                />
              </div>
              
              <div>
                <label htmlFor="arrival" className="block text-sm font-medium text-white mb-2">
                  Arrival Airport (ICAO)
                </label>
                <Input
                  id="arrival"
                  placeholder="Enter ICAO code (e.g., EGLL)"
                  value={arrival}
                  onChange={(e) => setArrival(e.target.value.toUpperCase())}
                  className="bg-black/50 border-[#ea384c]/20 text-white"
                  maxLength={4}
                />
              </div>
            </div>

            <Button 
              type="submit"
              className="w-full bg-[#ea384c] hover:bg-[#ea384c]/90"
            >
              Start Flight
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
