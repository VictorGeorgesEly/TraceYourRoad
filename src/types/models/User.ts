export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  stats?: {
    roadtripsCount: number;
    distanceTraveled: number;
    countriesVisited: number;
  };
}
