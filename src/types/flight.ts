
export type FlightStatus = 'boarding' | 'taxi-out' | 'departure' | 'cruise' | 'descent' | 'approach' | 'taxi-in' | 'parked' | 'deboarding';

export interface FlightPhase {
  id: FlightStatus;
  label: string;
  icon: React.ElementType;
  time?: Date;
}

export interface FlightInfo {
  departure: string;
  arrival: string;
  flightType: string;
}
