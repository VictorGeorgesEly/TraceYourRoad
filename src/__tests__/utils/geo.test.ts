import { calculateTotalDistance, getDistanceFromLatLonInKm } from '@/utils/geo';

describe('geo utils', () => {
  describe('getDistanceFromLatLonInKm', () => {
    it('should calculate distance between two points correctly', () => {
      // SF to LA is roughly 550-600km
      const dist = getDistanceFromLatLonInKm(37.7749, -122.4194, 34.0522, -118.2437);
      expect(dist).toBeGreaterThan(500);
      expect(dist).toBeLessThan(600);
    });

    it('should return 0 for same point', () => {
      const dist = getDistanceFromLatLonInKm(37.7749, -122.4194, 37.7749, -122.4194);
      expect(dist).toBe(0);
    });
  });

  describe('calculateTotalDistance', () => {
    it('should calculate total distance for a route', () => {
      const route = [
        { latitude: 37.7749, longitude: -122.4194 },
        { latitude: 36.6002, longitude: -121.8947 },
        { latitude: 34.0522, longitude: -118.2437 }
      ];
      const total = calculateTotalDistance(route);
      expect(total).toBeGreaterThan(500);
    });

    it('should return 0 for less than 2 points', () => {
      expect(calculateTotalDistance([])).toBe(0);
      expect(calculateTotalDistance([{ latitude: 0, longitude: 0 }])).toBe(0);
    });
  });
});
