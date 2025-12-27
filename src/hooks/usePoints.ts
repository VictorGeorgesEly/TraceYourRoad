import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pointsService } from '@/services/api/points.service';
import { Point } from '@/types';

export const usePoints = (roadtripId: string) => {
  return useQuery({
    queryKey: ['points', 'roadtrip', roadtripId],
    queryFn: () => pointsService.getByRoadtripId(roadtripId),
    enabled: !!roadtripId,
  });
};

export const usePoint = (id: string) => {
  return useQuery({
    queryKey: ['points', id],
    queryFn: () => pointsService.getById(id),
    enabled: !!id,
  });
};

export const useCreatePoint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newPoint: Point) => pointsService.create(newPoint),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['points', 'roadtrip', variables.roadtripId] });
      queryClient.invalidateQueries({ queryKey: ['roadtrips', variables.roadtripId] }); // Ideally update roadtrip stats too
    },
  });
};

export const useDeletePoint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => pointsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['points'] });
    },
  });
};
