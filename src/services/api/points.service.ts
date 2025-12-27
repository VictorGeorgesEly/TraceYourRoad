import pointsData from '@/constants/mock/points.json';
import { Point } from '@/types';
import { mockDelay } from '@/services/mock/mockApi';

let localPoints = [...pointsData] as unknown as Point[];

export const pointsService = {
  getByRoadtripId: async (roadtripId: string): Promise<Point[]> => {
    await mockDelay(400);
    const points = localPoints.filter((p) => p.roadtripId === roadtripId);
    return points.sort((a, b) => a.order - b.order);
  },

  getById: async (id: string): Promise<Point> => {
    await mockDelay(200);
    const point = localPoints.find((p) => p.id === id);
    if (!point) throw new Error('Point not found');
    return point;
  },

  create: async (point: Point): Promise<Point> => {
    await mockDelay(600);
    localPoints.push(point);
    return point;
  },

  delete: async (id: string): Promise<void> => {
    await mockDelay(400);
    localPoints = localPoints.filter(p => p.id !== id);
  }
};
