import articlesData from '@/constants/mock/articles.json';
import { Article } from '@/types';
import { mockDelay } from '@/services/mock/mockApi';

let localArticles = [...articlesData] as unknown as Article[];

export const articlesService = {
  getByPointId: async (pointId: string): Promise<Article[]> => {
    await mockDelay(300);
    return localArticles.filter((a) => a.pointId === pointId);
  },

  getById: async (id: string): Promise<Article> => {
    await mockDelay(200);
    const article = localArticles.find((a) => a.id === id);
    if (!article) throw new Error('Article not found');
    return article;
  },

  create: async (article: Article): Promise<Article> => {
    await mockDelay(500);
    localArticles.push(article);
    return article;
  },

  delete: async (id: string): Promise<void> => {
    await mockDelay(400);
    localArticles = localArticles.filter(a => a.id !== id);
  }
};
