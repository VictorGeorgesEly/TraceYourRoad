import { create } from 'zustand';

interface MapState {
  selectedRoadtripId: string | null;
  selectedPointId: string | null;
  selectRoadtrip: (id: string | null) => void;
  selectPoint: (id: string | null) => void;
}

export const useMapStore = create<MapState>((set) => ({
  selectedRoadtripId: null,
  selectedPointId: null,
  selectRoadtrip: (id) => set({ selectedRoadtripId: id }),
  selectPoint: (id) => set({ selectedPointId: id }),
}));
