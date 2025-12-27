import { useRoadtrips } from './useRoadtrips';
import { useMapStore } from '@/stores/mapStore';
import { useMemo } from 'react';

export const useMapRoutes = () => {
  const { data: roadtrips } = useRoadtrips();
  const { selectedRoadtripId } = useMapStore();

  const routes = useMemo(() => {
    if (!roadtrips) return [];
    return roadtrips.map(r => ({
      id: r.id,
      coordinates: r.polyline,
      color: r.id === selectedRoadtripId ? '#FF385C' : '#888888', // Highlight selected
      isSelected: r.id === selectedRoadtripId
    }));
  }, [roadtrips, selectedRoadtripId]);

  return { routes };
};
