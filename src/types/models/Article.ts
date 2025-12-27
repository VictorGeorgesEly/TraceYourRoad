export interface Article {
  id: string;
  pointId: string;
  title: string;
  content: string; // Markdown
  coverImage?: string;
  images: string[];
  publishedAt: string;
  author: string; // userId
}
