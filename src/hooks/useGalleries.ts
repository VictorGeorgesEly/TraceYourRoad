import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { galleriesService } from '@/services/api/galleries.service';
import { Gallery } from '@/types';

export const useGalleries = (pointId: string) => {
  return useQuery({
    queryKey: ['galleries', 'point', pointId],
    queryFn: () => galleriesService.getByPointId(pointId),
    enabled: !!pointId,
  });
};

export const useGallery = (id: string) => {
  return useQuery({
    queryKey: ['galleries', id],
    queryFn: () => galleriesService.getById(id),
    enabled: !!id,
  });
};

export const useCreateGallery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newGallery: Gallery) => galleriesService.create(newGallery),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['galleries', 'point', variables.pointId] });
    },
  });
};

export const useAddImageToGallery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ galleryId, image }: { galleryId: string; image: any }) => 
      galleriesService.addImage(galleryId, image),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['galleries', variables.galleryId] });
    },
  });
};

export const useDeleteGallery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => galleriesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleries'] });
    },
  });
};
