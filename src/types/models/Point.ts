import { LatLng } from '../shared';

export type PointType = 'city' | 'monument' | 'nature' | 'food' | 'accommodation';

export interface Point {
  id: string;
  roadtripId: string;
  title: string;
  description: string;
  coordinates: LatLng;
  type: PointType;
  date: string;
  order: number;
  articles: string[]; // IDs
  galleries: string[]; // IDs
  coverImage?: string;
}
