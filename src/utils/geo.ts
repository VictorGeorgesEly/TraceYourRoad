import { LatLng } from '@/types';

// Haversine formula to calculate distance between two points in km
export const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat1)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

export const calculateTotalDistance = (coordinates: LatLng[]): number => {
  if (!coordinates || coordinates.length < 2) return 0;

  let totalDistance = 0;
  for (let i = 0; i < coordinates.length - 1; i++) {
    totalDistance += getDistanceFromLatLonInKm(
      coordinates[i].latitude,
      coordinates[i].longitude,
      coordinates[i + 1].latitude,
      coordinates[i + 1].longitude
    );
  }
  return Math.round(totalDistance);
};
