
interface FlightHeaderProps {
  departure: string;
  arrival: string;
  flightType: string;
  currentPhase: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const FlightHeader = ({ 
  departure, 
  arrival, 
  flightType, 
  currentPhase,
}: FlightHeaderProps) => {
  return (
    <div className="text-center space-y-2">
      <h1 className="text-3xl font-semibold text-white">Air Canada Flight Status</h1>
      <div className="text-[#ea384c] space-y-1">
        <p>From: {departure} - To: {arrival}</p>
        <p>Flight Type: {flightType}</p>
        <p>Current Phase: {currentPhase}</p>
      </div>
    </div>
  );
};
