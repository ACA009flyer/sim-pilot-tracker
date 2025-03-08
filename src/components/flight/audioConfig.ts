
import { 
  Music2, 
  Plane, 
  Wind, 
  AlertTriangle, 
  Compass, 
  CloudSun,
  Navigation,
  MapPin,
  Video,
  LucideIcon
} from 'lucide-react';

interface AudioButton {
  icon: LucideIcon;
  label: string;
  file: string;
}

export const audioButtons: AudioButton[] = [
  { icon: Navigation, label: 'Gate Departure', file: '0302.MP3' },
  { icon: Plane, label: 'Pre-pushback', file: '0303.MP3' },
  { icon: Video, label: 'Safety Video', file: '0314.MP3' },
  { icon: Music2, label: 'Boarding Music', file: '0306.MP3' },
  { icon: Plane, label: 'Pre-takeoff', file: '0304.MP3' },
  { icon: CloudSun, label: 'Climb', file: '0305.MP3' },
  { icon: Compass, label: 'Cruise', file: '0313.MP3' },
  { icon: Wind, label: 'Turbulence', file: '0301.MP3' },
  { icon: AlertTriangle, label: 'Beginning Descent', file: '0308.MP3' },
  { icon: Plane, label: 'Approach', file: '0309.MP3' },
  { icon: Plane, label: 'On Final', file: '0310.MP3' },
  { icon: Navigation, label: 'Taxi to Gate', file: '0311.MP3' },
  { icon: Music2, label: 'Taxi Music', file: '0306.MP3' },
  { icon: MapPin, label: 'Parking', file: '0312.MP3' },
];
