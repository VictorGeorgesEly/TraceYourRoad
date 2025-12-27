import { LatLng } from '../shared';

export interface Roadtrip {
  id: string;
  userId: string;
  title: string;
  description: string;
  countries: string[];
  polyline: LatLng[];
  startDate: string; // Using string for JSON serialization compatibility, or Date if parsed
  endDate: string;
  points: string[]; // IDs
  coverImage?: string;
  stats: {
    distance: number; // km
    duration: number; // days
  };
}
