import roadtripsData from '@/constants/mock/roadtrips.json';
import { Roadtrip } from '@/types';
import { mockDelay } from '@/services/mock/mockApi';

// Mutable in-memory storage
let localRoadtrips = [...roadtripsData] as unknown as Roadtrip[];

export const roadtripsService = {
  getAll: async (): Promise<Roadtrip[]> => {
    await mockDelay(600);
    return localRoadtrips;
  },

  getById: async (id: string): Promise<Roadtrip> => {
    await mockDelay(300);
    const roadtrip = localRoadtrips.find((r) => r.id === id);
    if (!roadtrip) throw new Error('Roadtrip not found');
    return roadtrip;
  },

  getByUserId: async (userId: string): Promise<Roadtrip[]> => {
    await mockDelay(400);
    return localRoadtrips.filter((r) => r.userId === userId);
  },

  create: async (roadtrip: Roadtrip): Promise<Roadtrip> => {
    await mockDelay(800);
    localRoadtrips.push(roadtrip);
    return roadtrip;
  },

  delete: async (id: string): Promise<void> => {
    await mockDelay(500);
    localRoadtrips = localRoadtrips.filter(r => r.id !== id);
  }
};
