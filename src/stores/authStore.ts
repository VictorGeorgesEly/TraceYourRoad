import { create } from 'zustand';
import { User } from '@/types';
import { authService } from '@/services/api/auth.service';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  updateProfile: (user: User) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async (email: string) => {
    set({ isLoading: true });
    try {
      const { user } = await authService.login(email);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch {
      set({ isLoading: false });
      throw new Error('Invalid credentials');
    }
  },
  logout: async () => {
    await authService.logout();
    set({ user: null, isAuthenticated: false });
  },
  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const user = await authService.getCurrentUser();
      set({ user, isAuthenticated: !!user, isLoading: false });
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
  updateProfile: async (updatedUser: User) => {
    set({ isLoading: true });
    try {
      const user = await authService.updateProfile(updatedUser);
      set({ user, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));
