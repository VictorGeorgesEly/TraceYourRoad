import { Stack, useRouter, useSegments } from 'expo-router';
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Loading } from '@/components/ui/Loading';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useTheme } from '@/hooks/useTheme';
import '@/i18n'; // Init i18n
import { useTranslation } from 'react-i18next';
import { Toast } from '@/components/ui/Toast';
import { useToastStore } from '@/stores/toastStore';
import { CONFIG } from '@/constants/config';

function RootLayoutNav() {
  const { isAuthenticated, checkAuth, isLoading } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();
  const { mode } = useTheme();
  const { t } = useTranslation();
  const showToast = useToastStore(state => state.showToast);

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        if (CONFIG.DEBUG_MODE) {
          showToast(error.message, 'error');
        }
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        if (CONFIG.DEBUG_MODE) {
          showToast(error.message, 'error');
        }
      },
    }),
  });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (isAuthenticated && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, segments, isLoading, router]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={mode === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen 
            name="roadtrip/[id]" 
            options={{ 
              headerShown: true, 
              title: t('tabs.roadtrips'),
              headerBackTitle: '' 
            }} 
          />
          <Stack.Screen name="roadtrip/create" options={{ presentation: 'modal', title: t('roadtrips.create_title') }} />
          <Stack.Screen name="point/[id]" options={{ presentation: 'modal', title: 'Point' }} />
          <Stack.Screen name="point/create" options={{ presentation: 'modal', title: t('roadtrips.add_point') }} />
          <Stack.Screen 
            name="article/[id]" 
            options={{ 
              headerShown: true, 
              title: 'Article',
              headerBackTitle: '' 
            }} 
          />
                  <Stack.Screen name="article/create" options={{ headerShown: true, title: t('articles.create_title'), headerBackTitle: '' }} />
                  <Stack.Screen name="gallery/[id]" options={{ headerShown: false, presentation: 'fullScreenModal' }} />
                  <Stack.Screen name="gallery/create" options={{ presentation: 'modal', title: 'Add Photos' }} />
                </Stack>
        <Toast />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootLayoutNav />
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}
