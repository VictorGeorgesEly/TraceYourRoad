import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { articlesService } from '@/services/api/articles.service';
import { Article } from '@/types';

export const useArticles = (pointId: string) => {
  return useQuery({
    queryKey: ['articles', 'point', pointId],
    queryFn: () => articlesService.getByPointId(pointId),
    enabled: !!pointId,
  });
};

export const useArticle = (id: string) => {
  return useQuery({
    queryKey: ['articles', id],
    queryFn: () => articlesService.getById(id),
    enabled: !!id,
  });
};

export const useCreateArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newArticle: Article) => articlesService.create(newArticle),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['articles', 'point', variables.pointId] });
    },
  });
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => articlesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};
