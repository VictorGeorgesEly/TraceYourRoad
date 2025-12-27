import usersData from '@/constants/mock/users.json';
import { User } from '@/types';
import { mockDelay } from '@/services/mock/mockApi';
import { setItem, deleteItem, getItem } from '@/services/storage/secureStorage';
import { roadtripsService } from './roadtrips.service';

const TOKEN_KEY = 'auth_token';
const USER_ID_KEY = 'user_id';

export const authService = {
  login: async (email: string): Promise<{ user: User; token: string }> => {
    await mockDelay(800);
    const user = usersData.find((u) => u.email === email);
    
    // Simulating "any password works" or just email login for mock
    if (!user) throw new Error('Invalid credentials');

    const token = 'mock-jwt-token-' + user.id;
    await setItem(TOKEN_KEY, token);
    await setItem(USER_ID_KEY, user.id);

    // Calculate stats dynamically on login too
    const roadtrips = await roadtripsService.getByUserId(user.id);
    const calculatedStats = {
      roadtripsCount: roadtrips.length,
      distanceTraveled: roadtrips.reduce((acc, curr) => acc + curr.stats.distance, 0),
      countriesVisited: new Set(roadtrips.flatMap(r => r.countries)).size
    };

    return { user: { ...user, stats: calculatedStats } as User, token };
  },

  logout: async () => {
    await deleteItem(TOKEN_KEY);
    await deleteItem(USER_ID_KEY);
  },

  getCurrentUser: async (): Promise<User | null> => {
    const userId = await getItem(USER_ID_KEY);
    if (!userId) return null;
    
    await mockDelay(200);
    const user = usersData.find((u) => u.id === userId);
    if (!user) return null;

    // Calculate stats dynamically
    const roadtrips = await roadtripsService.getByUserId(user.id);
    const calculatedStats = {
      roadtripsCount: roadtrips.length,
      distanceTraveled: roadtrips.reduce((acc, curr) => acc + curr.stats.distance, 0),
      countriesVisited: new Set(roadtrips.flatMap(r => r.countries)).size
    };

    return { ...user, stats: calculatedStats } as User;
  },

  updateProfile: async (user: User): Promise<User> => {
    await mockDelay(1000);
    // In a real app, we would PUT/PATCH to API.
    // Here we just return the updated user object to simulate success.
    return user;
  }
};
