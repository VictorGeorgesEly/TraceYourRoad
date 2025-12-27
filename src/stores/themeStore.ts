import { create } from 'zustand';
import { Appearance } from 'react-native';

interface ThemeState {
  mode: 'light' | 'dark';
  toggle: () => void;
  setMode: (mode: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  mode: Appearance.getColorScheme() === 'dark' ? 'dark' : 'light',
  toggle: () => set((state) => ({ mode: state.mode === 'light' ? 'dark' : 'light' })),
  setMode: (mode) => set({ mode }),
}));
