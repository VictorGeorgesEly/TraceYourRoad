import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { roadtripsService } from '@/services/api/roadtrips.service';
import { Roadtrip } from '@/types';

export const useRoadtrips = () => {
  return useQuery({
    queryKey: ['roadtrips'],
    queryFn: roadtripsService.getAll,
    staleTime: 5 * 60 * 1000,
  });
};

export const useRoadtrip = (id: string) => {
  return useQuery({
    queryKey: ['roadtrips', id],
    queryFn: () => roadtripsService.getById(id),
    enabled: !!id,
  });
};

export const useUserRoadtrips = (userId: string) => {
  return useQuery({
    queryKey: ['roadtrips', 'user', userId],
    queryFn: () => roadtripsService.getByUserId(userId),
    enabled: !!userId,
  });
};

export const useCreateRoadtrip = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newRoadtrip: Roadtrip) => roadtripsService.create(newRoadtrip),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roadtrips'] });
    },
  });
};

export const useDeleteRoadtrip = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => roadtripsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roadtrips'] });
    },
  });
};
