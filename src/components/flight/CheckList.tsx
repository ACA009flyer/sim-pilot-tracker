
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ListCheck, Check, Square } from 'lucide-react';

interface ChecklistItem {
  text: string;
  checked: boolean;
}

interface PhaseChecklist {
  [key: string]: ChecklistItem[];
}

const checklists: PhaseChecklist = {
  boarding: [
    { text: "Parking Brake SET", checked: false },
    { text: "Throttle IDLE", checked: false },
    { text: "Landing Gear Lever CHECK DOWN", checked: false },
    { text: "Flaps CHECK UP", checked: false },
    { text: "Spoilers CHECK RETRACTED", checked: false }
  ],
  "taxi-out": [
    { text: "Engine start", checked: false },
    { text: "Request Clearance Pushback Checklist", checked: false },
    { text: "Pushback", checked: false },
    { text: "Parking Brake RELEASE", checked: false },
    { text: "Taxi to assigned runway Max. Speed 20 kts", checked: false },
    { text: "Brakes / Gyro / Turn Coordinator CHECK", checked: false }
  ],
  departure: [
    { text: "Parking Brake SET", checked: false },
    { text: "Throttle IDLE", checked: false },
    { text: "Spoilers RETRACTED", checked: false },
    { text: "Flight Instruments CHECK", checked: false },
    { text: "Engine Instruments CHECK", checked: false },
    { text: "Elevator Trim SET for takeoff", checked: false },
    { text: "Flaps", checked: false },
    { text: "TOGA and rotation and positive rate", checked: false },
    { text: "Landing Gear RETRACT", checked: false },
    { text: "Throttle AS REQUIRED", checked: false },
    { text: "Trim for 250 KIAS", checked: false },
    { text: "Auto-pilot / Autothrottle CHECK and ACTIVATE", checked: false },
    { text: "Autopilot IAS & VS SET", checked: false },
    { text: "At 10,000 feet Fasten Seat Belts OFF", checked: false }
  ],
  cruise: [
    { text: "Accelerate to Cruise Speed", checked: false },
    { text: "Engine + Instruments CHECK", checked: false },
    { text: "Auto-pilot CHECK and SET", checked: false }
  ],
  descent: [
    { text: "Atis / Airport Information CHECK", checked: false },
    { text: "Flaps / Landing Gear CHECK UP", checked: false },
    { text: "Approach Procedure REVIEW", checked: false },
    { text: "Check Weather (ATIS, Flight Services)", checked: false },
    { text: "Descent Speed", checked: false },
    { text: "Air Brakes AS REQUIRED", checked: false },
    { text: "Autopilot AS REQUIRED", checked: false },
    { text: "Thrust Lever AS REQUIRED", checked: false }
  ],
  approach: [
    { text: "Fasten Seat Belts ON", checked: false },
    { text: "Speed: Establish", checked: false },
    { text: "Auto-Spoilers ARM", checked: false },
    { text: "Flaps", checked: false },
    { text: "Autopilot ILS", checked: false },
    { text: "Landing Gear DOWN", checked: false },
    { text: "Parking Brake VERIFY OFF", checked: false },
    { text: "Airspeed Vref", checked: false },
    { text: "Auto-pilot : DISENGAGED", checked: false },
    { text: "Air-brakes UP", checked: false },
    { text: "Thrust Levers REVERSE", checked: false },
    { text: "at 60 kts Cancel Reverse Thrust", checked: false },
    { text: "Spoilers VERIFY EXTENDED", checked: false },
    { text: "Brakes AS REQUIRED", checked: false },
    { text: "Thrust Levers IDLE", checked: false },
    { text: "Auto-throttle CHECK OFF", checked: false },
    { text: "Autopilot CHECKED DISENGAGED", checked: false }
  ],
  "taxi-in": [
    { text: "Flaps UP", checked: false },
    { text: "Spoilers RETRACTED", checked: false },
    { text: "Speed Max. 20 kts", checked: false }
  ],
  parked: [
    { text: "Parking Brake SET", checked: false },
    { text: "Throttle IDLE", checked: false },
    { text: "Passenger Signs OFF", checked: false },
    { text: "Cut fuel supply(turn off the engines)", checked: false }
  ],
  deboarding: [
    { text: "Parking Brake Verify SET", checked: false },
    { text: "Throttle Verify IDLE", checked: false },
    { text: "All Switches Verify OFF", checked: false }
  ]
};

interface CheckListProps {
  currentStatus: string;
}

export const CheckList = ({ currentStatus }: CheckListProps) => {
  const [items, setItems] = useState(checklists[currentStatus] || []);

  const toggleItem = (index: number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], checked: !newItems[index].checked };
    setItems(newItems);
  };

  return (
    <Card className="p-6 bg-black/80 shadow-lg rounded-xl border-[#ea384c]/20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <ListCheck className="h-5 w-5 text-[#ea384c]" />
          Flight Check List
        </h2>
      </div>
      <ScrollArea className="h-[200px] w-full">
        <div className="space-y-2">
          {items.map((item, index) => (
            <button
              key={index}
              className="flex items-center gap-2 text-white/80 w-full text-left hover:bg-white/5 p-2 rounded transition-colors"
              onClick={() => toggleItem(index)}
            >
              {item.checked ? (
                <Check className="h-4 w-4 text-[#ea384c]" />
              ) : (
                <Square className="h-4 w-4 text-white/50" />
              )}
              <span className={item.checked ? "line-through opacity-50" : ""}>
                {item.text}
              </span>
            </button>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
