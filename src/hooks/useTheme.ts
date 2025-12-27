import { useThemeStore } from '@/stores/themeStore';

export const useTheme = () => {
  const store = useThemeStore();
  return store;
};
