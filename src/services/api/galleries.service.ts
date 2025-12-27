import galleriesData from '@/constants/mock/galleries.json';
import { Gallery } from '@/types';
import { mockDelay } from '@/services/mock/mockApi';

let localGalleries = [...galleriesData] as unknown as Gallery[];

export const galleriesService = {
  getByPointId: async (pointId: string): Promise<Gallery[]> => {
    await mockDelay(300);
    return localGalleries.filter((g) => g.pointId === pointId);
  },

  getById: async (id: string): Promise<Gallery> => {
    await mockDelay(200);
    const gallery = localGalleries.find((g) => g.id === id);
    if (!gallery) throw new Error('Gallery not found');
    return gallery;
  },

  create: async (gallery: Gallery): Promise<Gallery> => {
    await mockDelay(500);
    localGalleries.push(gallery);
    return gallery;
  },

  delete: async (id: string): Promise<void> => {
    await mockDelay(400);
    localGalleries = localGalleries.filter(g => g.id !== id);
  },

  // Helper to add image to existing gallery
  addImage: async (galleryId: string, image: any): Promise<void> => {
     await mockDelay(300);
     const gallery = localGalleries.find(g => g.id === galleryId);
     if(gallery) {
       gallery.images.push(image);
     }
  }
};
